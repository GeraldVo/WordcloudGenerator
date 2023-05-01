<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <div class="umfrage-detail">
          <template v-if="umfrage">
            <h2 class="umfrage-title">{{ umfrage.name }}</h2>
            <p class="umfrage-description">{{ umfrage.description }}</p>
          </template>
          <router-link class="back-link" :to="{ name: 'UmfragenView' }">
            Back to Survey Overview
          </router-link>
          <div class="form-group">
            <div class="row">
              <button class="btn btn-primary mt-3" @click="redrawWordcloud">
                Regenerate Wordcloud
              </button>
            </div>
            <div class="row">
              <div class="col-md-12">
                <label class="mt-3" for="config-mask">Upload Mask</label>
                <input
                  type="file"
                  id="config-mask"
                  ref="mask"
                  @change="handleMaskChange"
                />
              </div>
              <button
                class="btn btn-primary mt-2"
                type="button"
                :disabled="clearDisabled"
                @click="clearMask"
              >
                Clear
              </button>
            </div>
            <div class="row">
              <div class="col-md-12">
                <label class="mt-3" for="colorPicker">Color Picker</label>
                <div class="color-picker my-2">
                  <input
                    id="colorPicker"
                    type="color"
                    v-model="selectedBackgroundColor"
                    @input="onColorChange"
                    name="colorPicker"
                    :style="{ opacity: selectedOpacity }"
                  />
                  <div
                    class="color-preview"
                    :style="{ backgroundColor: selectedBackgroundColor }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="row">
              <label for="opacityRange">Opacity:</label>
              <input
                type="range"
                id="opacityRange"
                name="opacityRange"
                min="0"
                max="1"
                step="0.1"
                v-model="selectedOpacity">
            </div>
            <div class="row">
              <a
                class="btn btn-primary my-2"
                id="btn-save"
                href="#"
                download="wordcloud.png"
                title="Save canvas"
                @click="downloadWordcloud"
                >Save Image</a
              >
            </div>
          </div>
        </div>
      </div>
      <div id="wordcloudWrapper" class="col-md-9">
        <canvas ref="wordcloud" id="wordcloudContainer"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import wordcloud from "wordcloud";

/*var $width = $('#config-width');
  var $height = $('#config-height');
  var $mask = $('#config-mask');
  var $dppx = $('#config-dppx'); */
export default {
  name: "UmfrageView",
  props: ["umfrageID"],
  data() {
    return {
      umfrage: null,
      wordcloudList: [],
      wordcloudOptions: {},
      wordcloudContainer: null,
      maskCanvas: null,
      maskFile: null,
      wordcloudWrapper: null,
      selectedBackgroundColor: "#FFFFFF",
      selectedOpacity: 1
    };
  },
  computed: {
    clearDisabled() {
      return !this.maskFile;
    },
  },
  async created() {
    try {
      console.log("umfrageID:" + this.umfrageID);
      const response = await axios.get(
        `http://206.81.16.50:3000/umfrage/${this.umfrageID}`
      );
      this.umfrage = response.data[0];
      console.log(this.umfrage);
    } catch (error) {
      console.error(error);
    }
  },
  async mounted() {
    try {
      const response = await axios.get(
        `http://206.81.16.50:3000/begriff/${this.umfrageID}`
      );
      const data = response.data;
      this.wordcloudList = data.reduce((acc, curr) => {
        const existing = acc.find((item) => item[0] === curr.name);
        if (existing) {
          existing[1]++;
        } else {
          acc.push([curr.name, 1]);
        }
        return acc;
      }, []);
    } catch (error) {
      console.error(error);
    }
    this.wordcloudWrapper = document.getElementById("wordcloudWrapper");
    this.wordcloudContainer = document.getElementById("wordcloudContainer");
    const ratio = 16 / 9;
    this.wordcloudContainer.width = 1170; // Set the initial width of the canvas
    this.wordcloudContainer.height = this.wordcloudContainer.width / ratio;

    this.wordcloudOptions = {
      list: this.wordcloudList,
      fontFamily: "Arial",
      fontWeight: "bold",
      color: "random-dark",
      backgroundColor: "#f8f8f8",
      shape: "circle",
      drawOutOfBound: false,
      shrinkToFit: true,
      clearCanvas: true,
      gridSize: Math.round((16 * this.wordcloudContainer.width) / 1024),
      /*weightFactor: (size) => {
        return (Math.pow(size, 2.3) * this.$refs.wordcloud.offsetWidth) / 1024;
      },*/
      weightFactor: 20,
    };
    setTimeout(() => {
      wordcloud(this.wordcloudContainer, this.wordcloudOptions);
    }, 0);
  },
  methods: {
    submitResponse() {
      // TODO: handle form submission
    },
    onColorChange(event) {
      this.selectedBackgroundColor = event.target.value;
      this.$emit("colorChanged", this.selectedBackgroundColor);
    },
    redrawWordcloud() {
      this.wordcloudOptions.backgroundColor = this.selectedBackgroundColor;
      if (this.maskCanvas) {
        this.wordcloudOptions.clearCanvas = false;

        /* Determine bgPixel by creating
         another canvas and fill the specified background color. */
        var bctx = document.createElement("canvas").getContext("2d");

        bctx.fillStyle = this.wordcloudOptions.backgroundColor || "#fff";
        bctx.fillRect(0, 0, 1, 1);
        var bgPixel = bctx.getImageData(0, 0, 1, 1).data;

        var maskCanvasScaled = document.createElement("canvas");
        maskCanvasScaled.width = this.wordcloudContainer.width;
        maskCanvasScaled.height = this.wordcloudContainer.height;
        var ctx = maskCanvasScaled.getContext("2d");

        ctx.drawImage(
          this.maskCanvas,
          0,
          0,
          this.maskCanvas.width,
          this.maskCanvas.height,
          0,
          0,
          maskCanvasScaled.width,
          maskCanvasScaled.height
        );

        var imageData = ctx.getImageData(
          0,
          0,
          this.maskCanvas.width,
          this.maskCanvas.height
        );
        var newImageData = ctx.createImageData(imageData);
        for (var i = 0; i < imageData.data.length; i += 4) {
          if (imageData.data[i + 3] > 128) {
            newImageData.data[i] = bgPixel[0];
            newImageData.data[i + 1] = bgPixel[1];
            newImageData.data[i + 2] = bgPixel[2];
            newImageData.data[i + 3] = bgPixel[3];
          } else {
            // This color must not be the same w/ the bgPixel.
            newImageData.data[i] = bgPixel[0];
            newImageData.data[i + 1] = bgPixel[1];
            newImageData.data[i + 2] = bgPixel[2];
            newImageData.data[i + 3] = bgPixel[3] ? bgPixel[3] - 1 : 0;
          }
        }

        ctx.putImageData(newImageData, 0, 0);

        ctx = this.wordcloudContainer.getContext("2d");
        ctx.drawImage(maskCanvasScaled, 0, 0);

        maskCanvasScaled =
          ctx =
          imageData =
          newImageData =
          bctx =
          bgPixel =
            undefined;
      }
      setTimeout(() => {
        wordcloud(this.wordcloudContainer, this.wordcloudOptions);
      }, 0);
    },
    handleMaskChange() {
      this.maskFile = this.$refs.mask.files[0];

      if (!this.maskFile) {
        return;
      }

      const url = window.URL.createObjectURL(this.maskFile);
      const img = new Image();
      img.src = url;

      img.onload = () => {
        window.URL.revokeObjectURL(url);

        this.maskCanvas = document.createElement("canvas");
        this.maskCanvas.width = img.width;
        this.maskCanvas.height = img.height;

        const ctx = this.maskCanvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(
          0,
          0,
          this.maskCanvas.width,
          this.maskCanvas.height
        );
        const newImageData = ctx.createImageData(imageData);

        for (let i = 0; i < imageData.data.length; i += 4) {
          const tone =
            imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2];
          const alpha = imageData.data[i + 3];

          if (alpha < 128 || tone > 128 * 3) {
            // Area not to draw
            newImageData.data[i] =
              newImageData.data[i + 1] =
              newImageData.data[i + 2] =
                255;
            newImageData.data[i + 3] = 0;
          } else {
            // Area to draw
            newImageData.data[i] =
              newImageData.data[i + 1] =
              newImageData.data[i + 2] =
                0;
            newImageData.data[i + 3] = 255;
          }
        }

        ctx.putImageData(newImageData, 0, 0);
      };
    },
    clearMask() {
      this.maskCanvas.remove();
      this.maskCanvas = null;
      this.maskFile = null;
      this.$refs.mask.value = "";
    },
    downloadWordcloud() {
      var canvas = this.wordcloudContainer;
      var url = canvas.toDataURL();

      var link = document.createElement("a");
      link.href = url;

      if ("download" in link) {
        link.download = "wordcloud.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert(
          'Please right click and choose "Save As..." to save the generated image.'
        );
        window.open(url, "_blank", "width=500,height=300,menubar=yes");
      }
    },
  },
};
</script>

<style>
.umfrage-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}

.umfrage-description {
  font-size: 18px;
  margin-bottom: 24px;
}

.back-link {
  display: block;
  margin-top: 24px;
}

#wordcloudContainer {
  width: 1170px;
  height: 760px; /* or set the height to your desired value */
  display: block;
  position: relative;
  overflow: hidden;
}

/*#wordcloudWrapper {
  overflow-x: auto;
  overflow-y: visible;
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
} */
</style>

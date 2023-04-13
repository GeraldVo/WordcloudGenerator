<template>
  <div class="container">
    <div v-if="!connected" class="input-container my-5">
      <label for="join-code-input">Enter join code:</label>
      <input
        id="join-code-input"
        v-model="joinCode"
        class="form-control mb-2"
      />
      <button @click="joinRoom" class="btn btn-primary btn-block">
        Join room
      </button>
    </div>
    <div v-if="connected" class="input-container my-5">
      <label for="message-input">Enter term:</label>
      <div class="input-group">
        <input
          id="message-input"
          v-model="message"
          @keyup.enter="sendMessage"
          class="form-control mb-2"
        />
      </div>
      <div class="row justify-content-center">
        <div class="col-12 col-md-6 mb-3 mb-md-0">
          <button @click="sendMessage" class="btn btn-primary btn-block">
            Send
          </button>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-12 col-md-6">
          <button @click="leaveRoom" class="btn btn-danger btn-block mt-3">
            Leave Room
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const io = require("socket.io-client");

export default {
  data() {
    return {
      socket: null,
      connected: false,
      joinCode: "",
      message: "",
    };
  },
  methods: {
    joinRoom() {
      this.socket = io("http://206.81.16.50:3001", {
        cors: {
          origins: "*:*",
          credentials: true,
        },
      });
      this.socket.emit("join", this.joinCode);
      this.socket.on("joined", () => {
        this.connected = true;
      });
    },
    sendMessage() {
      this.socket.emit("chat message", this.message);
      this.message = "";
    },
    leaveRoom() {
      if (this.socket) {
        if (confirm("Are you sure you want to leave the room?")) {
          this.socket.disconnect();
          this.connected = false;
        }
      }
    },
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
      this.connected = false;
    }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input-container {
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
}

.leave-container {
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

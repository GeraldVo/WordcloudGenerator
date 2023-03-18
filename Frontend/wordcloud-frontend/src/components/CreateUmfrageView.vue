<template>
  <div class="create-umfrage">
    <h1 class="mb-4">Create Umfrage</h1>
    <div v-if="!serverRunning">
      <form class="umfrage-form">
        <div class="form-group row mb-3">
          <label for="umfrageName" class="col-sm-3 col-form-label">Umfrage Name:</label>
          <div class="col-sm-9">
            <input id="umfrageName" class="form-control" type="text" v-model="umfrageName" required>
          </div>
        </div>

        <div class="form-group row mb-3">
          <label for="timelimit-input" class="col-sm-3 col-form-label">Max Timelimit in Minuten:</label>
          <div class="col-sm-9">
            <input id="timelimit-input" class="form-control" type="number" v-model="maxTimeLimit" required>
          </div>
        </div>

        <div class="form-group row mb-3">
          <label for="max-users-input" class="col-sm-3 col-form-label">Max Users:</label>
          <div class="col-sm-9">
            <input id="max-users-input" class="form-control" type="number" v-model="maxUsers" required>
          </div>
        </div>

        <div class="form-group row mb-3">
          <label for="max-words-input" class="col-sm-3 col-form-label">Max Words Per User:</label>
          <div class="col-sm-9">
            <input id="max-words-input" class="form-control" type="number" v-model="maxWordsPerUser" required>
          </div>
        </div>

        <div class="form-group row mb-3">
          <label for="join-code-input" class="col-sm-3 col-form-label">Join Code:</label>
          <div class="col-sm-9">
            <input id="join-code-input" class="form-control" type="text" v-model="joinCode" required>
          </div>
        </div>

        <div class="form-group row mb-3">
          <div class="offset-sm-3 col-sm-9">
            <button class="btn btn-primary" @click.prevent="umfrageAnlegen">Create Umfrage</button>
          </div>
        </div>
      </form>

      <div v-if="umfrageCreated" class="mb-3">
        <button class="btn btn-primary" @click="startServer">Start Server</button>
      </div>
    </div>

    <div v-else>
      <router-link to="/umfragen">
        <button class="btn btn-primary mb-3" @click="stopServer">Stop Server</button>
      </router-link>
    </div>
  </div>
</template>




<script>
import axios from "axios";

export default {
  name: "CreateUmfrageView",
  data() {
    return {
      serverRunning: false,
      umfrageCreated: false,
      joinCode: "",
      umfrageName: "",
      maxTimeLimit: 0,
      maxUsers: 0,
      maxWordsPerUser: 0,
      erstellerID: sessionStorage.getItem("username"),
    };
  },
  methods: {
    umfrageAnlegen() {
      axios
        .post("http://localhost:3000/umfrage", {
          name: this.umfrageName,
          teilnehmerAnzahl: this.maxUsers,
          maxBegriffeTeilnehmer: this.maxWordsPerUser,
          zeitlimit: this.maxTimeLimit,
          umfrageCode: this.joinCode,
          themeID: "5",
          maskeID: "2",
          schriftartID: "2",
          hintergrundfarbe: "schwarz",
          erstellerID: this.erstellerID,
        })
        .then((response) => {
          this.umfrageCreated = true;
          console.log(response.data);
        })
        .catch((error) => {
          console.log("ERROR");
          console.error(error);
          this.umfrageCreated = false;
        });
    },
    startServer() {
      axios
        .get("http://localhost:3000/startumfrage?joinCode=${this.joinCode}`")
        .then(() => {
          console.log("Socket.io server started");
          this.serverRunning = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    stopServer() {
      axios
        .get("http://localhost:3000/stopumfrage")
        .then(() => {
          console.log("Socket.io server stopped");
          this.serverRunning = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

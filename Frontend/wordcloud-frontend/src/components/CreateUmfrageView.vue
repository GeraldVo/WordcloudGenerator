<template>
  <div>
    <h1>CreateUmfrageView</h1>
    <div v-if="!serverRunning">
      <label for="umfrageName">Umfrage Name:</label>
      <input id="umfrageName" type="text" v-model="umfrageName" />

      <label for="timelimit-input">Max Timelimit:</label>
      <input id="timelimit-input" type="number" v-model="maxTimeLimit" />

      <label for="max-users-input">Max Users:</label>
      <input id="max-users-input" type="number" v-model="maxUsers" />

      <label for="max-words-input">Max Words Per User:</label>
      <input id="max-words-input" type="number" v-model="maxWordsPerUser" />

      <label for="join-code-input">Join Code:</label>
      <input id="join-code-input" type="text" v-model="joinCode" />
      <button @click="umfrageAnlegen">Neue Umfrage anlegen</button>
      <div v-if="umfrageCreated">
        <button @click="startServer">Start Server</button>
      </div>
    </div>
    <div v-else>
      <button @click="stopServer">Stop Server</button>
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
      erstellerID: sessionStorage.getItem('username')
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

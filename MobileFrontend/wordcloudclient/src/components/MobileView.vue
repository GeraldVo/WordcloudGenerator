<template>
  <div>
    <div v-if="!connected">
      <input v-model="joinCode" placeholder="Enter join code" />
      <button @click="joinRoom">Join room</button>
    </div>
    <div v-if="connected">
      <input
        v-model="message"
        @keyup.enter="sendMessage"
        placeholder="Enter message"
      />
      <button @click="sendMessage">Send</button>
      <button @click="leaveRoom">Umfrage verlassen</button>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

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
      this.socket = io("http://localhost:3001");
      this.socket.emit("join", this.joinCode);
      this.connected = true;
    },
    sendMessage() {
      this.socket.emit("chat message", this.message);
      this.message = "";
    },
    leaveRoom() {
      if (this.socket) {
        this.socket.disconnect();
        this.connected = false;
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

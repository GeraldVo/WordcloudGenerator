<template>
  <div class="menu">
    <h2>Menu</h2>
    <div class="buttons">
      <router-link to="/umfragen">
        <button>Alle Umfragen anzeigen</button>
      </router-link>
      <router-link to="/createUmfrage">
        <button>Neue Umfrage starten</button>
      </router-link>
      <router-link to="/subsite3">
        <button>Subsite 3</button>
      </router-link>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import auth from '../auth';

export default {
  name: "MenuView",
  methods: {
    logout() {
      
      localStorage.removeItem("token");
      auth.logout();
      this.$router.push({ name: "Login" });
      
    },
  },
};
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-right: 1rem;
}
</style>

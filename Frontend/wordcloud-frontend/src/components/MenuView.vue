<template>
  <div class="menu p-3" style="background-color: #f8f9fa;">
    <h2 class="mb-4">Menu</h2>
    <div class="d-flex justify-content-between align-items-center">
      <div class="buttons">
        <router-link to="/umfragen">
          <button class="btn btn-primary mx-3">Alle Umfragen anzeigen</button>
        </router-link>
        <router-link to="/createUmfrage">
          <button class="btn btn-primary mx-3">Neue Umfrage starten</button>
        </router-link>
        <router-link to="/subsite3">
          <button class="btn btn-primary mx-3">Subsite 3</button>
        </router-link>
      </div>
      <div>
        <button @click="logout" class="btn btn-danger">Logout</button>
      </div>
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


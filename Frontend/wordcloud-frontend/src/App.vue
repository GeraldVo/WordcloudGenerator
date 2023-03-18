<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Menu />
    </nav>
    <main class="container mt-4">
      <router-view />
    </main>
    <footer class="bg-light py-3">
      <div class="container text-center">
        &copy; 2023 WordcloudGenerator
      </div>
    </footer>

    <Login />

  </div>
</template>

<script>
import Menu from "./components/MenuView.vue";
import "./global.css"

export default {
  components: {
    Menu
  },
};
</script>


<template>
  <div id="app">
    <nav>
      <Menu />
    </nav>
    <main>
      <router-view />
    </main>
    <footer>
      <p>&copy; 2023 My App</p>
    </footer>

    <Login />

  </div>
</template>

<script>
import Menu from "./components/MenuView.vue";

export default {
  components: {
    Menu
  },
};
</script>

<style>
/* Reset default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Set body font and background color */
body {
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
}

/* Style the navigation bar */
nav {
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

nav a {
  color: #fff;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
}

nav a:hover,
nav a.router-link-active {
  background-color: #fff;
  color: #333;
}

nav a:not(:last-child) {
  margin-right: 10px;
}

/* Style the main content area */
main {
  padding: 20px;
}

/* Style the footer */
footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
}
</style>

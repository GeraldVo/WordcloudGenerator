<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" v-model="username" name="username" required>
      <label for="password">Password:</label>
      <input type="password" v-model="password" name="password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import auth from '../auth';


export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password,
      })
      .then(response => {
        // Save JWT token to local storage
        localStorage.setItem('jwt', response.data.token);
        auth.login();
        
        // Redirect to home page
        this.$router.push('/subsite1');
      })
      .catch(error => {
        console.log(error);
      });
    },
  },
};
</script>

<template>
  <div class="login">
    <h2>Login</h2>
    <form class="login-form" @submit.prevent="login">
      <div class="form-group mb-3">
        <label for="username">Username:</label>
        <input type="text" class="form-control" v-model="username" name="username" required>
      </div>
      <div class="form-group mb-3">
        <label for="password">Password:</label>
        <input type="password" class="form-control" v-model="password" name="password" required>
      </div>
      <button class="btn btn-primary" type="submit">Login</button>
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
      axios.post('http://206.81.16.50:3000/login', {
        username: this.username,
        password: this.password,
      })
      .then(response => {
        // Save JWT token to local storage
        localStorage.setItem('jwt', response.data.token);
        sessionStorage.setItem('username', this.username);
        auth.login();
        
        // Redirect to home page
        this.$router.push('/umfragen');
      })
      .catch(error => {
        console.log(error);
      });
    },
  },
};
</script>
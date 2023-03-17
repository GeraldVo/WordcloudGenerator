import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

createApp(App)
  .use(router)
  .mixin({
    beforeCreate() {
      const jwt = localStorage.getItem('jwt');

      // Redirect to login page if not logged in
      if (!jwt && this.$route.path !== '/login') {
        this.$router.push('/login');
      }
    },
  })
  .mount('#app');
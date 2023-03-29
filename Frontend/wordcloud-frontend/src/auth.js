import { reactive } from 'vue';

const state = reactive({
    loggedIn: false,
  });

export default {
    
    

    login() {
        // your login logic here
        //this.loggedIn = true;
        state.loggedIn = true;
        sessionStorage.setItem('loggedIn', true);
    },

    logout() {

        //this.loggedIn = false;
        state.loggedIn = false;
        sessionStorage.setItem('loggedIn', false);
        
    },
    state
};
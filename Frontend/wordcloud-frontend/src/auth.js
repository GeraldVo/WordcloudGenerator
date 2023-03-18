export default {
    loggedIn: false,

    login() {
        // your login logic here
        this.loggedIn = true;
    },

    logout() {

        this.loggedIn = false;
        
    }
};
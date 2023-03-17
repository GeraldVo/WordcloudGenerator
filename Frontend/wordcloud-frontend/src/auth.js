export default {
    loggedIn: false,
  
    login() {
      // your login logic here
      console.log("Ich bin in der Login Funktion");
      this.loggedIn = true;
    },
  
    logout() {
      // your logout logic here
      this.loggedIn = false;
    }
  };
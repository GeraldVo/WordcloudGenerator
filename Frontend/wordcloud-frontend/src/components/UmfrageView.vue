<template>
  <div class="umfrage-detail">
    <template v-if="umfrage">
      <h2>{{ umfrage.name }}</h2>
      <p>{{ umfrage.name }}</p>
    </template>
    <router-link :to="{ name: 'UmfragenView' }">Back to Object List</router-link> 
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'UmfrageView',
  props: ["umfrageID"],
  data() {
    return {
      umfrage: null
    }
  },
  async created() {
    try {
      console.log("umfrageID:" + this.umfrageID);
      const response = await axios.get(`http://localhost:3000/umfrage/${this.umfrageID}`)
      this.umfrage = response.data[0];
      console.log(this.umfrage);

    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    submitResponse() {
      // TODO: handle form submission
    }
  }
}
</script>

<style scoped>
.umfrage-detail {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>

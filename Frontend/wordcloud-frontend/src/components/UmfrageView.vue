<template>
  <div class="umfrage-detail">
    <template v-if="umfrage">
      <h2 class="umfrage-title">{{ umfrage.name }}</h2>
      <p class="umfrage-description">{{ umfrage.description }}</p>
    </template>
    <router-link class="back-link" :to="{ name: 'UmfragenView' }">Zurück zu alle Umfragen</router-link> 
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

<style>
  .umfrage-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  
  .umfrage-description {
    font-size: 18px;
    margin-bottom: 24px;
  }
  
  .back-link {
    display: block;
    margin-top: 24px;
  }
</style>

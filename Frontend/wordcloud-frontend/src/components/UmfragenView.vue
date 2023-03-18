<template>
  <div class="umfrage-list">
    <h2>Umfragen</h2>
    <ul>
      <li v-for="umfrage in umfragen" :key="umfrage.umfrageID">
        <div class="umfrage-item">
          <p>{{ umfrage.name }}</p>
          <router-link :to="{ name: 'UmfrageView', params: { umfrageID: umfrage.umfrageID } }">View Details</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UmfragenView",
  data() {
    return {
      umfragen: [],
    };
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:3000/umfrage");
      this.umfragen = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    /*openUmfrage(umfrageid) {
      this.$router.push({ name: 'UmfrageView', params: { umfrageid } });
    },*/
  },
};
</script>

<style scoped>
.umfrage-list {
  margin: 2rem;
}

.umfrage-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background-color: #f2f2f2;
  border-radius: 0.25rem;
}

.umfrage-item p {
  margin: 0;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>

<template>
  <div class="umfrage-list">
    <h2>Umfragen</h2>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Umfrage Name</th>
          <th scope="col">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(umfrage, index) in umfragen" :key="umfrage.umfrageID">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ umfrage.name }}</td>
          <td>
            <router-link :to="{ name: 'UmfrageView', params: { umfrageID: umfrage.umfrageID } }">
              <button type="button" class="btn btn-primary">View Details</button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
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
  margin: 2rem auto;
  max-width: 800px;
}

.umfrage-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}

.umfrage-name {
  font-size: 1.5rem;
  margin: 0;
}

.umfrage-link {
  color: #0077c0;
  text-decoration: none;
}
</style>


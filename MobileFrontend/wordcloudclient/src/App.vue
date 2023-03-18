<template>
  <div id="app" class="container">
    <h1 class="text-center mt-4 mb-2">My App</h1>
    <MobileView />
  </div>
</template>

<script>
import MobileView from './components/MobileView.vue';

export default {
  name: 'App',
  components: {
    MobileView
}
}
</script>

<style scoped>
.container {
  max-width: 480px;
  margin: 0 auto;
  padding: 0 16px;
}
h1 {
  font-size: 32px;
}
</style>

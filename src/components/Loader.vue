<template>
  <div class="loading" :class="status != 2 ? 'show' : 'hide'">
    <div class="container">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
    <p v-if="status == 0">Connecting to API</p>
    <p v-if="status == 1">Waiting data from Socket</p>
    <p v-if="status == -1">Error conncting to API</p>
  </div>
</template>

<script>
export default {
  props: ['status'],
  mounted(){
     console.log(this.status); 
  }
};
</script>

<style></style>

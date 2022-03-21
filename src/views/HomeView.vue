<template>
  <div class="home">
    <TopBar />
    <MainContent />
  </div>
</template>

<script>
import {TopBar,MainContent} from "@/components";


export default {
  name: "HomeView",
  
  components: {
    TopBar,
    MainContent
},



};
</script>

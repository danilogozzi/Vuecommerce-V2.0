<template>
  <div id="home">
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import Footer from "@/components/Footer.vue";

@Component({
  components: {
    Header,
    Main,
    Footer,
  },
})
export default class App extends Vue {}
</script>
<style lang="scss">
</style>

<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import Header from "./components/Header.vue";

export default defineComponent({
  components: {
    Header,
  },
  setup() {},
});
</script>

<style lang="scss">
@import "./scss/_mixins";
#app {
  background: #333;
  color: white;
  scroll-behavior: smooth !important;
  min-height: 100vh;
}
.header,
label {
  color: white !important;
}
</style>

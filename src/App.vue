<template>
  <div class="app">
    <nav-bar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./layout/NavBar.vue";

export default defineComponent({
  name: "App",
  components: { NavBar },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>

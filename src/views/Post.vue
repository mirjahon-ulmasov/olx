<template>
  <div class="main">
    <h1>Подать объявление</h1>
    <img src="@/assets/icons/not-found.svg" alt="not found" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PostPage",
  components: {},
});
</script>

<style lang="scss" scoped>
.main {
  padding: 3rem;
  text-align: center;
  img {
    margin-top: 2rem;
    width: 40rem;
  }
}
</style>

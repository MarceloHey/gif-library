<template>
  <div class="wrapper">
    <sui-card class="fluid">
      <sui-card-content>
        <sui-image :size="size" :src="gif.images.original.webp" />
        <sui-card-content v-if="details">
          <sui-card-header>{{ gif.title }}</sui-card-header>
          <sui-card-meta>
            <p>{{ gif.user ? gif.user.username : "" }}</p>
          </sui-card-meta>
        </sui-card-content>
      </sui-card-content>
    </sui-card>
  </div>
</template>
<script>
import { defineComponent } from "@vue/composition-api";
export default defineComponent({
  props: {
    gif: {},
    size: {
      type: String,
      default: "medium",
    },
    details: false,
  },
  setup() {},
});
</script>
<style lang="scss">
.card {
  background: #444 !important;
  box-shadow: none;

  .content {
    background: red;
    box-shadow: none;
    border: none;
  }
}
.ui.fluid.card {
  box-shadow: none;
  border: linear-gradient(to right, hsl(192, 60%, 20%), hsl(280, 87%, 60%));
}

.wrapper {
  background: linear-gradient(to right, hsl(192, 60%, 20%), hsl(280, 87%, 60%));
  padding: 0.3rem;
}
</style>

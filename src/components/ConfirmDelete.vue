<template>
  <div class="ui active basic modal">
    <div class="ui icon header">
      <i class="trash icon"></i>
      Delete gif ?
    </div>
    <div class="actions">
      <div @click="$emit('cancel')" class="ui button cancel">
        <i class="remove icon"></i>
        No
      </div>
      <div @click="$emit('delete')" class="ui secondary button">
        <i class="checkmark icon"></i>
        Yes
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["delete", "cancel"],
  setup() {},
});
</script>
<style lang="scss" scoped>
@import "../scss/mixins";

.ui.active.modal {
  position: absolute;
  top: 25%;
  left: 35%;
  border: 1px solid white;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0;
  .header,
  .content,
  .actions {
    background: #333;
    border-radius: 0;
  }
  .actions {
    display: flex;
    justify-content: center;
    align-items: center;
    .cancel {
      color: white;
      background-image: linear-gradient(
        to right,
        hsl(192, 100%, 30%),
        hsl(280, 87%, 60%)
      );
    }
  }
  @include device(small) {
    left: 2%;
  }
  @include device(medium) {
    left: 25%;
  }
}
</style>

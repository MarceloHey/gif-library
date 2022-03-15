<template>
  <sui-form-field required :error="error ? true : false">
    <label>{{ label }}</label>
    <input
      @blur="$emit('blur', 'title')"
      @input="handleInput"
      v-model="inputValue"
      type="text"
    />
    <span v-if="error">{{ error }}</span>
  </sui-form-field>
</template>
<script>
import { defineComponent, watch, ref } from "@vue/composition-api";

export default defineComponent({
  props: {
    label: "",
    error: "",
    value: "",
  },
  emits: ["input", "blur"],

  setup(props, context) {
    const inputValue = ref("");
    const handleInput = ({ target }) => {
      inputValue.value = target.value;
      context.emit("input", inputValue.value);
    };

    watch(
      () => props.value,
      (newValue) => {
        inputValue.value = newValue;
      }
    );

    return {
      handleInput,
      inputValue,
    };
  },
});
</script>
<style lang="scss" scoped>
.field.error input {
  border: 3px solid tomato !important;
}
.field.error span {
  color: tomato;
}
</style>

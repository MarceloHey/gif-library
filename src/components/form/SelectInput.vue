<template>
  <sui-form-field>
    <label>{{ label }}</label>
    <sui-dropdown
      :loading="loading"
      @keyup="(ev) => $emit('search', ev.target.value)"
      multiple
      fluid
      :options="options"
      :placeholder="placeholder"
      search
      selection
      v-model="selectedItems"
      @input="(value) => $emit('select', value)"
    />
  </sui-form-field>
</template>
<script>
import { defineComponent, ref, watch } from "@vue/composition-api";

export default defineComponent({
  props: {
    loading: false,
    label: "",
    placeholder: "",
    options: [],
    selected: [],
  },
  emits: ["search", "select"],

  setup(props) {
    const selectedItems = ref([]);
    watch(
      () => props.selected,
      (newValue) => {
        selectedItems.value = newValue;
      }
    );
    return {
      selectedItems,
    };
  },
});
</script>

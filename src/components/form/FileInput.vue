<template>
  <sui-form-field required :error="error !== '' ? true : false">
    <label for="file" class="ui icon button secondary">
      <i class="upload icon"></i>
      Choose file
    </label>
    <input @input="handleSelectFile" type="file" id="file" />
    <div v-if="file && file.name" class="wrapper">
      <div class="fileLabel">
        <div><i class="file icon"> </i> {{ file.name }}</div>
        <div>
          <button @click="handleRemove"><i class="remove icon"></i></button>
        </div>
      </div>
    </div>
    <span v-if="error">{{ error }}</span>
  </sui-form-field>
</template>
<script>
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  props: {
    error: "",
  },

  emits: ["pick", "blur"],

  setup(props, context) {
    const file = ref({});
    const handleSelectFile = ({ target }) => {
      file.value = target.files[0];
      context.emit("pick", target.files[0]);
    };
    const handleRemove = () => {
      file.value = null;
    };

    return {
      handleSelectFile,
      handleRemove,
      file,
    };
  },
});
</script>
<style lang="scss" scoped>
.field input {
  display: none;
}
.field.error input {
  border: 3px solid tomato !important;
}
.field.error span {
  color: tomato;
}
.fileLabel {
  display: flex;
  align-items: center;
  background: white;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 4px;
  background-color: #444;
  font-size: 1.1rem;
  button {
    background: transparent;
    border: none;
    color: white;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }
}
.wrapper {
  background: linear-gradient(to right, hsl(192, 60%, 20%), hsl(280, 87%, 60%));
  padding: 0.2rem;
  border-radius: 4px;
}
</style>

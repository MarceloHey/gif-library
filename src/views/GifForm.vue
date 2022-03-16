<template>
  <div class="form">
    <h1 class="title" text-align="center">Submit your Gif</h1>
    <sui-form @submit="handleSubmit">
      <TextInput
        label="Title"
        :value="gif.title"
        @input="(value) => (gif.title = value)"
        @blur="handleBlur"
        :error="errors.title"
      />
      <SelectInput
        @search="handleSearchTag"
        @select="(value) => (gif.tags = value)"
        label="Tags"
        placeholder="Search for tags"
        :options="tags"
        :selected="selectedTags"
      />
      <FileInput @pick="(file) => (gif.file = file)" :error="errors.file" />
      <sui-button :disabled="loading" class="fluid" type="submit"
        >Submit</sui-button
      >
    </sui-form>
  </div>
</template>
<script>
import { defineComponent, ref, computed, reactive } from "@vue/composition-api";
import store from "../store/index";
import mapTagsJson from "../functions/mapTags";

import FileInput from "../components/form/FileInput.vue";
import TextInput from "../components/form/TextInput.vue";
import SelectInput from "../components/form/SelectInput.vue";

export default defineComponent({
  components: {
    FileInput,
    TextInput,
    SelectInput,
  },
  setup(props, context) {
    const router = context.root.$router;
    const selectedTags = ref([]);
    const selectedFile = ref();
    const searchTagString = ref("");
    const tags = computed(() => mapTagsJson(store.getters.tags));
    const canSubmit = ref(true);
    const gif = reactive({
      title: "",
      tags: [],
      file: {},
    });
    const errors = reactive({
      title: "",
      file: "",
    });

    const handleBlur = (field) => {
      if (field === "title") {
        if (gif.title) {
          errors.title = "";
        }
      }
    };

    const handleSubmit = (ev) => {
      ev.preventDefault();

      !gif.title
        ? (errors.title = "Please name your gif")
        : (errors.title = "");

      !gif.file
        ? (errors.file = "Please select a file to upload")
        : (errors.file = "");

      !errors.title && !errors.file
        ? (canSubmit.value = true)
        : (canSubmit.value = false);

      if (canSubmit.value === true) {
        console.log({ ...gif });
        store.dispatch("createGif", gif);
        router.push({ path: "/" });
      }
    };

    const searchTag = (value) => {
      searchTagString.value = value;
      store.dispatch("searchTags", searchTagString.value);
    };

    let timer = undefined;
    const handleSearchTag = (value) => {
      if (timer) {
        window.clearTimeout(timer);
      }
      timer = window.setTimeout(function () {
        searchTag(value);
      }, 1000);
    };

    return {
      loading: computed(() => store.getters.loading),
      loadingTags: computed(() => store.getters.loadingTags),
      handleSubmit,
      handleSearchTag,
      tags,
      gif,
      errors,
      searchTagString,
      handleBlur,
      canSubmit,
      selectedTags,
      selectedFile,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../scss/mixins";
.form {
  padding: 40px 15rem;
  @include device(small) {
    padding: 40px 20px;
  }
  @include device(medium) {
    padding: 40px 8rem;
  }
  @include device(large) {
    padding: 40px 15rem;
  }
}

.title {
  font-size: 3rem;
  text-align: center;
  @include device(small) {
    font-size: 2rem;
  }
}

.fluid.ui.button {
  color: white;
  background-image: linear-gradient(
    to right,
    hsl(192, 100%, 30%),
    hsl(280, 87%, 60%)
  );
}
</style>

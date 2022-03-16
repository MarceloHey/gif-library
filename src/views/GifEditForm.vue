<template>
  <div class="container">
    <sui-grid stackable :columns="2" divided>
      <sui-grid-row v-if="gif">
        <sui-grid-column>
          <GifCard size="huge" :gif="gif" />
        </sui-grid-column>
        <sui-grid-column>
          <div class="form">
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
                @select="(value) => (selectedTags = value)"
                label="Tags"
                placeholder="Search for tags"
                :options="tags"
                :selected="selectedTags"
              />
              <sui-button
                :disabled="!canSubmit || loading"
                class="fluid"
                type="submit"
                >Submit</sui-button
              >
            </sui-form>
          </div>
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>
    <Loading v-if="loading" />
  </div>
</template>
<script>
import { defineComponent, computed, reactive, ref } from "@vue/composition-api";
import store from "../store/index";
import mapTagsJson from "../functions/mapTags";

import GifCard from "../components/GifCard.vue";
import TextInput from "../components/form/TextInput.vue";
import SelectInput from "../components/form/SelectInput.vue";
import Loading from "../helpers/Loading.vue";

export default defineComponent({
  components: {
    GifCard,
    TextInput,
    SelectInput,
    Loading,
  },
  setup(props, context) {
    const router = context.root.$router;
    const id = router.currentRoute.params.id;
    const gif = computed(() => store.getters.gif);
    const tags = computed(() => mapTagsJson(store.getters.tags));
    const searchTagString = ref("");
    const selectedTags = ref([]);
    const canSubmit = ref(false);

    const errors = reactive({
      title: "",
    });
    const updatedGif = reactive({
      title: "",
      tags: "",
    });

    const handleBlur = (field) => {
      if (field === "title") {
        gif.value.title ? (errors.title = "") : null;
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

    const handleSubmit = (ev) => {
      ev.preventDefault();

      !gif.value.title
        ? (errors.title = "Please name your gif")
        : (errors.title = "");

      !errors.title ? (canSubmit.value = true) : (canSubmit.value = false);

      if (canSubmit.value === true) {
        updatedGif.title = gif.value.title;
        updatedGif.tags = [...selectedTags.value];
        store.dispatch("editGif", { ...updatedGif });
        router.go(-1);
      }
    };

    store.dispatch("loadGif", id);
    return {
      loading: computed(() => store.getters.loading),
      loadingTags: computed(() => store.getters.loadingTags),
      handleSubmit,
      handleBlur,
      handleSearchTag,
      selectedTags,
      gif,
      tags,
      errors,
      canSubmit,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../scss/mixins";
.container {
  padding: 40px 15rem;
  @include device(small) {
    padding: 40px 20px;
  }
  @include device(medium) {
    padding: 40px 8rem;
  }
  @include device(large) {
    padding: 40px 20rem;
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

.form {
  .field.error input {
    border: 3px solid tomato !important;
  }
}
</style>

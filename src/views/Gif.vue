<template>
  <div class="container">
    <sui-grid v-if="!loading" stackable :columns="2" divided>
      <sui-grid-row>
        <sui-grid-column>
          <GifCard size="huge" :gif="gif" />
        </sui-grid-column>
        <sui-grid-column>
          <div>
            <h1 class="ui huge header">{{ gif.title }}</h1>
            <div class="buttons">
              <router-link :to="`${gif.id}/edit`">
                <sui-button class="secondary">Edit</sui-button>
              </router-link>
              <sui-button @click="handleDeleteClick" class="red"
                >Delete</sui-button
              >
            </div>
            <h4 class="ui medium header">
              <img
                v-if="gif.user"
                :src="gif.user.avatar_url"
                alt="Profile picture"
                class="ui circular image"
              />
              {{ (gif.user && gif.user.username) || "" }}
              <span>
                {{ formatDate(gif.import_datetime) }}
              </span>
            </h4>
          </div>
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>
    <ConfirmDelete
      @delete="handleDelete"
      @cancel="() => (deleteModal = false)"
      v-if="deleteModal"
    />
    <Loading v-if="loading" />
  </div>
</template>
<script>
import { defineComponent, computed, ref } from "@vue/composition-api";
import store from "../store/index";

import GifCard from "../components/GifCard.vue";
import ConfirmDelete from "../components/ConfirmDelete.vue";
import Loading from "../helpers/Loading.vue";

export default defineComponent({
  components: {
    GifCard,
    Loading,
    ConfirmDelete,
  },
  setup(props, context) {
    const router = context.root.$router;
    const id = router.currentRoute.params.id;
    const deleteModal = ref(false);

    const formatDate = (date) => {
      return date.slice(0, 10);
    };

    const handleDeleteClick = () => {
      deleteModal.value = true;
    };

    const handleDelete = (id) => {
      store.dispatch("deleteGif", id);
      deleteModal.value = false;
      router.push({ path: "/" });
    };

    store.dispatch("loadGif", id);
    return {
      gif: computed(() => store.getters.gif),
      loading: computed(() => store.getters.loading),
      deleteModal,
      formatDate,
      handleDelete,
      handleDeleteClick,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../scss/mixins";
@import "../scss/animations";
.container {
  padding: 30px 10rem;
  animation: slide-in 2s forwards;
  @include device(small) {
    padding: 40px 20px;
  }
  @include device(medium) {
    padding: 40px 10rem;
  }
  @include device(large) {
    padding: 40px 20rem;
  }
  img {
    margin-right: 10px;
  }
  span {
    margin-left: 10px;
    color: #666;
  }
  .buttons {
    display: flex;
    align-items: center;
  }
}
</style>

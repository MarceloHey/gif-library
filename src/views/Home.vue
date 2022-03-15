<template>
  <div class="home">
    <sui-grid class="ui center aligned grid">
      <div class="sixteen wide column">
        <div class="hero">
          <h1>Your favourite gif library!</h1>
          <sui-input
            @keyup="handleSearch"
            :value="searchString"
            size="huge"
            placeholder="Search for your favourite gifs!"
            icon="search"
          />
          <router-link to="form">
            <sui-button class="ui secondary huge">Post your gif</sui-button>
          </router-link>
        </div>
      </div>
    </sui-grid>
    <div class="cards">
      <div class="card" v-for="gif in gifs" :key="gif.id">
        <router-link :to="`gifs/${gif.id}`">
          <GifCard :details="false" :gif="gif" />
        </router-link>
      </div>
    </div>
    <Loading v-if="loading" />
  </div>
</template>
<script>
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  onUnmounted,
} from "@vue/composition-api";
import store from "../store/index";

import GifCard from "../components/GifCard.vue";
import Loading from "../helpers/Loading.vue";

export default defineComponent({
  components: {
    GifCard,
    Loading,
  },

  setup() {
    const searchString = ref("");
    const pagination = computed(() => store.getters.pagination);
    const gifs = computed(() => store.getters.gifs);

    store.dispatch("loadGifs", { ...pagination.value });

    onMounted(() => {
      window.addEventListener("wheel", infiniteScroll);
      window.addEventListener("scroll", infiniteScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("wheel", infiniteScroll);
      window.removeEventListener("scroll", infiniteScroll);
    });

    let canLoadMore = true;
    const infiniteScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      let bottomOfWindow = scrollHeight - scrollTop === clientHeight;
      if (bottomOfWindow && canLoadMore) {
        canLoadMore = false;
        store.dispatch("changePagination", {
          limit: 25,
          offset: gifs.value.length + 1,
        });
        setTimeout(() => {
          store.dispatch("loadMoreGifs", {
            pagination: { ...pagination.value },
            query: searchString.value,
          });
          canLoadMore = true;
        }, 3000);
      }
    };

    const search = (value) => {
      searchString.value = value;
      store.dispatch("searchGifs", {
        query: searchString.value,
        pagination: { ...pagination.value },
      });
      if (!value) {
        store.dispatch("loadGifs", pagination);
      }
    };

    let timer = undefined;
    const handleSearch = ({ target }) => {
      if (timer) {
        window.clearTimeout(timer);
      }
      timer = window.setTimeout(function () {
        search(target.value);
      }, 1000);
    };

    return {
      gifs: computed(() => store.getters.gifs),
      loading: computed(() => store.getters.loading),
      handleSearch,
      searchString,
    };
  },
});
</script>
<style lang="scss">
@import "../scss/mixins";
@import "../scss/animations";
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  padding: 0;
  height: 20rem;
  background-image: linear-gradient(
    to right,
    hsl(192, 100%, 10%),
    hsl(280, 87%, 60%)
  );
  .input {
    animation: slide-in 2s forwards;
    align-self: center;
    border-color: red;
    margin: 10px 0 20px 0;
    width: 500px;
    input[type="text"] {
      background-color: #333 !important;
      color: white !important;
    }
  }
  h1 {
    animation: slide-in 1s forwards;
    font-size: 3rem;
    color: white;
    font-weight: bold;
  }
  button {
    animation: slide-in 3s forwards;
  }
}
.cards {
  margin-top: 30px;
  column-count: 4;
  padding: 5px 40px;
  padding-bottom: 50px;
  animation: slide-in 4s forwards;
  @include device(small) {
    column-count: 1;
    padding: 0 50px;
  }
  @include device(medium) {
    column-count: 3;
  }
  @include device(large) {
    column-count: 6;
  }
  .card {
    break-inside: avoid-column;
    margin: 1rem 0;
  }
}
</style>

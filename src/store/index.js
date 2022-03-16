import Vue from "vue";
import Vuex from "vuex";
import {
  fetchGifs,
  fetchGif,
  fetchTags,
  searchGifs,
  postGif,
  editGif,
  deleteGif
} from "../api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gifs: [],
    gif: {},
    tags: [],
    pagination: {
      offset: 0,
      limit: 10
    },
    loading: false,
    loadingTags: false,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setLoadingTags(state, payload) {
      state.loadingTags = payload;
    },
    setGifs(state, payload) {
      state.gifs = payload
    },
    setPagination(state, payload) {
      state.pagination = payload;
    },
    setGif(state, payload) {
      state.gif = payload;
    },
    setTags(state, payload) {
      state.tags = payload;
    },
  },
  actions: {
    async loadGifs({ commit }, pagination) {
      commit("setLoading", true);
      try {
        const gifs = await fetchGifs(pagination);
        commit("setGifs", gifs.data);
      } catch (error) {
        throw new Error(error);
      } finally {
        commit("setLoading", false);
      }
    },

    async loadMoreGifs({ state, commit }, { pagination, query }) {
      commit("setLoading", true);
      try {
        const gifs = query === ''
          ? await fetchGifs(pagination)
          : await searchGifs(query, pagination);
        const currentGifs = state.gifs;
        const newGifs = [...currentGifs, ...gifs.data]
        commit("setGifs", newGifs);
      } catch (error) {
        throw new Error(error);
      } finally {
        commit("setLoading", false);
      }
    },

    async searchGifs({ commit }, { pagination, query }) {
      commit("setLoading", true);
      try {
        const gifs = await searchGifs(query, pagination);
        commit("setGifs", gifs.data);
      } catch (error) {
        throw new Error(error);
      } finally {
        commit("setLoading", false);
      }
    },

    async loadGif({ commit }, id) {
      commit("setLoading", true);
      commit("setGif", {})
      try {
        const gif = await fetchGif(id);
        commit("setGif", gif.data);
      } catch (error) {
        throw new Error(error);
      } finally {
        commit("setLoading", false);
      }
    },

    async searchTags({ state, commit }, query) {
      commit("setLoadingTags", true);
      try {
        const tags = await fetchTags(query);
        const currentTags = state.tags;
        const newTags = [...currentTags, ...tags.data]
        commit("setTags", newTags);
      } catch (error) {
        throw new Error(error);
      } finally {
        commit("setLoadingTags", false);
      }
    },

    async createGif({ commit }, gif) {
      commit("setLoading", true);
      try {
        await postGif(gif)
        Vue.$toast.success("Gif created", {
          timeout: 2000
        });
      } catch (error) {
        throw new Error(error);
      } finally {
        commit("setLoading", false);
      }
    },

    async editGif({ commit }) {
      commit("setLoading", true);
      try {
        await editGif()
        Vue.$toast.success("Gif edited", {
          timeout: 2000
        });
      } catch (error) {
        throw new Error(error);
      } finally {
        commit("setLoading", false);
      }
    },

    async deleteGif({ commit }) {
      commit("setLoading", true);
      try {
        await deleteGif()
        Vue.$toast.success("Gif deleted", {
          timeout: 2000
        });
      } catch (error) {
        throw new Error(error);
      } finally {
        commit("setLoading", false);
      }
    },

    changePagination({ commit }, pagination) {
      commit('setPagination', pagination)
    }
  },
  getters: {
    gifs: (state) => {
      return state.gifs
    },
    gif: (state) => {
      return state.gif
    },
    loading: (state) => {
      return state.loading
    },
    loadingTags: (state) => {
      return state.loadingTags
    },
    pagination: (state) => {
      return state.pagination
    },
    tags: (state) => {
      return state.tags
    },
  },
  modules: {},
});

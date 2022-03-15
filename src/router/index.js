import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Gif from "../views/Gif.vue";
import GifForm from "../views/GifForm.vue";
import GifEditForm from "../views/GifEditForm.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/gifs/:id",
    name: "Gif",
    component: Gif,
  },
  {
    path: "/gifs/:id/edit",
    name: "GifEditForm",
    component: GifEditForm,
  },
  {
    path: "/form",
    name: "GifForm",
    component: GifForm,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

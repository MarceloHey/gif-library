import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import VueCompositionAPI from '@vue/composition-api'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


Vue.config.productionTip = false;
Vue.use(SuiVue)
Vue.use(Toast)
Vue.use(VueCompositionAPI)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

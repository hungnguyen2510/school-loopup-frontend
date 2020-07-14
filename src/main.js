import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);
Vue.config.productionTip = false;
Vue.filter("truncate", function(value, limit) {
  if (value.length > limit) {
    value = value.substring(0, limit - 3) + "...";
  }

  return value;
});

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
Vue.component("v-select", vSelect);

Vue.config.productionTip = false

// common number filters
Vue.filter("toFixed", (num, asset) => {
  if (typeof asset === "number") return Number(num).toFixed(asset);
  return Number(num).toFixed(asset === "USDT" || asset === "TRY" ? 2 : 8);
});

Vue.filter("toMoney", num => {
  return Number(num)
     .toFixed(0)
     .replace(/./g, (c, i, a) => {
        return i && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
     });
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

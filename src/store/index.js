import Vue from "vue";
import Vuex from "vuex";
import cryptoDetails from "./modules/cryptoDetails";
import cryptos from "./modules/cryptos";
import trades from './modules/trades'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    
    cryptos,
    cryptoDetails,
    trades,
  },

  // // enable strict mode (adds overhead!)
  // // for dev mode only
  // strict: process.env.DEBUGGING
});

export default store;

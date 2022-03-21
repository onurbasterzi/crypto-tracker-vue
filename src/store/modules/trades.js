import { v4 as uuidv4 } from "uuid";
import { timeFormatter } from "@/helpers";
const state = {
  trades: [],
  tradeStatus: 0,
};

const getters = {

  


  getTrades: () => (item) => {
    let reg = /^([A-Z]+)(BTC|ETH|BNB|USDT|TUSD|TRY)$/;
    let symbol = String(item.s)
      .replace(/[^\w\-]+/g, "")
      .toUpperCase();
    let token = symbol.replace(reg, "$1");
    let asset = symbol.replace(reg, "$2");
    let time = timeFormatter(item.E) 
    let price = item.p;
    let quantity = item.q;
    let isBuyer = !item.m;
    let style = isBuyer ? "gain" : "loss";
    let id = uuidv4();

    return {
      time,
      symbol,
      price,
      quantity,
      isBuyer,
      style,
      id,
      token,
      asset,
    };
  },

  getLastTrades(state) {
    state.trades.splice(0,1)
    return state.trades.slice(-30).reverse();
  },
};

const mutations = {

  setLastTrades(state,tradesData){
    state.trades=tradesData
  },

  setTrades(state, tradesData) {
    state.trades.push(tradesData);
  },
  setTradesStatus(state, _status) {
    state.tradeStatus = _status;
  },

  clearTrades(state) {
    state.trades = [];
  },

};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

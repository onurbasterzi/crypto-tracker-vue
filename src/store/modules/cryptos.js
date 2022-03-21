const state = {
  coins: [],
  status: 0,
  endpoint: "wss://stream.binance.com:9443/ws/!ticker@arr",
  // endpoint:"wss://stream.binance.com:9443/ws/btcusdt@ticker",
  limit: 25,
  iconbase: "https://raw.githubusercontent.com/rainner/binance-watch/master/public/images/icons/",
  sort: "assetVolume",
  order: "desc",
  asset: "USDT",
  viewType: "grid",

};
const getters = {

  // getSingleCoin:(state)=>(pair)=>{
  //   var testlist = coins.filter(i => i.s === "ETHBTC");
  //   console.log(testlist);
  // },
  
  getCoinData: (state) => (item) => {
    let reg = /^([A-Z]+)(BTC|ETH|BNB|USDT|TUSD|TRY)$/;
    let symbol = String(item.s)
      .replace(/[^\w\-]+/g, "")
      .toUpperCase();
    let token = symbol.replace(reg, "$1");
    let asset = symbol.replace(reg, "$2");
    let name = token;
    let pair = token + "/" + asset;
    let icon = state.iconbase + token.toLowerCase() + "_.png";
    let open = parseFloat(item.o);
    let high = parseFloat(item.h);
    let low = parseFloat(item.l);
    let close = parseFloat(item.c);
    let change = parseFloat(item.p);
    let percent = parseFloat(item.P);
    let trades = parseInt(item.n);
    let tokenVolume = Math.round(item.v);
    let assetVolume = Math.round(item.q);
    let sign = percent >= 0 ? "+" : "";
    let arrow = percent >= 0 ? "▲" : "▼";
    let info = [pair, close.toFixed(8), "(", arrow, sign + percent.toFixed(2) + "%", "|", sign + change.toFixed(8), ")"].join(" ");
    let style = "";

    if (percent > 0) style = "gain";
    if (percent < 0) style = "loss";

    return {
      symbol,
      token,
      asset,
      name,
      pair,
      icon,
      open,
      high,
      low,
      close,
      change,
      percent,
      trades,
      tokenVolume,
      assetVolume,
      sign,
      arrow,
      style,
      info,
    };
  },

  fakeHistory: () => (close) => {
    let num = close * 0.0001; // faction of current price
    let min = -Math.abs(num);
    let max = Math.abs(num);
    let out = [];

    for (let i = 0; i < 50; ++i) {
      let rand = Math.random() * (max - min) + min;
      out.push(close + rand);
    }
    return out;
  },

  getCoinsList(state, getters) {
    let list = state.coins.slice();
    if (state.asset) {
      list = list.filter((i) => i.asset === state.asset);
    }
    if (state.sort) {
      list = getters.getSortedList(list, state.sort, state.order);
    }
    if (state.limit) {
      list = list.slice(0, state.limit);
    }
    return list;
  },

  getSortedLabel: (state) => {
    switch (state.sort) {
      case "token":
        return "Token";
      case "percent":
        return "Percent";
      case "close":
        return "Price";
      case "change":
        return "Change";
      case "assetVolume":
        return "Volume";
      case "tokenVolume":
        return "Volume";
      case "trades":
        return "Trades";
      default:
        return "Default";
    }
  },

  getSortedList: (state) => (list) => {
    return list.sort((a, b) => {
      let _a = a[state.sort];
      let _b = b[state.sort];
      if (_a && _b) {
        _a = typeof _a === "string" ? _a.toUpperCase() : _a;
        _b = typeof _b === "string" ? _b.toUpperCase() : _b;
        if (state.order === "asc") {
          if (_a < _b) return -1;
          if (_a > _b) return 1;
        }
        if (state.order === "desc") {
          if (_a > _b) return -1;
          if (_a < _b) return 1;
        }
      }
      return 0;
    });
  },
};
const mutations = {
  setCoins(state, coinsData) {
    state.coins = coinsData;
  },
  setStatus(state, _status) {
    state.status = _status;
  },
  setLimit(state, _limit) {
    state.limit = parseInt(_limit) || 0;
  },

  setSort(state, sortData) {
    //key, order
    if (state.sort !== sortData[0]) {
      state.order = sortData[1] || "asc";
    } else {
      state.order = state.order === "asc" ? "desc" : "asc";
    }

    state.sort = sortData[0];
    console.log(" sort : " + state.order + " order: " + state.sort);
  },

  setAsset(state, _asset) {
    state.asset = String(_asset || "BTC");
  },

  setViewType(state, type) {
    state.viewType = type;
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

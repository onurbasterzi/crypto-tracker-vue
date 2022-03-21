import store from "../../store";
let sock = null;
let cache = {};

const mainStream = {
  sockInit() {
    if (store.state.cryptos.status > 0) return;
    try {
      store.commit("cryptos/setStatus", 0);

      sock = new WebSocket(store.state.cryptos.endpoint);
      sock.addEventListener("open", this.onSockOpen);
      sock.addEventListener("close", this.onSockClose);
      sock.addEventListener("error", this.onSockError);
      sock.addEventListener("message", this.onSockData);
    } catch (err) {
      console.error("Main Socket Error:", err.message || err);
      store.commit("cryptos/setStatus", -1); // error
      sock = null;
    }
  },
  onSockOpen(e) {
    store.commit("cryptos/setStatus", 1); // open
    console.info("Main Socket:", "Connection open (" + store.state.cryptos.endpoint + ").");
  },

  onSockClose(e) {
    store.commit("cryptos/setStatus", 0); // closed
    console.info("Main Socket:", "Connection closed (" + store.state.cryptos.endpoint + ").");
  },

  onSockError(err) {
    store.commit("cryptos/setStatus", -1);
    console.error("Main Socket Error:", err.message || err);
  },

  onSockData(e) {
    let list = JSON.parse(e.data) || [];

    for (let item of list) {
      const getCoinData = store.getters["cryptos/getCoinData"];
       const fakeHistory = store.getters["cryptos/fakeHistory"];

      let c = getCoinData(item);
      c.history = cache.hasOwnProperty(c.symbol) ? cache[c.symbol].history : fakeHistory(c.close);
      if (c.history.length > 100) c.history = c.history.slice(c.history.length - 100);

      c.history.push(c.close);

      cache[c.symbol] = c;
    }

    store.commit(
      "cryptos/setCoins",
      Object.keys(cache).map((s) => cache[s])
    );

    store.commit("cryptos/setStatus", 2);
  },

  sockClose() {
    if (sock) {
      sock.close();
      sock = null;
      cache = {};
    }
  },
};

export default mainStream;

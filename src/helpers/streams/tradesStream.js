import store from "../../store";
let sock = null;
let cache = {};

const tradeStream = {
  sockInit(endpoint) {
    console.log("trades",endpoint);
    if (store.state.trades.tradeStatus > 0) return;
    try {
      store.commit("trades/setTradesStatus", 0);
      sock = new WebSocket(endpoint);
      sock.addEventListener("open", (e) => this.onSockOpen(e, endpoint));
      sock.addEventListener("close", (e) => this.onSockClose(e, endpoint));
      sock.addEventListener("error", this.onSockError);
      sock.addEventListener("message", this.onSockData);
    } catch (err) {
      console.error("Trade Socket Error:", err.message || err);
      store.commit("trades/setTradesStatus", -1); // error
      sock = null;
    }
  },
  onSockOpen(e, endpoint) {
    store.commit("trades/setTradesStatus", 1); // open
    console.info("Trade Socket:", "Connection open (" + endpoint + ").");
  },

  onSockClose(e, endpoint) {
    store.commit("trades/setTradesStatus", 0); // closed
    console.info("Trade Socket:", "Connection closed (" + endpoint + ").");
  },

  onSockError(err) {
    store.commit("trades/setTradesStatus", -1);
    console.error("Trade Socket Error:", err.message || err);
  },

  onSockData(e) {
      console.log('trades data');
    let list = JSON.parse(e.data) || [];
    // console.log(list);
    const getTrades = store.getters["trades/getTrades"];
     let c = getTrades(list);
    //  console.log(c);
    store.commit("trades/setTrades", c);
    store.commit("trades/setTradesStatus", 2);  
      // console.log(store.state.trades.trades);

   

  },

  sockClose() {
    if (sock) {
      sock.close();
      sock = null;
      cache = {};
    }
  },
};

export default tradeStream;

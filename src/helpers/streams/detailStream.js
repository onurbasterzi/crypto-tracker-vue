import store from "../../store";
let sock = null;
let cache = {};

const detailStream = {
  sockInit(endpoint) {
    console.log("init");
    if (store.state.cryptoDetails.detailStatus > 0) return;
    try {
      store.commit("cryptoDetails/setDetailStatus", 0);
      sock = new WebSocket(endpoint);
      sock.addEventListener("open", (e) => this.onSockOpen(e, endpoint));
      sock.addEventListener("close", (e) => this.onSockClose(e, endpoint));
      sock.addEventListener("error", this.onSockError);
      sock.addEventListener("message", this.onSockData);
    } catch (err) {
      console.error("Details Socket Error:", err.message || err);
      store.commit("cryptoDetails/setDetailStatus", -1); // error
      sock = null;
    }
  },
  onSockOpen(e, endpoint) {
    store.commit("cryptoDetails/setDetailStatus", 1); // open
    console.info("Details Socket:", "Connection open (" + endpoint + ").");
  },

  onSockClose(e, endpoint) {
    store.commit("cryptoDetails/setDetailStatus", 0); // closed
    console.info("Details Socket:", "Connection closed (" + endpoint + ").");
  },

  onSockError(err) {
    store.commit("cryptoDetails/setDetailStatus", -1);
    console.error("Details Socket Error:", err.message || err);
  },

  onSockData(e) {
    let list = JSON.parse(e.data) || [];
    const getCoinData = store.getters["cryptos/getCoinData"];
    let c = getCoinData(list);

    store.commit("cryptoDetails/setCoinData", c);
    store.commit("cryptoDetails/setDetailStatus", 2);
    //console.log(store.state.cryptoDetails.coin);

   

  },

  sockClose() {
    if (sock) {
      sock.close();
      sock = null;
      cache = {};
    }
  },
};

export default detailStream;

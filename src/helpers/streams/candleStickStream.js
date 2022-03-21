import store from "../../store";
import {dateUtcFormatter} from '@/helpers'
let sock = null;
let cache = {};

const candleStickStream = {
  sockInit(endpoint) {
    console.log("init");
    if (store.state.cryptoDetails.candleStickStatus > 0) return;
    try {
      store.commit("cryptoDetails/setCandleStickStatus", 0);
      sock = new WebSocket(endpoint);
      sock.addEventListener("open", (e) => this.onSockOpen(e, endpoint));
      sock.addEventListener("close", (e) => this.onSockClose(e, endpoint));
      sock.addEventListener("error", this.onSockError);
      sock.addEventListener("message", this.onSockData);
    } catch (err) {
      console.error("CandleStick Socket Error:", err.message || err);
      store.commit("cryptoDetails/setCandleStickStatus", -1); // error
      sock = null;
    }
  },
  onSockOpen(e, endpoint) {
    store.commit("cryptoDetails/setCandleStickStatus", 1); // open
    console.info("CandleStick Socket:", "Connection open (" + endpoint + ").");
  },

  onSockClose(e, endpoint) {
    store.commit("cryptoDetails/setCandleStickStatus", 0); // closed
    console.info("CandleStick Socket:", "Connection closed (" + endpoint + ").");
  },

  onSockError(err) {
    store.commit("cryptoDetails/setCandleStickStatus", -1);
    console.error("CandleStick Socket Error:", err.message || err);
  },

  onSockData(e) {
    let list = JSON.parse(e.data) || [];
    //console.log(list);

    let candlestick = list.k;
   

    store.commit("cryptoDetails/updateLineSeriesData", {
      time: dateUtcFormatter(candlestick.t),
      open: candlestick.o,
      high: candlestick.h,
      low: candlestick.l,
      close: candlestick.c,
    });

    store.commit("cryptoDetails/setCandleStickStatus", 2);

  },

  sockClose() {
    if (sock) {
      sock.close();
      sock = null;
      cache = {};
    }
  },
};

export default candleStickStream;

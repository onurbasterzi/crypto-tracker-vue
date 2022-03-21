import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.binance.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use((response) => ({
  status: response.status,
  statusText: response.statusText,
  data: response.data,
}));

export default {
  klines: (symbol, interval) =>
    instance({
      method: "get",
      url: "/api/v3/klines",
      params: {
        symbol: symbol,
        interval: interval,
        limit: 200,
      },
    }),

  trades: (symbol) =>
    instance({
      method: "get",
      url: "/api/v3/trades",
      params: {
        symbol: symbol.toUpperCase(),
        limit: 30,
      },
    }),
};

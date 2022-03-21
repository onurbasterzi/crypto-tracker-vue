<template>
  <div class="candle-stick-chart">
    <span>O: {{ cursorData.open | toFixed(2) }}</span>
    <span>C: {{ cursorData.close | toFixed(2) }}</span>
    <span>H: {{ cursorData.high | toFixed(2) }}</span>
    <span>L: {{ cursorData.low | toFixed(2) }}</span>
  </div>
</template>

<script>
import { createChart } from "lightweight-charts";
import { closeCandleStickSocket, initCandleStickSocket, klines, dateUtcFormatter } from "@/helpers";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      sock: null,
    };
  },
  computed: {
    ...mapState("cryptoDetails", ["candleData", "lineSeries", "cursorData"]),
    klineEndPoint() {
      return `wss://stream.binance.com:9443/ws/${this.$router.currentRoute.params.pairs}@kline_15m`;
    },
  },
  methods: {
    ...mapMutations("cryptoDetails", ["setCandleData", "pushCandleData", "setLineSeries", "setLineSeriesData", "setCursorData"]),
  },
  mounted() {
    var vm = this;
    if (this.coin) {
      console.log("stateten gelen", this.coin);
    }
    klines(this.$router.currentRoute.params.pairs.toUpperCase(), "15m").then((response) => {
      this.setCandleData([]);
      response.data.forEach((element) => {
        this.pushCandleData({ time: dateUtcFormatter(element[0]), open: element[1], high: element[2], low: element[3], close: element[4] });
      });
      const _candleStickChart = document.querySelector(".candle-stick-chart");
      const chart = createChart(_candleStickChart, {
        layout: {
          textColor: "#d1d4dc",
          backgroundColor: "#02012c",
        },
        crosshair: {
          mode: 0,
        },
        grid: {
          vertLines: {
            color: "rgba(42, 46, 57, 0.5)",
          },
          horzLines: {
            color: "rgba(42, 46, 57, 0.5)",
          },
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
      });

      chart.subscribeCrosshairMove(function (param) {
        if (param.time) {
          param.seriesPrices.forEach((item) => {
            vm.setCursorData(item);
          });
        }
      });

      this.setLineSeries(
        chart.addCandlestickSeries({
          upColor: "rgb(14, 203, 129)",
          downColor: "rgb(246, 70, 93)",
          borderDownColor: "rgb(246, 70, 93)",
          borderUpColor: "rgb(14, 203, 129)",
          wickDownColor: "rgb(246, 70, 93)",
          wickUpColor: "rgb(14, 203, 129)",
        })
      );

      this.setLineSeriesData();
      initCandleStickSocket(this.klineEndPoint);
    });
  },
  destroyed() {
    closeCandleStickSocket();
  },
};
</script>

<style></style>

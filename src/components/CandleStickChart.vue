<template>
  <div class="candle-stick-chart">
    <span>O: {{ parseFloat(cursorData.open) }}</span>
    <span>C: {{ parseFloat(cursorData.close) }}</span>
    <span>H: {{ parseFloat(cursorData.high) }}</span>
    <span>L: {{ parseFloat(cursorData.low) }}</span>
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
        this.pushCandleData({ time: dateUtcFormatter(element[0]), open: parseFloat(element[1]), high: parseFloat(element[2]), low: parseFloat(element[3]), close: parseFloat(element[4]) });
      });
      const _candleStickChart = document.querySelector(".candle-stick-chart");
      const chart = createChart(_candleStickChart, {
        priceFormat: {
          type: "price",
          precision: 6,
          minMove: 0.000001,
        },
        rightPriceScale: {
          mode: 1,
          borderColor: "rgba(197, 203, 206, 0.4)",
        },
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

      this.lineSeries.applyOptions({
        priceFormat: {
          type: "price",
          precision: 6,
          minMove: 0.000001,
        },
      });

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

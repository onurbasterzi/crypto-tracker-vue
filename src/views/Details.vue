<template>
  <div class="home">
    <TopBar :hide="true" />
    <div class="content-wrapper">
      <div class="details" v-if="detailStatus == 2">
        <div class="detail">
          <DetailInfo />

          <div class="detail-chart">
            <CandleStickChart />
          </div>
        </div>
        <div class="trades">
          <Trades />
        </div>
      </div>
      <div v-else>
        <Loader :status="detailStatus" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CandleStickChart, DetailInfo, TopBar, Trades, Loader } from "../components";
import { closeDetailSocket, initDetailSocket } from "@/helpers";

export default {
  components: { TopBar, CandleStickChart, Trades, Loader, DetailInfo },
  computed: {
    ...mapState("cryptoDetails", ["detailStatus"]),

    detailEndPoint() {
      return `wss://stream.binance.com:9443/ws/${this.$router.currentRoute.params.pairs}@ticker`;
    },
    
  },

  mounted() {
    initDetailSocket(this.detailEndPoint);
  },

  destroyed() {
    closeDetailSocket();
  },
};
</script>

<style></style>

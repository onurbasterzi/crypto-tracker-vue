<template>
  <div>
    <div class="trade-wrapper">
      <h2 style="text-align: center; margin-bottom: 10px">Trades</h2>
      <div class="trade">
        <div>Price</div>
        <div>Amount</div>
        <div>Time</div>
      </div>
      <hr />
      <div class="trade" v-for="data in getLastTrades" :key="data.id" :style="data.style == 'gain' ? 'color:rgb(14, 203, 129)' : 'color:rgb(246, 70, 93)'">
        <div class="item">{{ parseFloat(data.price) }}</div>
        <div class="item">{{ parseFloat(data.quantity)}}</div>
        <div class="item">{{ data.time }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { closeTradeSocket, initTradeSocket } from "@/helpers";
import { mapGetters, mapMutations, mapState } from "vuex";
import { trades,timeFormatter } from "@/helpers";
export default {
  computed: {
    ...mapState("trades", ["trades"]),
    ...mapGetters("trades", ["getLastTrades"]),
    tradesEndPoint() {
      return `wss://stream.binance.com:9443/ws/${this.$router.currentRoute.params.pairs}@trade`;
    },

    
  },

  // filters:{
  //   pa
  // },

  methods: {
    ...mapMutations("trades", ["clearTrades", "setTrades"]),
  },

  mounted() {
  
    var vm = this;
    this.clearTrades();

    trades(this.$router.currentRoute.params.pairs).then((res) => {
      console.log("trades api", res.data);
      res.data.forEach((element) => {
        vm.setTrades({
          id: element.id,
          isBuyer: !element.isBuyerMaker,
          price: parseFloat(element.price),
          quantity: element.qty,
          time: timeFormatter(element.time),
          symbol: this.$router.currentRoute.params.pairs,
          style: !element.isBuyerMaker ? "gain" : "loss",
        });
      });
    });

    initTradeSocket(vm.tradesEndPoint);
  },

  destroyed() {
    closeTradeSocket();
  },
};
</script>

<style></style>

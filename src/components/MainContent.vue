<template>
  <div class="content-wrapper">
    <div class="crypto-wrapper" v-if="viewType == 'grid'">
      <div class="crypto-card" @click="chartClick(c)" v-for="c in getCoinsList" :key="c.symbol" :class="c.style">
        <div class="info">
          <div class="logo">
            <img @error="$event.target.src = iconUrl" :src="c.icon" :alt="c.pair" />
            <p>
              {{ c.token }}/<span>{{ c.asset }}</span>
            </p>
          </div>
          <div class="details">
            <div class="percent color">{{ c.arrow }} {{ c.sign }}{{ c.percent | toFixed(2) }}%</div>
            <div>{{ c.sign }}{{ parseFloat(c.change) }} 24h</div>
            <div>{{ c.assetVolume | toMoney }} </div>
          </div>
        </div>
        <div class="price">
          <p>{{ parseFloat(c.close) }}</p>
        </div>
        <div>
          <LineChart :width="600" :height="60" :values="c.history" />
        </div>
      </div>
    </div>

    <div style="overflow-x: auto">
      <table class="listView" v-if="viewType == 'list'" style="width: 100%">
        <tr>
          <td>Token/Asset</td>
          <td>Price</td>
          <td>Percent</td>
          <td>24h</td>
          <td>Volume</td>
          <td>Graphic</td>
        </tr>

        <tr class="table-row" @click="chartClick(c)" v-for="c in getCoinsList" :key="c.symbol" :class="c.style">
          <td class="icon">
            <div>
              <img @error="$event.target.src = iconUrl" style="width: 40px" :src="c.icon" :alt="c.pair" />
            </div>
            <div>
              <span>{{ c.token }}</span
              >/<span class="text-small">{{ c.asset }}</span>
            </div>
          </td>
          <td>{{ c.close | toFixed(2) }} {{ c.asset }}</td>
          <td>
            <div class="color text-big text-clip">{{ c.arrow }} {{ c.sign }}{{ c.percent | toFixed(2) }}%</div>
          </td>
          <td>{{ c.sign }}{{ c.change | toFixed(asset) }}</td>
          <td>{{ c.assetVolume | toMoney }} <small class="text-faded">Vol</small></td>
          <td><LineChart :width="600" :height="40" :values="c.history" /></td>
        </tr>
      </table>
    </div>

    <Loader :status="status" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import {initMainSocket,closeMainSocket} from '../helpers'
import {LineChart,Loader} from "@/components";

export default {
  
  computed: {
    ...mapState("cryptos", ["coins", "limit", "order", "sort", "asset", "viewType", "status"]),
    ...mapGetters("cryptos", ["getCoinsList"]),
    iconUrl() {
      return require("../assets/no-image.png");
    },
  },
  methods: {
    ...mapMutations("cryptoDetails", ["setCoinData"]),
    error(event) {
      event.target.src = "../assets/logo.png";
    },

    chartClick(data) {
      let pair = data.pair;
      pair = pair.replace("/", "").toLowerCase();
      this.$router.push(`/details/${pair}`);
      //alert(`wss://stream.binance.com:9443/ws/${pair}@trade`);
    },
  },
  mounted() {
    console.log('mounted main');
    initMainSocket();
  },
  destroyed() {
    console.log("main destroyed");
    closeMainSocket();
  },
  components: { LineChart, Loader },
};
</script>

<template>
  <div class="detail-info" :class="coin.style">
    <div class="logo">
      <img @error="$event.target.src = iconUrl" :src="coin.icon" :alt="coin.pair" />
      <h2>
        {{ coin.token }}/<span>{{ coin.asset }}</span>
      </h2>
      <div class="percent color">{{ coin.arrow }} {{ coin.sign }}{{ coin.percent | toFixed(2) }}%</div>
    </div>
    <div class="price">
      <div>{{ coin.close | toFixed(coin.asset) }} {{ coin.asset }}</div>
    </div>
    <div class="details">
      <div>{{ coin.sign }}{{ coin.change | toFixed(coin.asset) }} - <span>24h</span></div>
      <div>{{ coin.assetVolume | toMoney }} - <span>Vol</span></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("cryptoDetails", ["coin"]),
    iconUrl() {
      return require("../assets/no-image.png");
    },
  },
};
</script>

<style></style>

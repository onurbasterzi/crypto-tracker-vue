<template>
  <header class="topbar">
      <h1 @click="goHome()" class="logo" >Crypto Tracker</h1>
  
    <div class="dropdowns" :class="hide?'hide':''">
      <div class="dropdown">
        <div class="form-input">▼  Show: {{ limit == 0 ? "All" : limit }}</div>
        <ul>
          <li  @click="setLimit(0)"> All</li>
          <li  @click="setLimit(5)"> 5</li>
          <li  @click="setLimit(10)">10</li>
          <li  @click="setLimit(15)">15</li>
          <li  @click="setLimit(25)">25</li>
          <li  @click="setLimit(50)">50</li>
        </ul>
      </div>
      <div class="dropdown">
        <div class="form-input">▼ Sort By {{ getSortedLabel }} {{order}}</div>
        <ul>
          <li @click="setSort( ['token', 'asc'] )"> Token</li>
          <li @click="setSort( ['close', 'desc'] )"> Price</li>
          <li @click="setSort( ['assetVolume', 'desc'] )"> Volume</li>
          <li @click="setSort( ['percent', 'desc'] )"> Percent</li>
          <li @click="setSort( ['change', 'desc'] )"> Change</li>
          <li @click="setSort( ['trades', 'desc'] )"> Trades</li>
        </ul>
      </div>
      <div class="dropdown">
        <div class="form-input">▼ Asset {{ asset }}</div>
        <ul>
          <li @click="setAsset('USDT')">USDT</li>
          <li @click="setAsset('TRY')">TRY</li>
            <li @click="setAsset('BTC')">BTC</li>
          <li @click="setAsset('ETH')">ETH</li>
          <li @click="setAsset('BNB')">BNB</li>
      
        </ul>
      </div>
        <div class="dropdown">
        <div @click="setViewType(viewType==='grid'?'list':'grid')" class="form-input">View: {{ viewType.toUpperCase() }}</div>
      </div>
    </div>
  </header>
</template>

<script>
import "vue-select/dist/vue-select.css";
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {};
  },

  props:['hide'],
  computed: {
    ...mapState('cryptos',['limit','sort','order','asset','viewType']),
    ...mapGetters('cryptos',['getSortedLabel']),

  },
  methods: {
    ...mapMutations('cryptos',["setLimit","setSort","setAsset",'setViewType']),

    goHome(){
      this.$router.push('/');
    }
  },
};
</script>

<style></style>

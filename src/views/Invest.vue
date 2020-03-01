<template>
  <div class="invest">
    <PageHeading>Invest your money</PageHeading>
    <div class="bg-white p-6 mb-10 rounded-lg">
      <p
        class="text-celadon-green font-semibold text-sm">Cash Balance:
        <transition name="fade" mode='out-in'>
        <span v-bind:key="cashBalance" class="font-bold">{{ cashBalance | formatCurrency }}</span>
        </transition>
      </p>
    </div>
    <div v-if="stocks.length <= 0" class="text-center">
      <p class="h3 mt-3">No Stocks</p>
    </div>
    <div v-else>
      <h2 class="mb-5 text-celadon-green text-lg font-semibold">Available Stocks:</h2>
      <!-- Two column grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Stock
          v-for="(stock, index) in stocks"
          v-bind:item="stock"
          v-bind:index="index"
          v-bind:key="index"
          v-bind:stockId="stock.id"
          v-bind:stockName="stock.name"
          v-bind:stockPrices="stock.prices"
        ></Stock>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PageHeading from '@/components/PageHeading.vue'
import Stock from '@/components/InvestStock.vue'

export default {
  data: function () {
    return {
    }
  },
  computed: {
    stocks: function () {
      return this.$store.getters.getStocks
    },
    cashBalance: function () {
      console.log('Cash Balance:')
      console.log(this.$store.getters.getCashBalance)
      return this.$store.getters.getCashBalance
    }
  },
  components: {
    Stock,
    PageHeading
  }
}

</script>

<style scoped>
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
</style>

<template>
  <div class="portfolio">
    <PageHeading>Your Portfolio</PageHeading>
    <div class="bg-white p-6 mb-10 rounded-lg">
      <h2>Earnings</h2>
      <trend
        :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0, 20]"
        :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
        auto-draw
        smooth
      >
      </trend>
    </div>
    <div class="bg-blue-100 rounded-lg p-4 shadow-xl mt-0 mb-4 flex flex-wrap justify-between">
      <p class="w-full text-center text-4xl my-6 font-thin">You have {{ portfolioValue | formatCurrency }}</p>
      <p class="text-sm">Cash balance: <span class="font-bold">{{ cashBalance | formatCurrency }}</span></p>
      <p class="text-sm">Holdings value: <span class="font-bold">{{ holdingsValue | formatCurrency }}</span></p>
    </div>
    <h2 class="sr-only">Stocks</h2>
    <div
      v-if="holdings.length <= 0"
      class="bg-red-100 border border-gray-400 rounded-lg p-4 shadow-xl mt-10 mb-4 flex flex-wrap justify-between">
      <p class="text-lg font-light">You don't own any stocks</p>
    </div>
    <div v-else>
      <!-- Two columns -->
      <div class="mt-10">
        <PortfolioStock
          v-for="(holding, index) in holdings"
          v-bind:item="holding"
          v-bind:index="index"
          v-bind:key="index"
          v-bind:holding="holding"
          v-bind:stock="getStockById(holding.stockId)"
          v-bind:stock-price="getStockPriceById(holding.stockId)"
          v-bind:stock-name="getStockName(holding.stockId)"
        ></PortfolioStock>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PortfolioStock from '@/components/portfolio/PortfolioStock.vue'
import PageHeading from '@/components/PageHeading.vue'

export default {
  data: function () {
    return {
    }
  },
  computed: {
    holdings: function () {
      return this.$store.getters.getHoldings
    },
    stocks: function () {
      return this.$store.getters.stocks
    },
    cashBalance: function () {
      return this.$store.getters.getCashBalance
    },
    holdingsValue: function () {
      return this.$store.getters.getHoldingsValue
    },
    portfolioValue: function () {
      return this.$store.getters.portfolioValue
    }
  },
  methods: {
    getStockById: function (id) {
      return this.$store.getters.getStockById(id)
    },
    getStockName: function (id) {
      return this.$store.getters.getStockName(id)
    },
    getStockPriceById: function (id) {
      return this.$store.getters.getStockPriceById(id)
    }
  },
  components: {
    PageHeading,
    PortfolioStock
  }
}
</script>

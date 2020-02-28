<template>
  <div class="portfolio">
    <PageHeading>Your Portfolio</PageHeading>
    <div class="bg-white p-6 mb-10 rounded-lg">
      <h2 class="text-celadon-green font-semibold text-sm">Your assets:</h2>
      <div v-if="portfolioBalanceHistory.length <= 1"
        class="flex flex-row flex-no-wrap justify-center py-10">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          width="64"
          height="64"
          viewBox="0 0 172 172"
          style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#2C8A8B"><path d="M86,17.2l6.11406,12.23932l-66.0901,34.26562c-2.81392,1.45953 -3.91187,4.92384 -2.45234,7.73776c1.45953,2.81392 4.92384,3.91187 7.73776,2.45234l65.94453,-34.19844l5.94609,11.90339l17.2,-31.57812zM131.86667,57.33333c-3.1648,0 -5.73333,2.56853 -5.73333,5.73333v86h22.93333v-86c0,-3.1648 -2.56853,-5.73333 -5.73333,-5.73333zM97.46667,74.53333c-3.1648,0 -5.73333,2.56853 -5.73333,5.73333v68.8h22.93333v-68.8c0,-3.1648 -2.56853,-5.73333 -5.73333,-5.73333zM63.06667,91.73333c-3.1648,0 -5.73333,2.56853 -5.73333,5.73333v51.6h22.93333v-51.6c0,-3.1648 -2.56853,-5.73333 -5.73333,-5.73333zM28.66667,108.93333c-3.1648,0 -5.73333,2.56853 -5.73333,5.73333v34.4h22.93333v-34.4c0,-3.1648 -2.56853,-5.73333 -5.73333,-5.73333z"></path></g></g></svg>
      </div>
      <div v-else>
        <trend
          :data="portfolioBalanceHistory"
          :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
          auto-draw
          smooth
        >
        </trend>
      </div>
      <p class="text-4xl mt-4 font-thin">You have {{ portfolioBalanceHistory[portfolioBalanceHistory.length - 1] | formatCurrency }}</p>
      <p class="text-sm">Cash balance: <span class="font-bold">{{ cashBalance | formatCurrency }}</span></p>
      <p class="text-sm">Holdings value: <span class="font-bold">{{ holdingsBalanceHistory[holdingsBalanceHistory.length - 1] | formatCurrency }}</span></p>
    </div>
    <h2 class="sr-only">Stocks</h2>
    <div
      v-if="holdings.length <= 0"
      class="bg-red-200 rounded-lg p-4 mt-10 mb-4 flex flex-wrap justify-between">
      <p class="text-lg font-light">You don't own any stocks</p>
    </div>
    <div v-else>
      <div class="mt-10">
        <PortfolioStock
          v-for="(holding, index) in holdings"
          v-bind:item="holding"
          v-bind:index="index"
          v-bind:key="index"
          v-bind:holding="holding"
          v-bind:stock="getStockById(holding.stockId)"
        ></PortfolioStock>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PortfolioStock from '@/components/PortfolioStock.vue'
import PageHeading from '@/components/PageHeading.vue'

export default {

  data: function () {
    return {
    }
  },

  computed: {

    balances: function () {
      // DEBUG:
      // console.log('Balances:')
      // console.log(this.$store.getters.getBalances)
      return this.$store.getters.getBalances
    },

    // Get the current cash balance
    cashBalance: function () {
      return this.$store.getters.getCashBalance
    },

    // Get the array of cash balances
    cashBalanceHistory: function () {
      return this.$store.getters.getBalances.cash
    },

    // Get the array of holdings balances
    holdingsBalanceHistory: function () {
      return this.$store.getters.getBalances.holdings
    },

    // Build an array of portfolio balances
    portfolioBalanceHistory: function () {
      return this.$store.getters.getPortfolioBalances
    },

    holdings: function () {
      return this.$store.getters.getHoldings
    },

    stocks: function () {
      return this.$store.getters.getStocks
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

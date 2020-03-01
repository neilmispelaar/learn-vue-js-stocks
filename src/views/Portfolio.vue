<template>
  <div class="portfolio">
    <PageHeading>Your Portfolio</PageHeading>
    <h2 class="text-celadon-green text-xl font-extrabold border-b mt-0 mb-10">Dashboard</h2>
    <div class="bg-white p-6 mb-10 rounded-lg">
      <p class="text-celadon-green font-semibold text-sm">Your earnings: {{ earnings | formatCurrency }}</p>
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
      <div class="bg-anti-flash-white rounded-lg p-4">
        <h2 class="sr-only">Account Details</h2>
        <ul>
          <li class="text-xl">You have {{ portfolioBalanceHistory[portfolioBalanceHistory.length - 1] | formatCurrency }}</li>
          <li class="flex flex-row flex-no-wrap align-middle justify-start text-sm">
            <img class="h-5 inline mr-1" src="data:image/png;base64,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" />
            <span class="sr-only">Cash balance: </span>
            <span class="font-bold">{{ cashBalance | formatCurrency }}</span>
        </li>
          <li class="flex flex-row flex-no-wrap align-middle justify-start text-sm">
            <img class="h-5 mr-1 inline" src="data:image/png;base64,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" />
          <span class="sr-only">Holdings value: </span>
          <span class="font-bold">{{ holdingsBalanceHistory[holdingsBalanceHistory.length - 1] | formatCurrency }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div
      v-if="holdings.length <= 0"
      class="bg-red-200 rounded-lg p-4 mt-10 mb-4 flex flex-wrap justify-between">
      <p class="text-lg font-light">You don't own any stocks</p>
    </div>
    <div v-else>
      <h2 class="text-celadon-green text-xl font-extrabold border-b mt-0 mb-10">Stocks</h2>
      <div>
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

    earnings: function () {
      return this.$store.getters.getEarnings
    },

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

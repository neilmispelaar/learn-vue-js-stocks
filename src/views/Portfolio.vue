<template>
  <div class="portfolio">
    <PageHeading>Your Portfolio</PageHeading>
    <div class="bg-blue-100 border border-gray-400 rounded-lg p-4 shadow-xl mb-4">
      <p>Cash balance: <span class="font-bold">{{ balance | formatCurrency }}</span></p>
    </div>

    <p>This is a paragraph</p>
    <p>Cash balance: {{ balance | formatCurrency }}</p>
    <p>Portfolio value: {{ portfolioValue | formatCurrency }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
// import Stock from '@/components/PortfolioStock.vue'
import PageHeading from '@/components/PageHeading.vue'

export default {
  data: function () {
    return {
    }
  },
  computed: {
    stocks: function () {
      return this.$store.getters.stocks
    },
    balance: function () {
      console.log('Balance ' + this.$store.getters.getCashBalance)
      return this.$store.getters.getCashBalance
    },
    portfolioValue: function () {
      console.log('Portfolio Value ' + this.$store.getters.portfolioValue)
      return this.$store.getters.portfolioValue
    }
  },
  components: {
    PageHeading
  }
}
</script>

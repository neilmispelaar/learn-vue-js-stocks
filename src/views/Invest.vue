<template>
  <div class="invest">
    <PageHeading>Invest your money</PageHeading>
    <div class="bg-blue-100 border border-gray-400 rounded-sm p-4 shadow-xl mb-4">
      <p>Cash balance: <span class="font-bold">{{ balance | formatCurrency }}</span></p>
    </div>
    <div v-if="stocks.length <= 0" class="text-center">
      <p class="h3 mt-3">No Stocks</p>
    </div>
    <div v-else>
      <!-- Two columns -->
      <div class="flex flex-wrap justify-between -mx-4">
        <Stock
          v-for="(stock, index) in stocks"
          v-bind:item="stock"
          v-bind:index="index"
          v-bind:key="index"
          v-bind:stock="stock"
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
      return this.$store.getters.stocks
    },
    balance: function () {
      console.log('Balance ' + this.$store.getters.balance)
      return this.$store.getters.balance
    }
  },
  components: {
    Stock,
    PageHeading
  }
}

</script>

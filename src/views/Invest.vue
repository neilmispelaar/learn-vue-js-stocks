<template>
  <div class="invest">
    <div class="bg-blue-100 border border-gray-400 rounded-sm p-4 shadow-xl mb-4">
      <p>Cash balance: <span class="font-bold">{{ portfolio.balance | formatCurrency }}</span></p>
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
          v-bind:name="stock.name"
          v-bind:price="stock.price"
        ></Stock>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Stock from '@/components/InvestStock.vue'

export default {
  data: function () {
    return {
      portfolio: {
        balance: 0
      },
      stocks: [
        {
          name: 'BMW',
          price: 10.34
        },
        {
          name: 'Mercedes',
          price: 20
        },
        {
          name: 'Ford',
          price: 30
        },
        {
          name: 'Tesla',
          price: 30
        }
      ]
    }
  },
  components: {
    Stock
  }
}

</script>

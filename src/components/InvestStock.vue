<template>
  <div class="w-full bg-orange-300 text-orange-900 rounded-xl rounded-lg my-5 p-5">
    <div class="flex flex-row flex-no-wrap">
      <div class="w-1/2">
        <h1 class="text-xl font-extrabold"><span class="sr-only">Stock name: </span>{{ stockName }}</h1>
        <p class="text-6xl"><span class="sr-only">Price: </span>{{ stockPrice | formatCurrency }}</p>
        <p class="text-xs"><span class="sr-only">Price Change: </span>{{ stockPriceChange | formatCurrency }}</p>
        <p class="text-6xl font-thin"><span class="sr-only">Value </span></p>
      </div>
      <div class="w-1/2">
        <trend
          :data="stockPrices"
          :gradient="['#22543d', '#48bb78', '#7b341e']"
          :height="125"
          :stroke-width="2"
          auto-draw
          smooth
        >
        </trend>
      </div>
    </div>
    <div class="flex flex-wrap w-full mt-3 bg-orange-200 rounded p-4">
      <div class="w-full">
        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
          Buy shares
        </label>
      </div>
      <div class="flex-grow mr-3">
        <input v-model="quantity" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="0" min="0" >
      </div>
      <div class="self-center">
        <button
          class="bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-8 rounded"
          :disabled="disabled"
          v-on:click="buyShares">
          Buy
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Invest-Stock',
  data: function () {
    return {
      quantity: 0
    }
  },
  computed: {

    disabled: function () {
      var disabled = true
      if (isNaN(this.quantity)) {
        // Not a number
        disabled = true
      } else {
        // Is a number
        if (this.quantity <= 0) {
          disabled = true
        } else {
          disabled = false
        }
      }
      return disabled
    },

    stockPrice: function () {
      return this.stockPrices[this.stockPrices.length - 1]
    },

    stockPriceChange: function () {
      var change = 0
      if (this.stockPrices.length > 1) {
        change = this.stockPrices[this.stockPrices.length - 1] - this.stockPrices[this.stockPrices.length - 2]
      }
      return change
    }

  },
  methods: {

    buyShares: function () {
      this.$store.dispatch('buyStocks', {
        stockId: this.stockId,
        quantity: Number(this.quantity)
      })
      // Return quantity back to zero
      this.quantity = 0
    }

  },
  props: {
    // Number with a default value
    stockId: {
      type: Number,
      required: true
    },
    stockName: {
      type: String,
      required: true
    },
    stockPrices: {
      type: Array,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button:disabled {
  background-color: #9ae6b4;
}
</style>

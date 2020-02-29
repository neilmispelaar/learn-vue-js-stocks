<template>
  <div class="w-full bg-blue-200 rounded-lg my-10 p-5">
    <h1 class="text-xl font-extrabold"><span class="sr-only">Stock name: </span>{{ name }}</h1>
    <p class="text-6xl font-thin"><span class="sr-only">Value </span>{{ value | formatCurrency }}</p>
    <p class="text-xs">{{ price | formatCurrency }} Share | QTY: {{ holding.quantity }}</p>
    <div class="flex flex-wrap w-full mt-3 bg-blue-100 rounded-lg p-4">
      <div class="w-full">
        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
          Sell shares
        </label>
      </div>
      <div class="flex-grow mr-3">
        <input v-model="quantity" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="0" min="0" :max="holding.quantity">
      </div>
      <div class="self-center">
        <button
        class="bg-red-600 hover:bg-red-800 text-white font-bold py-3 px-8 rounded"
        :disabled="disabled"
        v-on:click="sellStocks">
        Sell</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
        if (this.quantity <= 0 || this.quantity > this.holding.quantity) {
          disabled = true
        } else {
          disabled = false
        }
      }
      return disabled
    },

    value: function () {
      return this.stock.prices[this.stock.prices.length - 1] * this.holding.quantity
    },

    price: function () {
      return this.stock.prices[this.stock.prices.length - 1]
    },

    name: function () {
      return this.stock.name
    }

  },
  methods: {
    sellStocks: function () {
      console.log('Trying to sell stocks...')
      console.log('Quantityss: ' + Number(this.quantity))
      this.$store.dispatch('sellStocks', {
        stockId: this.stock.id,
        quantity: Number(this.quantity)
      })
      // Return quantity back to zero
      this.quantity = 0
    }
  },
  props: {
    holding: Object,
    stock: {
      type: Object,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button:disabled {
  background-color: #feb2b2;
}
</style>

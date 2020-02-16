<template>
  <div class="w-1/2 px-4 py-4">
    <div class="bg-blue-100  border border-gray-400 rounded-sm p-4 shadow-xl">
      <h1 class="text-xl font-extrabold"><span class="sr-only">Stock name: </span>{{ stock.name }}</h1>
      <p class="text-6xl"><span class="sr-only">Price: </span>{{ stock.price | formatCurrency }}</p>
      <div class="flex flex-wrap w-full">
        <div class="w-full">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
            Buy shares
          </label>
        </div>
        <div class="flex-grow mr-3">
          <input v-model="quantity" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="0" min="0" max="100">
        </div>
        <div class="self-center">
          <button
          class="bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-8 rounded"
          :disabled="disabled"
          v-on:click="buyShares">
          Buy</button>
        </div>
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
    }
  },
  methods: {
    buyShares: function () {
      console.log('Trying to buy stocks...')
      this.$store.dispatch('buyStocks', {
        stockId: this.stock.id,
        quantity: Number(this.quantity)
      })
      // Return quantity back to zero
      this.quantity = 0
    }
  },
  props: {
    // Number with a default value
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
  background-color: #9ae6b4;
}
</style>

<template>
  <div class="w-full bg-gray-300 text-gray-700 rounded-xl rounded-lg p-3 md:p-5 mb-2">
    <div class="flex flex-col flex-no-wrap">
      <h1 class="text-3xl font-extrabold"><span class="sr-only">Stock name: </span>{{ stockName }}</h1>
      <div class="flex flex-row flex-no-wrap mb-3">
        <div class="w-16 self-center align-middle">
          <div v-if="stockPriceChange > 0">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAACjElEQVR4nO3cuVIUURhA4aMmlrGmQCmLikb6DC6B4vYgPAOWz6OhmmmiD2CsKFIQWhKoJBjMHWWd+bvp7vkbzld1o+m5y5yCWapmQJIkSZIkSZKkLBbKUAKzwHdgE7g64b2celPAF2CnjDXg8kR3dIrNAKv8jzEcq+U2dWgK+MzBGMPxFf9SOjMuxu4oVya0x1NjmliM4fiGUVpTNYZRWlQ3hlFaMM3el7ZGmaCmYuyOMtvpCU6QGZqNsfvNo1EqmqGdGEapYY7BA9ZWjOHYAK51dKbemmPwQWHbMYwSUCXGr4au2SlrznVwvl6pEuMP8CBw3R3iUTaA662fsifqxCBwLcBd4lE2MQrz1ItB4PohowTNA+vEYzzcd/9oEIB7GGWk48YgcL/9jHKEqjGWjpinahCA+8Dv4NqbwGLtU/bEAs3EIHD/oxiluET8Hfi4GATmGGWprBHZyxpwMXzKHlkh9gBsA48C8x0nCGWN7eCeXgTm6503xGI8Ds533CCUtSJR3gXn65VXjI/xpMJ8TQShrDkuytsK8/XGMqNjPK04X1NBKGuPirJccb5eOA985PAn8Gc15msyCGUPhz3Rfyh7P5EuAM+BTwxe/r4EbtWcq+kgALcZ/GtdL3tcKXvuzJkuF2vYuAe9l2c7O+kNaC+DJGOQZAySjEGSMUgyBknGIMkYJBmDJGOQZAySjEGSMUgyBknGIMkYJBmDJGOQZAySjEGSMUgyBknGIMkYJBmDJGOQZAySjEGSMUgyBknGIMkYJBmDJGOQZPoc5OeI2350touG9TnIqF9XeN/ZLvTPIrDFwa9Db3GCf8Enu5sMfkNlm8GX/l8DNya6IwFwrgxJkiRJkiRJkqT9/gJhRIAIFqh+9AAAAABJRU5ErkJggg==">
          </div>
          <div v-else-if="stockPriceChange < 0">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAC/klEQVR4nO3cWU9TQRiH8QeNJsZ7xQ33JQpRrHGLBEIIaoz7nZ8Sjd64XJr4ATS470ZFRcWqiGi9OAfF0mWmnXbec/r/JXPVdvrOeUKAJqcgIiIiIiIiIiIiIiKBLY49QCDLgC7gd+xBOl0fcB2YAWaBG0B/1Ik62C6gCJTKVpEklLTZJRbGmFuXI87VsSaoHuRLxLma0hV7gCaU6jyeybMtij2A/E9BjFEQYxTEGAUxRkGMURBjFMQYBTFGQYxREGMUxBgFMUZBjFEQYxTEGAUxRkGMURBjFMQYBTFGQYxREGMUxBgFMUZBjFEQYxTEGAUxRkGMURBjFMQYBTFGQYyJFWRJuiSyI8BN4CfJfeVXgd4G96p2w+fcakQvcAWYBj4AYyS3X+fSAMlByy/cVPqYr9BBBtJZyvf5TE6j3KL2bcyDnvuFDDKYzlBtrzHP/cxbDvyi9gUsAkMee4YKMkTlb4SYvyY89suEpdQPUgK+AsOOe4YIMpy+Z729imT0vvdarlH/4HNRRhz2azbICG4xSsBFh/0yZyeVf2lWWt+A0Tr7NRNkNH0Pl1mm0tlz6TDJXy0uF2IaOFljr0aDHMU9hu/vtUwqAJO4XZAfwKkq+zQS5Bjw3fG9PwGHGj5lxhRI/vFyjXK6wh6+QY7jF+Ng06fMmL3Ae9yjnCl7vU8QnxgfgQPBTpkx/fhFOTvvta5BTlD5E4JqMfYHP2XG7AHe4XbBZoBz6etcgvjEmAT2teyUGbOb2t8QN3/NAhccnneeJKBrjELLT5kxfcBb3H9SQjynlL6nvjSzih3AK9wuZIilGA62054ob8jpx+qtsA14SWtj5PbjkFbZCrwgfIzXKEbDNgCPCRfjObClnQfIo/WEifIM2Nzm2XOrB3hEczE2tX3qnOsBHuIf4ymwsf3jdoZ1wAPcYzxBMVquG7hD/Rj3gbWRZuw4K6kd5R6wJtp0HWoVMM7CGOPpYxLBCuA2/2LcBVZHnUj+RlEMQ7rTJSIiIiIiIiIiIiJiwB85yZDdrRBOrQAAAABJRU5ErkJggg==">
          </div>
          <div v-else>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAAVUlEQVR4nO3RsREAIAwDsYT9d4YVKFwkd9IAX9hVAAAAAAAAAAAAAAAAAAAAAAAAMFcHWzfY2iiy5UlEyHHIMA4BAAAAAAAAAAAAAAAAAAAAAAAAvj3v4QEIjlHiSgAAAABJRU5ErkJggg==">
          </div>
        </div>
        <div class="ml-1 flex-grow">
          <p class="text-4xl"><span class="sr-only">Price: </span>{{ stockPrice | formatCurrency }}</p>
          <p class="text-xs"><span class="sr-only">Price Change: </span>{{ stockPriceChange | formatCurrency }}</p>
        </div>
      </div>
      <div class="w-full bg-mint-cream p-3 rounded-lg mb-4">
        <trend
          :data="stockPrices"
          :gradient="['#22543d', '#48bb78', '#7b341e']"
          :stroke-width="1"
          auto-draw
          smooth
        >
        </trend>
      </div>
    </div>
    <div class="flex flex-col bg-gray-200 rounded-lg p-3 md:p-4">
      <div class="w-full">
        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
          Buy shares
        </label>
      </div>
      <div class="flex flex-row flex-no-wrap">
        <input v-model="quantity" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="0" min="0" >
        <button
          class="bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-8 rounded ml-2 md:ml-4"
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

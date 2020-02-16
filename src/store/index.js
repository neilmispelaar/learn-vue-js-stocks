import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    portfolio: {
      balance: 10000,
      holdings: [
        {
          stockId: 0,
          quantity: 5
        },
        {
          stockId: 2,
          quantity: 10
        }
      ],
      transactions: [
        {
          stockId: 0,
          quantity: 1,
          price: 10
        }
      ]
    },
    stocks: [
      {
        id: 0,
        name: 'BMW',
        price: 20
      },
      {
        id: 1,
        name: 'Mercedes',
        price: 50
      },
      {
        id: 2,
        name: 'Ford',
        price: 30
      },
      {
        id: 3,
        name: 'Tesla',
        price: 30
      }
    ]
  },
  mutations: {
    // Increment Portfolio Holdings
    // Payload provides the stock id and the
    // quantity to increment
    incrementHoldings: function (state, payload) {
      // Check if the stock id exists in the holdings already
      var index = state.portfolio.holdings.findIndex(holding => holding.stockId === payload.stockId)
      // If the stock is owned just increment the quantity else add new holding entry
      if (index === -1) {
        state.portfolio.holdings.push(
          {
            stockId: payload.stockId,
            quantity: payload.quantity
          }
        )
      } else {
        state.portfolio.holdings.find(holding => holding.stockId === payload.stockId).quantity += payload.quantity
      }
    },
    // Decrement Portfolio Holdings
    // Payload provides the stock id and the
    // quantity to decrement
    decrementHoldings: function (state, payload) {
      // Check if the stock id exists in the holdings already
      var index = state.portfolio.holdings.findIndex(holding => holding.stockId === payload.stockId)
      // If the stock is owned just increment the quantity else add new holding entry
      if (index === -1) {
        state.portfolio.holdings.push(
          {
            stockId: payload.stockId,
            quantity: payload.quantity
          }
        )
      } else {
        state.portfolio.holdings.find(holding => holding.stockId === payload.stockId).quantity -= payload.quantity
      }
    }
  },
  actions: {
    buyStocks ({ commit }, payload) {
      console.log('Payload:')
      console.log(payload)
      commit('incrementHoldings', {
        stockId: payload.stockId,
        quantity: payload.quantity
      })
    },
    sellStocks ({ commit }, payload) {
      console.log('Payload:')
      console.log(payload)
      commit('decrementHoldings', {
        stockId: payload.stockId,
        quantity: payload.quantity
      })
    }
  },
  getters: {
    stocks: function (state) {
      return state.stocks
    },
    balance: function (state) {
      return state.portfolio.balance
    },
    holdingValue: function (state) {
      // Provide the stock ID and then get back
      // amount of value that the user has in that
      // stock

      return 10
    },
    portfolioValue: function (state, getters) {
      var total = 0
      // Get the value of the cash account
      total += state.portfolio.balance
      // Add the value of the stocks at the current prices
      state.portfolio.holdings.forEach(function (holding) {
        var value = 0
        value = holding.quantity * getters.getStockPriceById(holding.stockId)
        total += value
      })
      return total
    },
    // Get the balance of the cash account
    getCashBalance: function (state) {
      return state.portfolio.balance
    },
    // Get the stock that has this id
    getStockById: (state) => (id) => {
      return state.stocks.find(stock => stock.id === id)
    },
    // Get the stock price that has this id
    getStockPriceById: (state) => (id) => {
      return state.stocks.find(stock => stock.id === id).price
    },
    getHoldings: function (state) {
      return state.portfolio.holdings
    }
  },
  modules: {
  }
})

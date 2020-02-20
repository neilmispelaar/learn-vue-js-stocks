import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    time: {
      currentDay: 0
    },
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
    // Increment Date
    incrementDay: function (state) {
      state.time.currentDay++
    },
    // Modify stock price
    // Provide
    // stock id,
    // percentage change
    // loss or gain
    modifyStockPriceByPercentage: function (state, payload) {
      // Check if the stock id exists in the holdings already
      var index = state.stocks.findIndex(stock => stock.id === payload.stockId)

      if (index !== -1) {
        switch (payload.direction) {
          case true:
            // code block
            state.stocks[index].price = state.stocks[index].price + (state.stocks[index].price * (payload.percentageChange / 100))
            break
          case false:
            // code block
            state.stocks[index].price = state.stocks[index].price - (state.stocks[index].price * (payload.percentageChange / 100))
            break
          default:
            // code block
        }
      }
    },
    // Increment Portfolio Holdings
    // Payload provides the stock id and the
    // quantity to increment
    incrementBalance: function (state, payload) {
      state.portfolio.balance += payload.value
    },
    // Increment Portfolio Holdings
    // Payload provides the stock id and the
    // quantity to increment
    decrementBalance: function (state, payload) {
      state.portfolio.balance -= payload.cost
    },
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
        // Decrement the holding
        // If the holding is now at 0 then remove the entry
        if ((state.portfolio.holdings.find(holding => holding.stockId === payload.stockId).quantity -= payload.quantity) === 0) {
          state.portfolio.holdings.splice(index, 1)
        }
      }
    }
  },
  actions: {
    buyStocks ({ commit, state }, payload) {
      // Does the user have enough money to buy the stock
      var cost
      cost = payload.quantity * state.stocks.find(stock => stock.id === payload.stockId).price
      // Check if there is enough money to purchase the stock
      if (cost <= state.portfolio.balance) {
        // Add the stocks to the state
        commit('incrementHoldings', {
          stockId: payload.stockId,
          quantity: payload.quantity
        })
        // Decrement the cash balance
        commit('decrementBalance', {
          cost: cost
        })
      }
    },
    sellStocks ({ commit, state }, payload) {
      // How much value do the stocks have
      var value
      value = payload.quantity * state.stocks.find(stock => stock.id === payload.stockId).price
      commit('decrementHoldings', {
        stockId: payload.stockId,
        quantity: payload.quantity
      })
      // Increment the cash balance
      commit('incrementBalance', {
        value: value
      })
    },
    incrementDay ({ commit, state }, payload) {
      // Advance the day counter
      commit('incrementDay')
      // Update stock prices
      state.stocks.forEach(function (stock) {
        // Get a random number between 0 and 100
        // If the number is 95 and above then its a really
        // good or bad day
        // Else if the number is under 95 then its a normal day
        // Get a random number that is from 0 to 15 percent
        // Get a random number that is either 0 or 1
        // to determine if it is a loss or a gain
        // Stock prices can't go to zero
        // Calculate the loss or gain of the stock

        // Extreme or normal
        var extreme = false
        var percentageChange = 0
        var direction = true

        if (Math.floor(Math.random() * Math.floor(100)) > 95) {
          extreme = true
        }

        // Calculate positive or negative change
        if (Math.floor(Math.random() * Math.floor(2)) === 1) {
          direction = false
        }

        // Calculate percentage change
        if (extreme) {
          percentageChange = Math.floor(Math.random() * Math.floor(50))
        } else {
          percentageChange = Math.floor(Math.random() * Math.floor(15))
        }

        // Commit the change to the stock price
        commit('modifyStockPriceByPercentage', {
          stockId: stock.id,
          direction: direction,
          percentageChange: percentageChange

        })
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
    },
    getHoldingsValue: function (state, getters) {
      var total = 0
      state.portfolio.holdings.forEach(function (holding) {
        var value = 0
        value = holding.quantity * getters.getStockPriceById(holding.stockId)
        total += value
      })
      return total
    },
    // Return the current Day counter
    getCurrentDay: function (state) {
      return state.time.currentDay
    }
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    time: {
      currentDay: 0
    },

    portfolio: {
      balances: {
        cash: [
          10000
        ],
        holdings: [
          0
        ]
      },
      holdings: [
        /*
        {
          stockId: 0,
          quantity: 5
        },
        {
          stockId: 2,
          quantity: 10
        }
        */
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
        prices: [
          20
        ]
      },
      {
        id: 1,
        name: 'Mercedes',
        prices: [
          30
        ]
      },
      {
        id: 2,
        name: 'Ford',
        prices: [
          40
        ]
      },
      {
        id: 3,
        name: 'Tesla',
        prices: [
          40
        ]
      }
    ]
  },

  mutations: {

    // Increment Date
    incrementDay: function (state) {
      state.time.currentDay++
    },
    // Increment Date
    commitCashBalance: function (state) {
      state.portfolio.balances.cash.push(
        state.portfolio.balances.cash[state.portfolio.balances.cash.length - 1]
      )
    },
    // Increment Date
    commitHoldingsBalance: function (state) {
      // Calculate the value of the current days stocks and then push them onto the array
      var total = 0
      // Add the value of the stocks at the current prices
      state.portfolio.holdings.forEach(function (holding) {
        var value = 0
        value = holding.quantity * state.stocks.find(stock => stock.id === holding.stockId).prices[state.time.currentDay]
        total += value
      })

      state.portfolio.balances.holdings.push(
        total
      )
    },
    // Modify stock price
    // Provide
    // stock id,
    // percentage change
    // loss or gain
    addNewStockPrice: function (state, payload) {
      // Check if the stock id exists in the holdings already
      var index = state.stocks.findIndex(stock => stock.id === payload.stockId)
      var newPrice
      if (index !== -1) {
        var yesterday = state.stocks[index].prices.length - 1
        switch (payload.direction) {
          case true:
            // code block
            newPrice = state.stocks[index].prices[yesterday] + (state.stocks[index].prices[yesterday] * (payload.percentageChange / 100))
            break
          case false:
            // code block
            newPrice = state.stocks[index].prices[yesterday] - (state.stocks[index].prices[yesterday] * (payload.percentageChange / 100))
            break
          default:
            // code block
        }
        // Add the new price to the array of prices
        state.stocks[index].prices.push(newPrice)
      }
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
      state.portfolio.balances.cash[state.portfolio.balances.cash.length - 1] += payload.value
    },
    // Increment Portfolio Holdings
    // Payload provides the stock id and the
    // quantity to increment
    decrementBalance: function (state, payload) {
      state.portfolio.balances.cash[state.portfolio.balances.cash.length - 1] -= payload.value
      console.log('Decrementing Balance ' + state.portfolio.balances.cash[state.portfolio.balances.cash.length - 1])
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
      // Check if the stock id exists
      var stockIndex = state.stocks.findIndex(stock => stock.id === payload.stockId)
      if (stockIndex !== -1) {
        console.log('I got here')
        // Find the current price of the stock
        var price = state.stocks[stockIndex].prices[state.stocks[stockIndex].prices.length - 1]
        console.log('Price: ' + price)
        // Calculat the cost to buy all of the stock
        var cost = payload.quantity * price
        console.log('Cost: ' + cost)
        if (cost <= state.portfolio.balances.cash[state.portfolio.balances.cash.length - 1]) {
          console.log('I am here')
          // Add the stocks to the state
          commit('incrementHoldings', {
            stockId: payload.stockId,
            quantity: payload.quantity
          })
          // Decrement the cash balance
          commit('decrementBalance', {
            value: cost
          })
        }
      }
      // Check if there is enough money to purchase the stock
      console.log(state.portfolio.balances.cash[state.portfolio.balances.cash.length - 1])
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
      // Add a new entry to the cash balance and the holding balance
      commit('commitCashBalance')

      commit('commitHoldingsBalance')

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
        commit('addNewStockPrice', {
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
    portfolioValues: function (state, getters) {
      var porfolioValues = []
      // Walk through the balances and add the cash and the holdings together
      for (var index = 0; index <= state.time.currentDay; index++) {
        console.log('Portfolio Holding: ' + index + ' ' + state.portfolio.balances.holdings[index])
        porfolioValues.push(
          state.portfolio.balances.cash[index] + state.portfolio.balances.holdings[index]
        )
      }
      return porfolioValues
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
      console.log('State cash balance: ' + state.portfolio.balances.cash[state.portfolio.balances.cash.length - 1])
      return state.portfolio.balances.cash[state.portfolio.balances.cash.length - 1]
    },
    // Get the balance of the cash account
    getCashBalances: function (state) {
      return state.portfolio.balances.cash
    },
    // Get the stock that has this id
    getStockById: (state) => (id) => {
      return state.stocks.find(stock => stock.id === id)
    },
    // Get the stock that has this id
    getStockName: (state) => (id) => {
      return state.stocks.find(stock => stock.id === id).name
    },
    // Get the stock price that has this id
    getStockPriceById: (state) => (id) => {
      return state.stocks.find(stock => stock.id === id).prices[state.time.currentDay]
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
    getHoldingsBalances: function (state) {
      return state.portfolio.balances.holdings
    },
    // Return the current Day counter
    getCurrentDay: function (state) {
      return state.time.currentDay
    }
  },
  modules: {
  }
})

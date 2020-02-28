import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    day: 0,

    portfolio: {

      balances: {
        cash: [
          0
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
    ],

    initial: {
      cashBalance: 10000
    }

  },

  mutations: {

    // Increment Date
    incrementDay: function (state) {
      state.day++
    },

    // Add money to the cash balance
    addToCashBalance: function (state, payload) {
      state.portfolio.balances.cash[state.portfolio.balances.cash.length - 1] += payload.value
    },

    // Remove money from the cash balance
    removeFromCashBalance: function (state, payload) {
      // Calculate the new balance
      var newCashBalance = state.portfolio.balances.cash[state.portfolio.balances.cash.length - 1] - payload.value
      Vue.set(
        state.portfolio.balances.cash,
        state.portfolio.balances.cash.length - 1,
        newCashBalance)
    },

    // Add stocks to the holdings object
    addToHoldings: function (state, payload) {
      // Check if the stock id exists in the holdings already
      var index = state.portfolio.holdings.findIndex(holding => holding.stockId === payload.stockId)
      if (index === -1) {
        // If the stock is not owned push a new object
        state.portfolio.holdings.push(
          {
            stockId: payload.stockId,
            quantity: payload.quantity
          }
        )
      } else {
        // If the stock is owned already just increment the quantity else add new holding entry
        // Use vue set
        var newStockAmount = state.portfolio.holdings[index].quantity + payload.quantity
        Vue.set(
          state.portfolio.holdings[index],
          'quantity',
          newStockAmount)
      }
    },

    // Add money to the cash balance
    removeFromHoldings: function (state, payload) {

    },

    // When you buy or sell stocks
    // you need to update the current days
    // holdings values iin the balance object
    updateHoldingsValue: function (state) {
      // Calculate the value of the current days stocks and then push them onto the array
      var total = 0
      // Add the value of the stocks at the current prices on the holdings balance array
      state.portfolio.holdings.forEach(function (holding) {
        var value = 0
        value = holding.quantity * state.stocks.find(stock => stock.id === holding.stockId).prices[state.day]
        total += value
      })
      // Setting arrays isn't reactive so we use the set function to update the state
      Vue.set(
        state.portfolio.balances.holdings,
        state.portfolio.balances.holdings.length - 1,
        total)
    },

    // Commit the portfolio balances
    // Add new entries in the arry with the
    // previous days values
    commitPortfolioBalances: function (state) {
      // Add a new entry for the holdings array
      state.portfolio.balances.holdings.push(
        state.portfolio.balances.holdings[state.portfolio.balances.holdings.length - 1]
      )
      // Add a new entry for the cash array
      state.portfolio.balances.cash.push(
        state.portfolio.balances.cash[state.portfolio.balances.cash.length - 1]
      )
    },

    // Modify stock price
    // Provide
    // stock id,
    // percentage change
    // loss or gain
    modifyStockPrice: function (state, payload) {
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
    }

  },

  actions: {

    // Initialise the state machine
    init ({ state }) {
      // set the opening cash balance to the first index
      state.portfolio.balances.cash[0] = state.initial.cashBalance
    },

    // Initiate the purchase of stocks
    // Check if the user has enough money
    // Add stocks to their portfolio
    // Remove cash from their cash balance
    buyStocks ({ commit, state }, payload) {
      // Check if the stock id exists
      var stockIndex = state.stocks.findIndex(stock => stock.id === payload.stockId)
      if (stockIndex !== -1) {
        // Find the current price of the stock
        var price = state.stocks[stockIndex].prices[state.stocks[stockIndex].prices.length - 1]
        // Calculat the cost to buy all of the stock
        var cost = payload.quantity * price
        // Only buy if there is enough money on hand
        if (cost <= state.portfolio.balances.cash[state.portfolio.balances.cash.length - 1]) {
          // Add the stocks to the state
          commit('addToHoldings', {
            stockId: payload.stockId,
            quantity: payload.quantity
          })
          // Decrement the cash balance
          commit('removeFromCashBalance', {
            value: cost
          })
          // Update the holdings value balance
          commit('updateHoldingsValue')
        }
      }
    },

    // Initial the sale of stocks
    // Remove the stocks from their portfolio
    // Add the cash to their cash balance
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

    // Go to the next day
    // Save the cash and holding balances
    // Update all of the stock prices
    nextDay ({ commit, state }) {
      // Add a new entry to the cash balance and the holding balance
      commit('commitPortfolioBalances')

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
        commit('modifyStockPrice', {
          stockId: stock.id,
          direction: direction,
          percentageChange: percentageChange

        })

        // Update the holdings value balance
        commit('updateHoldingsValue')
      })
    }

  },

  getters: {

    // Get current cash balances
    getDay: function (state) {
      return state.day
    },

    // Get current cash balances
    getCashBalance: function (state) {
      return state.portfolio.balances.cash[state.portfolio.balances.cash.length - 1]
    },

    // Get Balances
    getBalances: function (state) {
      return state.portfolio.balances
    },

    // Get Balances
    getPortfolioBalances: function (state) {
      var portfolioBalances = []
      // Walk through the balances and add the cash and the holdings together
      for (var index = 0; index < state.portfolio.balances.cash.length; index++) {
        console.log('Portfolio Holding: ' + index + ' ' + state.portfolio.balances.holdings[index])
        portfolioBalances.push(
          state.portfolio.balances.cash[index] + state.portfolio.balances.holdings[index]
        )
      }
      return portfolioBalances
    },

    // Get Holdings
    getHoldings: function (state) {
      return state.portfolio.holdings
    },

    // Get Stocks
    getStocks: function (state) {
      return state.stocks
    },

    // Get the stock that has this id
    getStockById: (state) => (id) => {
      return state.stocks.find(stock => stock.id === id)
    }

  },

  modules: {
  }
})

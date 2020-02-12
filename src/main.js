import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* Import project styles */
import './assets/styles/main.css'

Vue.config.productionTip = false

Vue.filter('formatCurrency', function (value) {
  if (typeof value !== 'number') {
    return value
  }
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })
  return formatter.format(value)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

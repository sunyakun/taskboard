import Vue from 'vue'
import App from './App'
import VueElectron from 'vue-electron'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(VueElectron)

/* eslint-disable no-new */
let app = new Vue({ // eslint-disable-line
  el: '#app',
  components: {
    'App': App
  },
  template: '<App/>'
})

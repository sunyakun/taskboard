import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'

const { remote } = require('electron')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    cards: remote.getGlobal('sharedObj').data
  },
  mutations: {

  }
})

/* eslint-disable no-new */
let app = new Vue({ // eslint-disable-line
  el: '#app',
  store,
  components: {
    'App': App
  },
  template: '<App/>'
})

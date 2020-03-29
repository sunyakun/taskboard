import Vuex from 'vuex'
import Vue from 'vue'

import board from './board'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    board
  },
  strict: debug
})

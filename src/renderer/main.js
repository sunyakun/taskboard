import Vue from 'vue'

import App from './App'

const { remote } = require('electron')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
let app = new Vue({ // eslint-disable-line
  el: '#app',
  components: {
    'App': App
  },
  template: '<App v-bind:cards="cards" ref="taskboard" v-on:boardchange="onBoardchange"/>',
  data: {
    cards: remote.getGlobal('sharedObj').data
  },
  methods: {
    onBoardchange: function (cardId, items) {
      let card = this.cards.find(it => it.id === cardId)
      card.items = items
    }
  }
})

import Vue from 'vue'
import App from './App'
import electronApp from './electron/electronApp'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

electronApp.setup()

/* eslint-disable no-new */
let app = new Vue({ // eslint-disable-line
  el: '#app',
  components: {
    'App': App
  },
  template: '<App/>'
})

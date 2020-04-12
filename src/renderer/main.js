import Vue from 'vue'
import App from './App'
import VueElectron from 'vue-electron'

import store from './store/index'

import MainPage from './apps/MainPage'
import ConfigPage from './apps/configApp/App'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(VueElectron)

const Routes = {
  '/': MainPage,
  '/config': ConfigPage
}

store.dispatch('loadCards').then(() => {
  /* eslint-disable no-new */
  new Vue({ // eslint-disable-line
    store,
    data: {
      currentLocation: '/'
    },
    render: function (h) {
      return h(Routes[this.currentLocation] || App)
    }
  }).$mount('#app')
})

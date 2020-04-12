import api from './api'

const { ipcMain } = require('electron')

class IpcGateway {
  addRoute (route, apiAction) {
    ipcMain.on(route, (event, ...args) => {
      console.log(`Get request ${route} ${JSON.stringify(args)}`)
      apiAction(...args).then(data => {
        console.log(`Response success ${JSON.stringify(data)}`)
        event.reply(`${route}_success`, data)
      }).catch(err => {
        console.log(`Response error ${err}`)
        event.reply(`${route}_error`, err)
      })
    })
  }

  setup () {
    this.addRoute('load-config', api.loadConfig)
    this.addRoute('save-config', api.saveConfig)
  }
}

export default {
  Gateway: IpcGateway
}

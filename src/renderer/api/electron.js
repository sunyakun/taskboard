const { ipcRenderer } = require('electron')

export default {
  saveData () {
    let promise = new Promise((resolve, reject) => {
      ipcRenderer.once('saveData-reply', (event) => {
        resolve()
      })
      try {
        ipcRenderer.send('saveData')
      } catch (err) {
        reject(err)
      }
    })
    return promise
  }
}

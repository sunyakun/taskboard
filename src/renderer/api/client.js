const { ipcRenderer } = require('electron')

class IpcClient {
  request (uri, ...data) {
    // 清理上次请求中残余的监听
    ipcRenderer.removeAllListeners(uri)

    ipcRenderer.send(uri, ...data)
    let promise = new Promise((resolve, reject) => {
      ipcRenderer.once(`${uri}_success`, (event, ...args) => {
        // console.info(`Get response, uri:${uri} data:${JSON.stringify(args)}`)
        resolve(...args)
      })
      ipcRenderer.once(`${uri}_error`, (event, error) => {
        console.trace(error)
        reject(error)
      })
    })
    return promise
  }
}

export default {
  Client: IpcClient
}

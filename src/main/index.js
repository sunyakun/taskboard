import gateway from './gateway'

const { app, BrowserWindow } = require('electron')

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

void (async function main () {
  // 初始化后端API
  let gw = new gateway.Gateway()
  gw.setup()

  app.whenReady().then(() => {
    let win = new BrowserWindow({
      width: 1300,
      height: 800,
      webPreferences: {
        nodeIntegration: true
      },
      title: 'Gitlab Task Board',
      autoHideMenuBar: true
    })

    win.loadURL(winURL)
    // win.webContents.openDevTools();
    win.show()
  })
}())

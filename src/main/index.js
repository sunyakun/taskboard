if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

const {app, BrowserWindow, ipcMain} = require('electron')
const {promisify} = require('util')
const fs = require('fs')
const path = require('path')

const DATA_FILE = path.join(__dirname, 'data.json')

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

let G_DATA

async function saveJsonStringToFile (path, jsonData) {
  await promisify(fs.writeFile)(path, jsonData)
}

async function loadJsonFromFile (path) {
  if (!checkFile(path)) {
    let error = `Can't not load data from ${path}`
    throw error
  }
  let data = await promisify(fs.readFile)(path)
  return JSON.parse(data)
}

async function checkFile (path) {
  try {
    await promisify(fs.access)(path)
    let stats = await promisify(fs.stat)(path)
    if (stats.isFile()) return true
  } catch (err) {
    return false
  }
  return false
}

ipcMain.on('saveData', async (event) => {
  let data = global.sharedObj.data
  await saveJsonStringToFile(DATA_FILE, JSON.stringify(data))
  event.reply('saveData-reply', 'success')
})

void (async function main () {
  await app.whenReady()
  try {
    G_DATA = await loadJsonFromFile(DATA_FILE)
  } catch (err) {
    G_DATA = []
  }
  global.sharedObj = {data: G_DATA}

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
  win.on('close', async () => {
    let data = global.sharedObj.data
    await saveJsonStringToFile(DATA_FILE, JSON.stringify(data))
  })
  // win.webContents.openDevTools();
  win.show()
}())

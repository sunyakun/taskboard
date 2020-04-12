const {promisify} = require('util')
const fs = require('fs')
const path = require('path')

const DATA_FILE = path.join(__dirname, 'data.json')

function saveJsonToFile (jsonData) {
  return promisify(fs.writeFile)(DATA_FILE, JSON.stringify(jsonData))
}

function loadJsonFromFile () {
  return promisify(fs.readFile)(DATA_FILE).then(data => {
    return JSON.parse(data)
  }).catch(err => {
    console.log(err)
  })
}

export default {
  saveConfig: saveJsonToFile,
  loadConfig: loadJsonFromFile
}

const {promisify} = require('util')
const fs = require('fs')
const path = require('path')

const DATA_FILE = path.join(__dirname, 'data.json')
const STATIC = path.join(__dirname, '/static')

function readFile (filePath) {
  return promisify(fs.readFile)(filePath, {encoding: 'utf8'})
}

function writeFile (filePath, str) {
  return promisify(fs.writeFile)(filePath, str)
}

function saveJsonToFile (jsonData) {
  return writeFile(DATA_FILE, JSON.stringify(jsonData))
}

function loadJsonFromFile () {
  return readFile(DATA_FILE).then(data => {
    return JSON.parse(data)
  })
}

function loadStaticFile (url) {
  return readFile(path.join(STATIC, url)).then(data => {
    return data
  })
}

export default {
  saveConfig: saveJsonToFile,
  loadConfig: loadJsonFromFile,
  loadStaticFile: loadStaticFile
}

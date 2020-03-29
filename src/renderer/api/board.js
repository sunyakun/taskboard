const { remote } = require('electron')

export default {
  getCards () {
    let data = remote.getGlobal('sharedObj').data
    let cards = new Array(0)
    for (let cardData of data) {
      let { id, themeColor, title, items } = cardData
      cards.push({ id, themeColor, title, items })
    }
    return cards
  },
  saveCards (cards) {
    remote.getGlobal('sharedObj').data = cards
  }
}

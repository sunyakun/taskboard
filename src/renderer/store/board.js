import board from '../api/board'

const state = {
  cards: [],
  static: {}
}

const mutations = {
  addItem (state, payload) {
    let itemId = -1
    let updateCard
    if (!payload.id) {
      for (let card of state.cards) {
        if (card.id === payload.cardId) updateCard = card
        for (let item of card.items) {
          if (itemId < item.id) itemId = item.id
        }
      }
      if (itemId === -1) itemId = 1
      else itemId++
    } else {
      itemId = payload.id
      updateCard = state.cards.find(card => card.id === payload.cardId)
    }
    updateCard.items.push({ text: payload.text, id: itemId })
  },
  deleteItem (state, payload) {
    let card = state.cards.find(card => card.id === payload.cardId)
    let pos = card.items.findIndex(item => item.id === payload.itemId)
    card.items.splice(pos, 1)
  },
  moveItem (state, payload) {
    let { srcCardId: src, dstCardId: dst, id, itemId } = payload
    let srcCard = state.cards.find(card => card.id === src)
    let dstCard = state.cards.find(card => card.id === dst)
    let pos = srcCard.items.findIndex(item => item.id === id)
    let item = srcCard.items.splice(pos, 1)[0]
    if (!itemId) dstCard.items.push(item)
    else {
      let insertPos = dstCard.items.findIndex(item => item.id === itemId)
      dstCard.items.splice(insertPos, 0, item)
    }
  },
  addCard (state, payload) {
    let { id, title, themeColor } = payload
    state.cards.push({id: id, title: title, themeColor: themeColor, items: []})
  },
  updateCard (state, payload) {
    let { id, title, themeColor } = payload
    let updatedCard = state.cards.find(card => card.id === id)
    updatedCard.title = title
    updatedCard.themeColor = themeColor
  },
  deleteCard (state, payload) {
    let { cardId } = payload
    let delPos = state.cards.findIndex(card => card.id === cardId)
    if (delPos === -1) return
    state.cards.splice(delPos, 1)
  },
  resetCards (state, payload) {
    state.cards = payload
  },
  setStatic (state, payload) {
    state.static[payload.name] = payload.data
  }
}

const actions = {
  loadCards ({ commit }) {
    return board.getCards().then(cards => {
      commit('resetCards', cards)
    })
  },
  saveCards ({ state }) {
    return board.saveCards(state.cards)
  },
  loadStatic ({ state, commit }, url, useCache = true) {
    return new Promise((resolve, reject) => {
      if (useCache && state.static[url]) {
        resolve(state.static[url])
        return
      }
      board.getStatic(url).then(data => {
        commit('setStatic', { name: url, data: data })
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}

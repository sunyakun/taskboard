import board from '../api/board'

const state = {
  cards: []
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
    let { srcCardId: src, dstCardId: dst, id } = payload
    let srcCard = state.cards.find(card => card.id === src)
    let dstCard = state.cards.find(card => card.id === dst)
    let pos = srcCard.items.findIndex(item => item.id === id)
    let item = srcCard.items.splice(pos, 1)[0]
    dstCard.items.push(item)
  },
  resetCards (state, payload) {
    state.cards = payload
  }
}

const actions = {
  loadCards ({ commit }) {
    let cards = board.getCards()
    commit('resetCards', cards)
  },
  saveCards ({ state }) {
    board.saveCards(state.cards)
  }
}

export default {
  state,
  mutations,
  actions
}

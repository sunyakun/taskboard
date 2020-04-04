<template>
  <div id="app">
    <board
      v-for="card in cards"
      v-bind:key="card.id"
      v-bind:card="card"
    />
    <bubble v-bind:display="bubbleDisplay" @click.native='bubbleDisplay=false'>{{ bubbleMsg }}</bubble>
  </div>
</template>

<script>
import Board from './components/board'
import MyButton from './components/button'
import Bubble from './components/bubble'
import store from './store/index'

export default {
  created: function () {
    let saveShotcut = this.saveShotcut
    document.addEventListener('keydown', event => {
      if (event.ctrlKey && event.key === 's') {
        saveShotcut()
      }
    }, true)
    this.$store.dispatch('loadCards')
  },
  name: 'App',
  store,
  components: {
    board: Board,
    myButton: MyButton,
    bubble: Bubble
  },
  data: function () {
    return {
      bubbleDisplay: false,
      bubbleMsg: ''
    }
  },
  computed: {
    cards: function () {
      this.$store.dispatch('saveCards')
      return this.$store.state.board.cards
    }
  },
  methods: {
    saveShotcut () {
      let self = this
      this.$electron.ipcRenderer.send('saveData')
      this.$electron.ipcRenderer.once('saveData-reply', (event) => {
        self.bubbleDisplay = true
        self.bubbleMsg = '保存成功'
        setTimeout(() => void (self.bubbleDisplay = false), 1000)
      })
    }
  }
}
</script>

<style>
#app {
  display: flex;
  justify-content: center;
}
</style>

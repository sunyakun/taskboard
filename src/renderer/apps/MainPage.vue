<template>
  <div id="app">
    <navigation v-bind:options='options' @optionClick='$root.currentLocation="/config"'/>
    <div class='flex-box'>
      <board
        v-for="card in cards"
        v-bind:key="card.id"
        v-bind:card="card"
      />
    </div>
    <bubble v-bind:display="bubbleDisplay" @click.native='bubbleDisplay=false'>{{ bubbleMsg }}</bubble>
  </div>
</template>

<script>
import Board from '../components/board'
import MyButton from '../components/button'
import Bubble from '../components/bubble'
import Navigation from '../components/navigation'

export default {
  created: function () {
    let saveShotcut = this.saveShotcut
    document.addEventListener('keydown', event => {
      if (event.ctrlKey && event.key === 's') {
        saveShotcut()
      }
    }, true)
  },
  name: 'MainPage',
  components: {
    board: Board,
    myButton: MyButton,
    bubble: Bubble,
    navigation: Navigation
  },
  data: function () {
    let self = this
    let options = []
    let backIcon = {id: 1, src: '/config.svg'}
    this.$store.dispatch('loadStatic', backIcon.src).then(() => {
      backIcon.icon = self.$store.state.board.static[backIcon.src]
      options.push(backIcon)
    })
    return {
      bubbleDisplay: false,
      bubbleMsg: '',
      options: options
    }
  },
  computed: {
    cards: function () {
      return this.$store.state.board.cards
    }
  },
  methods: {
    saveShotcut () {
      let self = this
      this.$store.dispatch('saveCards').then(() => {
        self.bubbleDisplay = true
        self.bubbleMsg = '保存成功'
        setTimeout(() => void (self.bubbleDisplay = false), 1000)
      })
    }
  }
}
</script>

<style>
body {
  margin: 0
}

.flex-box {
  display: flex;
  justify-content: center;
}
</style>

<template>
  <div id="app">
    <board
      v-for="card in cards"
      v-bind:key="card.id"
      v-bind:card="card"
    />
  </div>
</template>

<script>
import Board from './components/board'
import MyButton from './components/button'
import store from './store/index'

export default {
  created: function () {
    this.$store.dispatch('loadCards')
  },
  name: 'App',
  store,
  components: {
    board: Board,
    myButton: MyButton
  },
  computed: {
    cards: function () {
      this.$store.dispatch('saveCards')
      return this.$store.state.board.cards
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

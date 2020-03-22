<template>
  <div id="app">
    <board
      v-for="card in cards"
      v-bind:key="card.id"
      v-bind:card="card"
      @itemChange="onItemChange(card, $event)"
    />
  </div>
</template>

<script>
import Board from './components/board'

export default {
  name: 'App',
  components: {
    board: Board
  },
  props: {
    cards: Array
  },
  methods: {
    onItemChange: function (card, items) {
      this.$emit('boardchange', card.id, items)
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

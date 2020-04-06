<template>
  <div id="app">
    <navigation v-bind:options='options' @optionClick='$root.currentLocation="/"'/>
    <div class='config'>
      <h2>Cards</h2>

      <form>
        <my-select v-bind:options='cardSelectOptions' v-model='selectedCardId'/>
        <my-input
          v-bind:label='"Title:"'
          v-bind:button='false'
          v-model='selectedCardTitle'/>
        <my-input
          type='color'
          v-bind:label='"Color:"'
          v-bind:button='false'
          v-model='selectedCardThemeColor'/>
        <my-button @click.native='addCard' style='margin-top: 0.25rem'>SAVE</my-button>
        <my-button @click.native='deleteCard'  style='margin-top: 0.25rem'>Remove</my-button>
      </form>
    </div>
  </div>
</template>

<script>
import Navigation from '../../components/navigation'
import MyInput from '../../components/input'
import MyButton from '../../components/button'
import MySelect from '../../components/select'

export default {
  name: 'ConfigPage',
  components: {
    navigation: Navigation,
    myInput: MyInput,
    myButton: MyButton,
    MySelect: MySelect
  },
  data: function () {
    let cardSelectOptions = []
    let maxId = -1
    for (let card of this.$store.state.board.cards) {
      if (maxId < card.id) maxId = card.id + 1
      cardSelectOptions.push({id: card.id, value: card.title})
    }
    cardSelectOptions.push({id: maxId, value: '添加'})
    return {
      options: [{text: 'Back'}],
      cardSelectOptions: cardSelectOptions,
      selectedCardId: this.$store.state.board.cards[0].id,
      selectedCardTitle: this.$store.state.board.cards[0].title,
      selectedCardThemeColor: this.$store.state.board.cards[0].themeColor
    }
  },
  methods: {
    addCard () {
      this.$store.commit('addCard', {
        id: this.selectedCardId,
        title: this.selectedCardTitle,
        themeColor: this.selectedCardThemeColor
      })
    }
  },
  watch: {
    selectedCardId: function (val, oldVal) {
      let cardId = this.selectedCardId || this.$store.state.board.cards[0].id
      let card = this.$store.state.board.cards.find(card => card.id === Number(cardId)) ||
          {title: 'new card', themeColor: '#000000'}
      this.selectedCardTitle = card.title
      this.selectedCardThemeColor = card.themeColor
    }
  }
}
</script>

<style scoped>
.config {
  width: 25%;
  margin: auto;
}

.btn {
  display: block;
  width: 100%;
}
</style>
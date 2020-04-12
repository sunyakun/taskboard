<template>
  <div id="app">
    <navigation v-bind:options='options' @optionClick='$root.currentLocation="/"'/>
    <div class='config'>
      <h2>Cards</h2>

      <form>
        <my-select
          ref='select'
          v-bind:options='cardSelectOptions'
          v-model='selectedCardId'/>
        <my-input
          v-bind:label='"Title:"'
          v-bind:button='false'
          v-model='selectedCardTitle'/>
        <my-input
          type='color'
          v-bind:label='"Color:"'
          v-bind:button='false'
          v-model='selectedCardThemeColor'/>
        <my-button @click.native='updateCard' style='margin-top: 0.25rem'>SAVE</my-button>
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
  beforeCreate () {
    this._occupationCard = {id: -1, title: 'new card', themeColor: '#000000'}
  },
  data () {
    let options = []
    let self = this
    let backIcon = {id: 1, src: '/back.svg'}
    this.$store.dispatch('loadStatic', backIcon.src).then(() => {
      backIcon.icon = self.$store.state.board.static[backIcon.src]
      options.push(backIcon)
    })
    return {
      options: options,
      selectedCardId: this._occupationCard.id,
      selectedCardTitle: this._occupationCard.title,
      selectedCardThemeColor: this._occupationCard.themeColor
    }
  },
  computed: {
    cardSelectOptions () {
      let cardSelectOptions = []
      let maxId = -1
      for (let card of this.$store.state.board.cards) {
        if (maxId < card.id) maxId = card.id
        cardSelectOptions.push({id: card.id, value: card.title})
      }
      // 设置占位元素id，用来添加新 card
      this._occupationCard.id = maxId + 1
      cardSelectOptions.push({id: this._occupationCard.id, value: '添加'})
      this.selectedCardId = cardSelectOptions[0].id
      return cardSelectOptions
    }
  },
  methods: {
    updateCard () {
      if (Number(this.selectedCardId) === this._occupationCard.id) {
        this.$store.commit('addCard', {
          id: Number(this.selectedCardId),
          title: this.selectedCardTitle,
          themeColor: this.selectedCardThemeColor
        })
      } else {
        this.$store.commit('updateCard', {
          id: Number(this.selectedCardId),
          title: this.selectedCardTitle,
          themeColor: this.selectedCardThemeColor
        })
      }
    },
    deleteCard () {
      this.$store.commit('deleteCard', {cardId: Number(this.selectedCardId)})
      this.selectedCardId = this.$store.state.board.cards[0].id
    }
  },
  watch: {
    selectedCardId (val, oldVal) {
      let cardId = Number(val)
      let card = this.$store.state.board.cards.find(card => card.id === cardId) || this._occupationCard
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
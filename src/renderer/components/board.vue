<template>
  <div class="board">
    <header class="header" v-bind:style="{borderTopColor: card.themeColor}">
      <my-label class="label" v-bind:color="card.themeColor">{{ card.title }}</my-label>
      <my-button v-on:click.native="displayInput">+</my-button>
    </header>
    <div
      class="body"
      v-on:dragover.prevent="onDragover"
      v-on:drop.prevent="onDrop">
      <transition-group 
        tag="ul"
        name="card-list"
        class="cards"
      >
        <card v-if="showInput" key="input" class="input-card">
          <my-input
            v-on:ok="saveInputItem"
            v-on:cancle="showInput=false"
            v-model="inputValue"
          />
        </card>
        <card
          class="card"
          draggable="true"
          v-for="item in card.items"
          v-bind:key="item.id"
          v-on:dragstart.native="onDragstart(item, $event)"
          v-on:drop.native="onInsertDrop(item, $event)"
        >
          <my-item v-bind:item="item" v-on:delete="deleteItem(item)" />
        </card>
      </transition-group>
    </div>
  </div>
</template>

<script>
import MyButton from './button'
import MyLabel from './label'
import MyItem from './item'
import Card from './card'
import MyInput from './input'

export default {
  name: 'Board',
  components: {
    'my-label': MyLabel,
    'my-button': MyButton,
    'my-item': MyItem,
    'my-input': MyInput,
    card: Card
  },
  props: {
    card: Object
  },
  data: function () {
    return {
      showInput: false,
      inputValue: '请输入...'
    }
  },
  methods: {
    onDragstart: function (item, event) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemobject', JSON.stringify({id: item.id, srcCardId: this.card.id}))
    },
    onDragover: function (event) {
      if ([...event.dataTransfer.types].includes('itemobject')) {
        event.dataTransfer.dropEffect = 'move'
      } else {
        event.dataTransfer.dropEffect = 'none'
      }
    },
    onDrop: function (event) {
      let data = event.dataTransfer.getData('itemobject')
      data = JSON.parse(data)
      this.$store.commit({type: 'moveItem', dstCardId: this.card.id, ...data})
      this.$store.dispatch('saveCards')
    },
    onInsertDrop: function (item, event) {
      let data = event.dataTransfer.getData('itemobject')
      data = JSON.parse(data)
      this.$store.commit({type: 'moveItem', dstCardId: this.card.id, itemId: item.id, ...data})
      this.$store.dispatch('saveCards')
      event.stopPropagation()
    },
    saveInputItem: function () {
      this.addItem({text: this.inputValue})
      this.showInput = false
    },
    deleteItem: function (item) {
      this.$store.commit({type: 'deleteItem', itemId: item.id, cardId: this.card.id})
      this.$store.dispatch('saveCards')
    },
    addItem: function (item) {
      this.$store.commit({type: 'addItem', cardId: this.card.id, ...item})
      this.$store.dispatch('saveCards')
    },
    displayInput: function (event) {
      this.showInput = true
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.board {
  min-height: 170px;
  width: 400px;
  margin: 0 4px;
  background: rgb(250, 250, 250);
  border: 1px solid rgb(229, 229, 229);
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 4px;
}

.header {
  display: flex;
  font-size: 1.25rem;
  padding: 1rem;
  border-bottom: 1px solid rgb(229, 229, 229);
  border-top-width: 4px;
  border-top-style: solid;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
}

.label {
  box-sizing: border-box;
  flex-grow: 1;
}

.body {
  flex-basis: 100%;
  max-height: 80vh;
  overflow: auto;
}

.body::-webkit-scrollbar {
  width: 0px;
}

.body:hover::-webkit-scrollbar {
  width: 0.25rem;
}

.body::-webkit-scrollbar-thumb {
  background: rgb(202, 202, 202);
  border-radius: 1rem;
}

.cards {
  padding: 4px;
  height: 100%;
  padding-bottom: 2rem;
}

.card-list-move {
  transition: all 0.3s;
}

.card-list-leave-active {
  display: none;
}
</style>

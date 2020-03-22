<template>
  <div class="board">
    <header class="header" v-bind:style="{borderTopColor: card.themeColor}">
      <my-label class="label" v-bind:color="card.themeColor">{{ card.title }}</my-label>
      <my-button v-on:click.native="showInput=true">+</my-button>
    </header>
    <div class="body">
      <transition name="overturn">
        <card v-if="showInput">
          <my-input
            v-on:ok="saveInputItem"
            v-on:cancle="showInput=false"
            v-model="inputValue"
          />
        </card>
      </transition>
      <ul
        class="cards"
        v-on:dragover.prevent="onDragover"
        v-on:drop.prevent="onDrop"
      >
        <card
          draggable="true"
          v-for="item in items"
          v-bind:key="item.id"
          v-on:dragstart.native="onDragstart(item, $event)"
          v-on:dragend.native="onDragend(item, $event)"
        >
          <my-item v-bind:item="item" v-on:delete="deleteItem(item)" />
        </card>
      </ul>
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
      items: this.card.items,
      inputValue: '请输入...'
    }
  },
  methods: {
    onDragover: function (event) {
      if ([...event.dataTransfer.types].includes('itemobject')) {
        event.dataTransfer.dropEffect = 'move'
      } else {
        event.dataTransfer.dropEffect = 'none'
      }
    },
    onDrop: function (event) {
      let data = event.dataTransfer.getData('itemobject')
      let item = JSON.parse(data)
      this.addItem(item)
    },
    onDragstart: function (item, event) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemobject', JSON.stringify(item))
    },
    onDragend: function (item, event) {
      if (event.dataTransfer.dropEffect !== 'none') this.deleteItem(item)
    },
    saveInputItem: function () {
      let maxId = 0
      for (let item of this.items) {
        if (maxId < item.id) maxId = item.id
      }
      this.addItem({ text: this.inputValue, id: ++maxId })
      this.showInput = false
    },
    deleteItem: function (item) {
      let pos = this.items.findIndex(it => it.id === item.id)
      this.items.splice(pos, 1)
      this.$emit('itemChange', this.items)
    },
    addItem: function (item) {
      this.items.push(item)
      this.$emit('itemChange', this.items)
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
}

.cards {
  padding: 4px;
  height: 100%;
  padding-bottom: 2rem;
}

.overturn-enter,
.overturn-leave-to {
  transform-origin: center top;
  transform: rotateX(90deg);
}

.overturn-enter-active,
.overturn-leave-active {
  transform-origin: center top;
  transition: transform 0.3s;
}
</style>

<template>
    <transition name='bubble'>
      <div
        v-if='show'
        class='bubble'
        v-bind:style="userStyle"
        @click='destory'>
        <slot></slot>
      </div>
    </transition>
</template>

<script>
export default {
  name: 'Bubble',
  props: {
    'userStyle': {
      type: Object,
      default: function () {
        return {
          right: '10px',
          bottom: '10px',
          color: 'white',
          backgroundColor: 'rgb(43, 44, 43)'
        }
      }
    }
  },
  data: function () {
    return {
      show: true
    }
  },
  methods: {
    destory () {
      this.show = false
    }
  }
}
</script>

<style scoped>
.bubble {
    font-size: 1rem;
    position: fixed;
    padding: 2rem 4rem;
    border: solid 1px black;
    border-radius: 8px;
    cursor: default;
    transform: translateY(calc(5rem+10px))
}

.bubble-enter, .bubble-leave-to {
    transform: translateY(calc(5rem+10px))
}

.bubble-enter-active, .bubble-leave-active {
    transition: opacity 0.5s;
}
</style>
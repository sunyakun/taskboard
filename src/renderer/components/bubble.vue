<template>
    <transition name='bubble'>
      <div
        v-if='display'
        class='bubble'
        v-bind:style="userStyle">
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
    },
    display: {
      type: Boolean,
      default: () => true
    }
  }
}
</script>

<style scoped>
.bubble {
    font-size: 1rem;
    position: fixed;
    right: 10px;
    bottom: 10px;
    color: 'white';
    background-color: 'rgb(43, 44, 43)';
    padding: 2rem 4rem;
    border: solid 1px black;
    border-radius: 8px;
    cursor: default;
}

.bubble-enter {
    transform: translateY(calc(5rem + 17px));
}

.bubble-leave-to {
    opacity: 0;
}

.bubble-enter-active, .bubble-leave-active {
    transition: all 0.3s;
}
</style>
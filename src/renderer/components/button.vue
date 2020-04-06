<template>
  <button class='btn' type='button' v-bind='$attrs'>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton'
}
</script>

<style scoped>
.btn {
  padding: 4px 8px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(229, 229, 229);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  outline: none;
}

.btn:hover {
  background-color: rgb(240, 240, 240);
}

.btn:active {
  padding: 4px 8px;
}

.btn::-moz-focus-inner {
  border: none;
}
</style>
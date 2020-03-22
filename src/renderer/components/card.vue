<template>
  <li class="item border-radius">
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'Card'
}
</script>

<style scoped>
li {
    list-style: none;
}

.item {
    margin-bottom: 8px;
    padding: 16px;
    border: 1px solid rgb(229, 229, 229);
    background: white;
}
</style>

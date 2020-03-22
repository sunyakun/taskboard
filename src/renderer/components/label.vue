<template>
  <div>
    <span class="label" v-bind:style="{backgroundColor: color}">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'MyLabel',
  props: {
    color: String
  }
}
</script>

<style scoped>
div {
  user-select: none;
}

.label {
  color: white;
  padding: 0.25rem;
  font-size: 14px;
  border-radius: 12px;
}
</style>

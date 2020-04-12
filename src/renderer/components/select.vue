<template>
  <select @change='$emit("input", $event.target.value)'>
    <option v-for='option in options' v-bind:key='option.id' v-bind:value='option.id'>
      {{ option.value }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'MySelect',
  props: {
    value: {
      type: [String, Number],
      default: () => 'value'
    },
    options: {
      type: Array,
      default: () => [{id: 1, value: 'value'}]
    }
  }
}
</script>

<style scoped>
select {
  display: block;
  width: calc(100% - 20px);
  height: 1.25rem;
  margin: 5px 0;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid rgb(229, 229, 229);
  box-sizing: content-box;
}
</style>
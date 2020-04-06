<template>
  <div class='option-container'>
    <div class='option' v-for='option in options' v-bind:key='option.id'  @click='$emit("optionClick", option)'>
      <div v-if='option.text' class='option-content'>{{ option.text }}</div>
      <div v-if='option.icon' v-html='option.icon' class='option-content'></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    options: Array
  }
}
</script>

<style scoped>
.option-container {
  display: flex;
  justify-content: flex-end;
  font-size: 1.25rem;
  height: 3rem;
  background-color: rgb(105, 153, 255);
  margin-bottom: 1rem;
  padding: 0 1rem;
}

.option {
  width: 3rem;
  color: white;
  text-align: center;
  cursor: pointer;
}

.option-content {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.option:hover {
  background-color: rgb(46, 112, 255);
}
</style>
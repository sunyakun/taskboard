<template>
  <div>
    <div class="content">
      <p>{{ item.text }}</p>
    </div>
    <div class="footer">
      <span>{{ item.id }}</span>
      <a v-on:click="$emit('delete')">del</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyItem',
  props: {
    item: Object
  }
}
</script>

<style scoped>
.footer {
  font-size: 0.75rem;
  color: rgb(50, 50, 50);
  display: flex;
}

.footer > span {
  flex-grow: 1;
}

.footer > a {
  cursor: pointer;
}

.footer > a:hover {
  color: black;
}

.footer:before {
  content: "#";
}
</style>

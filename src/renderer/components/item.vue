<template>
  <div>
    <div class="content">
      <p>{{ item.text }}</p>
    </div>
    <div class="footer">
      <span>{{ item.id }}</span>
      <a v-on:click="$emit('delete')">
        <svg
          @mouseover='mouseOverDeleteIcon'
          @mouseleave='mouseLeaveDeleteIcon'
          v-bind:width='fontSize'
          v-bind:height='fontSize'
          t="1585448676803"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1146">
          <path
            v-bind:fill='iconColor'
            d="M768 416v448a32 32 0 0 1-32 32H288a32 32 0 0 1-32-32V416a32 32 0 0 0-64 0v448a96.11 96.11 0 0 0 96 96h448a96.11 96.11 0 0 0 96-96V416a32 32 0 0 0-64 0z" p-id="1147">
          </path>
          <path
            v-bind:fill='iconColor'
            d="M864 192H672v-32a96.11 96.11 0 0 0-96-96H448a96.11 96.11 0 0 0-96 96v32H160a96 96 0 0 0 0 192h704a96 96 0 0 0 0-192z m-448-32a32 32 0 0 1 32-32h128a32 32 0 0 1 32 32v32H416v-32z m448 160H160a32 32 0 0 1 0-64h704a32 32 0 0 1 0 64zM352 800a32 32 0 0 0 32-32V512a32 32 0 0 0-64 0v256a32 32 0 0 0 32 32zM672 800a32 32 0 0 0 32-32V512a32 32 0 0 0-64 0v256a32 32 0 0 0 32 32zM512 800a32 32 0 0 0 32-32V512a32 32 0 0 0-64 0v256a32 32 0 0 0 32 32z"
            p-id="1148">
          </path>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyItem',
  props: {
    item: Object
  },
  data: function () {
    return {
      fontSize: '0.75rem',
      iconColor: 'black'
    }
  },
  methods: {
    mouseOverDeleteIcon () {
      this.iconColor = 'red'
    },
    mouseLeaveDeleteIcon () {
      this.iconColor = 'black'
    }
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

.footer:before {
  content: "#";
}
</style>

<template>
  <div>
    <div>
      <label>
        <slot>Content:</slot>
      </label>
      <input
        v-focus="autofocus"
        class="input"
        @input="$emit('input', $event.target.value)"
      >
    </div>
    <div>
      <my-button class="btn" v-on:click.native="$emit('ok')">确定</my-button>
      <my-button class="input-btn" v-on:click.native="$emit('cancle')">取消</my-button>
    </div>
  </div>
</template>

<script>
import MyButton from './button'

export default {
  name: 'MyInput',
  props: {
    'value': [String, Number],
    'autofocus': Boolean
  },
  directives: {
    focus: {
      inserted: function (el, sw) {
        if (sw) el.focus()
      }
    }
  },
  components: {
    'my-button': MyButton
  }
}
</script>

<style scoped>
.input {
  margin: 5px 0;
  padding: 6px 10px;
  width: calc(100% - 20px);
  height: 1.25rem;
  border-radius: 4px;
  border: 1px solid rgb(229, 229, 229);
}

.input:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  border-color: #80bdff;
  outline: none;
}

.btn {
  margin-left: 0.25rem;
}
</style>
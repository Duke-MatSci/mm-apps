<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Welcome to MaterialsMine App!</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
});
</script>

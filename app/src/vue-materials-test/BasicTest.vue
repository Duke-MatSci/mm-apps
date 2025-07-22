<template>
  <div class="basic-test">
    <h1>Basic Test</h1>
    <p>This is a basic test without any theme imports.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BasicTest',
});
</script>

<style scoped>
.basic-test {
  padding: 20px;
}
</style>

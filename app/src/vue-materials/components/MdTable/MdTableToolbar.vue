<template>
  <md-toolbar class="md-table-toolbar md-transparent" :md-elevation="0">
    <slot />
  </md-toolbar>
</template>

<script setup lang="ts">
import { inject } from 'vue';

// Inject MdTable context
inject('MdTable');

// Component name for debugging
defineOptions({
  name: 'MdTableToolbar',
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';

.md-table-toolbar {
  padding-left: 24px;

  .md-title {
    flex: 1;
    font-size: 20px;
  }
}
</style>

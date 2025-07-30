<template>
  <div class="md-card-expand">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';

// Inject MdCard context
const MdCard = inject('MdCard');

// Define component name
defineOptions({
  name: 'MdCardExpand',
});
</script>

<style lang="scss">
.md-card-expand {
  overflow: hidden;

  .md-card-actions {
    position: relative;
    z-index: 2;
  }

  .md-card-expand-content {
    position: relative;
    z-index: 1;
  }
}
</style>

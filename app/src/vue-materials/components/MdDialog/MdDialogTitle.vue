<template>
  <span class="md-dialog-title md-title">
    <slot />
  </span>
</template>

<script setup lang="ts">
// Define component name
defineOptions({
  name: 'MdDialogTitle',
});
</script>

<style lang="scss">
.md-dialog-title {
  margin-bottom: 20px;
  padding: 24px 24px 0;
}
</style>

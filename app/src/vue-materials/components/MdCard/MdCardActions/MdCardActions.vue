<template>
  <div class="md-card-actions" :class="`md-alignment-${mdAlignment}`">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Props
interface Props {
  mdAlignment?: 'left' | 'right' | 'space-between';
}

const props = withDefaults(defineProps<Props>(), {
  mdAlignment: 'right',
});

// Define component name
defineOptions({
  name: 'MdCardActions',
});
</script>

<style lang="scss">
.md-card-actions {
  padding: 8px;
  display: flex;
  align-items: center;

  &.md-alignment-right {
    justify-content: flex-end;
  }

  &.md-alignment-left {
    justify-content: flex-start;
  }

  &.md-alignment-space-between {
    justify-content: space-between;
  }

  .md-button {
    margin: 0;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    + .md-button {
      margin-left: 4px;
    }
  }
}
</style>

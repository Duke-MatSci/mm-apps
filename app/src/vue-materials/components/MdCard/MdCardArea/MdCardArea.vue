<template>
  <div class="md-card-area" :class="areaClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Props
interface Props {
  mdInset?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mdInset: false,
});

// Computed
const areaClasses = computed(() => ({
  'md-inset': props.mdInset,
}));

// Define component name
defineOptions({
  name: 'MdCardArea',
});
</script>

<style lang="scss">
.md-card-area {
  position: relative;
}

.md-card {
  > .md-card-area:not(:last-child) {
    position: relative;

    &:after {
      height: 1px;
      position: absolute;
      bottom: 0;
      content: ' ';
    }

    &:not(.md-inset):after {
      right: 0;
      left: 0;
    }

    &.md-inset:after {
      right: 16px;
      left: 16px;
    }
  }
}
</style>

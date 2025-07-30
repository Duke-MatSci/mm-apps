<template>
  <div :class="['md-dialog-content', mdActiveTheme]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';

// Props
interface Props {
  mdTheme?: string;
}

const props = withDefaults(defineProps<Props>(), {
  mdTheme: 'default',
});

// Inject theme from parent component
const mdActiveTheme = inject(
  'mdActiveTheme',
  computed(() => `md-theme-${props.mdTheme}`)
);

// Define component name
defineOptions({
  name: 'MdDialogContent',
});
</script>

<style lang="scss">
.md-dialog-content {
  padding: 0 24px 24px;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  position: relative;

  &:first-child {
    padding-top: 24px;
  }

  p:first-child:not(:only-child) {
    margin-top: 0;
  }

  p:last-child:not(:only-child) {
    margin-bottom: 0;
  }
}
</style>

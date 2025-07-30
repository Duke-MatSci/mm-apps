<template>
  <li class="md-divider" :class="[mdActiveTheme]" v-if="insideList"></li>
  <hr class="md-divider" :class="[mdActiveTheme]" v-else />
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

// Computed
const insideList = computed(() => {
  // Check if parent is md-list (this is a simplified check)
  // In Vue 3, we might need to use provide/inject or other patterns
  return false; // Default to false, can be enhanced if needed
});

// Define component name
defineOptions({
  name: 'MdDivider',
});
</script>

<style lang="scss">
@import './theme.scss';

.md-divider {
  height: 1px;
  margin: 0;
  padding: 0;
  display: block;
  border: 0;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: margin-left;

  &.md-inset {
    margin-left: 72px;
  }
}
</style>

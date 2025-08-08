<template>
  <component :is="tag" v-bind="$attrs">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Props
interface Props {
  mdTag?: string;
}

const props = withDefaults(defineProps<Props>(), {
  mdTag: 'div',
});

// Computed
const tag = computed(() => props.mdTag);

// Component name for debugging
defineOptions({
  name: 'MdTagSwitcher',
});
</script>

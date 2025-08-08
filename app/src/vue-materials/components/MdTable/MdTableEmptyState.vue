<template>
  <md-empty-state v-bind="$props" class="md-table-empty-state">
    <slot />
  </md-empty-state>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import MdEmptyState from '../MdEmptyState/MdEmptyState.vue';

// Props
const props = defineProps({
  mdRounded: Boolean,
  mdSize: {
    type: Number,
    default: 420,
  },
  mdIcon: String,
  mdLabel: String,
  mdDescription: String,
});

// Inject MdTable context
const MdTable = inject('MdTable') as any;

// Component name for debugging
defineOptions({
  name: 'MdTableEmptyState',
  components: {
    MdEmptyState,
  },
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';

.md-table-empty-state {
  padding-left: 24px;
}
</style>

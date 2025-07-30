<template>
  <button type="button" class="md-list-item-button" :disabled="disabled">
    <md-list-item-content :md-disabled="isDisabled">
      <slot />
    </md-list-item-content>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  disabled?: boolean;
}

const props = defineProps<Props>();

const isDisabled = computed(() => props.disabled);

defineOptions({
  name: 'MdListItemButton',
});
</script>

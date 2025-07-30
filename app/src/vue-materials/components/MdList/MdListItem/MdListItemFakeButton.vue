<template>
  <div class="md-list-item-fake-button" :disabled="disabled">
    <md-list-item-content :md-disabled="isDisabled">
      <slot />
    </md-list-item-content>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  disabled?: boolean;
}

const props = defineProps<Props>();

const isDisabled = computed(() => props.disabled);

defineOptions({
  name: 'MdListItemFakeButton',
});
</script>

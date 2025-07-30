<template>
  <div class="md-list-item-content" :class="{ 'md-disabled': mdDisabled }">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  mdDisabled?: boolean;
}

defineProps<Props>();

defineOptions({
  name: 'MdListItemContent',
});
</script>

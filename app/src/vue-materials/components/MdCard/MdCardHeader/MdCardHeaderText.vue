<template>
  <div class="md-card-header-text">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';

// Reactive data
const parentClasses = ref<DOMTokenList | null>(null);

// Lifecycle hooks
onMounted(() => {
  // In Vue 3, we need to access the parent element differently
  // This is a simplified approach - in a real implementation, you might need to use provide/inject
  const parentElement = document.querySelector('.md-card-header');
  if (parentElement) {
    parentClasses.value = parentElement.classList;
    parentClasses.value.add('md-card-header-flex');
  }
});

onBeforeUnmount(() => {
  if (parentClasses.value) {
    parentClasses.value.remove('md-card-header-flex');
  }
});

// Define component name
defineOptions({
  name: 'MdCardHeaderText',
});
</script>

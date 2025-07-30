<template>
  <div class="md-button-content">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Props
interface Props {
  mdRipple?: boolean;
  mdRippleActive?: boolean | null;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mdRipple: false,
  mdRippleActive: null,
  disabled: false,
});

// Emits
const emit = defineEmits<{
  'update:mdRippleActive': [value: boolean];
}>();

// Define component name
defineOptions({
  name: 'MdButtonContent',
});
</script>

<style lang="scss">
.md-button-content {
  position: relative;
  z-index: 2;
}
</style>

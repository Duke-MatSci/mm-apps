<template>
  <transition name="md-snackbar" appear>
    <div class="md-snackbar" :class="mdClasses">
      <div class="md-snackbar-content">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
interface Props {
  mdClasses?: any[];
}

const props = withDefaults(defineProps<Props>(), {
  mdClasses: () => [],
});

defineOptions({
  name: 'MdSnackbarContent',
});
</script>

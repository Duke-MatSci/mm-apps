<template>
  <transition name="md-snackbar" appear>
    <div class="md-snackbar" :class="mdClasses">
      <div class="md-snackbar-content">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MdSnackbarContent',
  props: {
    mdClasses: {
      type: Array,
      default: () => [],
    },
  },
});
</script>

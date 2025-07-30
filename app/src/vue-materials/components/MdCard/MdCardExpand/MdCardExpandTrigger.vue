<script setup lang="ts">
import { inject } from 'vue';

// Inject MdCard context
const MdCard = inject('MdCard') as any;

// Methods
const handleClick = () => {
  if (MdCard) {
    MdCard.expand = !MdCard.expand;
  }
};

// Define component name
defineOptions({
  name: 'MdCardExpandTrigger',
});
</script>

<template>
  <div class="md-card-expand-trigger" @click="handleClick">
    <slot />
  </div>
</template>

<style lang="scss">
@import '../../MdAnimation/variables.scss';

.md-card-expand-trigger.md-icon-button {
  transition: transform 0.4s $md-transition-stand-timing;
  will-change: transform;
}
</style>

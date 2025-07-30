<template>
  <div v-show="false" class="md-drawer md-right-previous" :class="drawerClasses"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Props
interface Props {
  mdPermanent?: 'full' | 'clipped' | 'card';
  mdPersistent?: 'mini' | 'full';
  mdActive?: boolean;
  mdFixed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mdPermanent: undefined,
  mdPersistent: undefined,
  mdActive: false,
  mdFixed: false,
});

// Computed
const drawerClasses = computed(() => {
  const classes: Record<string, boolean> = {
    'md-temporary': isTemporary.value,
    'md-persistent': !!props.mdPersistent,
    'md-permanent': !!props.mdPermanent,
    'md-active': props.mdActive,
    'md-fixed': props.mdFixed,
  };

  if (props.mdPermanent) {
    classes[`md-permanent-${props.mdPermanent}`] = true;
  }

  if (props.mdPersistent) {
    classes[`md-persistent-${props.mdPersistent}`] = true;
  }

  return classes;
});

const isTemporary = computed(() => {
  return !props.mdPermanent && !props.mdPersistent;
});

// Define component name
defineOptions({
  name: 'MdDrawerRightPrevious',
});
</script>

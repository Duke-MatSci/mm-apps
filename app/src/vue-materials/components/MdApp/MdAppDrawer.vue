<template>
  <MdDrawer
    class="md-app-drawer"
    :md-active="mdActive && initialized"
    v-bind="$attrs"
    :md-right="mdRight"
    :md-fixed="true"
    ref="drawer"
  >
    <slot />
  </MdDrawer>
</template>

<script setup lang="ts">
import { inject, ref, watch, onMounted, onBeforeUnmount, nextTick, computed } from 'vue';
import MdDrawer from '../MdDrawer/MdDrawer.vue';

// Props
interface Props {
  mdRight?: boolean;
  mdActive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mdRight: false,
  mdActive: false,
});

// Inject MdApp context
const MdApp = inject('MdApp') as any;

// Refs
const drawer = ref<any>(null);
const drawerElement = ref({
  mdActive: null,
  mode: null,
  submode: null,
});
const initialized = ref(false);

// Computed properties
const visible = computed(() => {
  return drawerElement.value.mdActive;
});

const mode = computed(() => {
  return drawerElement.value.mode;
});

const submode = computed(() => {
  return drawerElement.value.submode;
});

// Methods
const getDrawerWidth = () => {
  const element = document.querySelector('.md-app-drawer') as HTMLElement;
  if (element) {
    return window.getComputedStyle(element).width;
  }
  return '0px';
};

const updateDrawerData = () => {
  if (MdApp?.value?.drawer) {
    MdApp.value.drawer.width = getDrawerWidth();
    MdApp.value.drawer.active = visible.value;
    MdApp.value.drawer.mode = mode.value;
    MdApp.value.drawer.submode = submode.value;
    MdApp.value.drawer.right = props.mdRight;
  }
};

const clearDrawerData = () => {
  if (MdApp?.value?.drawer) {
    MdApp.value.drawer.width = 0;
    MdApp.value.drawer.active = false;
    MdApp.value.drawer.mode = 'temporary';
    MdApp.value.drawer.submode = null;
    MdApp.value.drawer.initialWidth = 0;
  }
};

// Watchers
watch(visible, (visible) => {
  if (MdApp?.value?.drawer) {
    MdApp.value.drawer.width = getDrawerWidth();
    MdApp.value.drawer.active = visible;
  }
});

watch(mode, (mode) => {
  if (MdApp?.value?.drawer) {
    MdApp.value.drawer.mode = mode;
  }
});

watch(submode, (submode) => {
  if (MdApp?.value?.drawer) {
    MdApp.value.drawer.submode = submode;
  }
});

watch(
  () => props.mdRight,
  (right) => {
    if (MdApp?.value?.drawer) {
      MdApp.value.drawer.right = right;
    }
  }
);

// Lifecycle hooks
onMounted(() => {
  nextTick().then(() => {
    const element = document.querySelector('.md-app-drawer') as HTMLElement;
    if (element && MdApp?.value?.drawer) {
      MdApp.value.drawer.initialWidth = element.offsetWidth;
    }
    drawerElement.value = drawer.value;
    updateDrawerData();
    initialized.value = true;
  });
});

onBeforeUnmount(() => {
  clearDrawerData();
});

// Define component name
defineOptions({
  name: 'MdAppDrawer',
});
</script>

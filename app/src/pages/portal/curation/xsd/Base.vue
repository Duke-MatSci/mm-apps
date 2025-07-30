<template>
  <MdApp md-waterfall md-mode="fixed-last">
    <MdAppToolbar :toggler="toggleMenu" />
    <MdAppDrawer
      :md-active="toggleMenuVisibility"
      @update:md-active="toggleMenuVisibility = $event"
    >
      <drawers />
    </MdAppDrawer>
    <MdAppContent>
      <router-view />
    </MdAppContent>
  </MdApp>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// Vue Material components are globally registered via the plugin
import PageHeader from '@/components/portal/Header.vue';
import Drawers from '@/components/Drawer.vue';

// Component name for debugging
defineOptions({
  name: 'XsdBase',
});

// Reactive data
const toggleMenuVisibility = ref(false);

// Methods
const toggleMenu = () => {
  toggleMenuVisibility.value = !toggleMenuVisibility.value;
};

// Expose components
const components = {
  MdAppToolbar: PageHeader,
  Drawers,
};
</script>

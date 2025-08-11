<template>
  <div md-waterfall md-mode="fixed">
    <!-- Header Toolbar -->
    <MdAppToolbar id="header" :toggler="toggleMenuVisibility" />

    <!-- Navigation Drawer -->
    <md-drawer :md-active="menuVisible" @update:md-active="handleDrawerUpdate">
      <Drawer id="leftdrawer" />
    </md-drawer>

    <!-- Main Content -->
    <div class="app-content u--padding-zero u--layout-flex u--layout-flex-column">
      <HeroHeader />
      <router-view />
      <PageFooter id="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MdAppToolbar from '@/components/nanomine/PageHeader.vue';
import HeroHeader from '@/components/nanomine/HeroHeader.vue';
import PageFooter from '@/components/nanomine/PageFooter.vue';
import Drawer from '@/components/Drawer.vue';

// Reactive data
const menuVisible = ref<boolean>(false);

// Methods
const toggleMenuVisibility = (): void => {
  menuVisible.value = !menuVisible.value;
};

const handleDrawerUpdate = (value: boolean): void => {
  menuVisible.value = value;
};

// Define component name
defineOptions({
  name: 'NanomineBase',
});
</script>

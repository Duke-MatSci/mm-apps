<template>
  <MdApp md-waterfall md-mode="fixed">
    <template #md-app-toolbar>
      <PageHeader :toggler="toggleMenuVisibility" />
    </template>

    <template #md-app-content>
      <md-app-content class="u--padding-zero u--layout-flex u--layout-flex-column">
        <HeroHeader />
        <router-view />
        <PageFooter id="footer" />
      </md-app-content>
    </template>

    <md-app-drawer :md-active="menuVisible" @update:md-active="handleDrawerUpdate">
      <Drawer id="leftdrawer" />
    </md-app-drawer>
  </MdApp>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageHeader from '@/components/nanomine/PageHeader.vue';
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

<template>
  <div class="md-app md-app-side-drawer md-layout-row md-waterfall md-fixed md-theme-default">
    <!-- Navigation Drawer -->
    <md-drawer :md-active="menuVisible" @update:md-active="handleDrawerUpdate">
      <Drawer id="leftdrawer" />
    </md-drawer>

    <!-- Main Content -->
    <main
      class="md-app-container md-flex md-layout-column md-theme-default md-scrollbar"
      style="padding-left: 0px"
    >
      <!-- Header Toolbar -->
      <MdAppToolbar :showTop="showTop" :toggler="toggleMenuVisibility" />
      <div class="md-app-scroller md-layout-column md-flex md-theme-default md-scrollbar">
        <div class="u--padding-zero u_height--max">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import Drawer from '@/components/Drawer.vue';
import MdAppToolbar from '@/components/explorer/Header.vue';

// Component name for debugging
defineOptions({
  name: 'ExplorerBase',
});

// Reactive data
const menuVisible = ref<boolean>(false);
const showTop = ref(true);

// Computed
const getBody = computed(() => {
  return document.querySelector('.md-app.md-fixed .md-app-scroller');
});

// Methods
const toggleMenuVisibility = (): void => {
  menuVisible.value = !menuVisible.value;
};

const handleDrawerUpdate = (value: boolean): void => {
  menuVisible.value = value;
};

const adjustHeader = () => {
  const bodyElement = getBody.value as HTMLElement;
  const scrollHeight = bodyElement?.scrollTop || 0;
  if (window.innerWidth < 650) return;
  showTop.value = !(scrollHeight > 100);
  const offset = scrollHeight > 100 ? '-74px' : '0px';
  if (bodyElement) {
    bodyElement.style.position = 'relative';
    bodyElement.style.marginTop = offset;
    bodyElement.style.paddingBottom = offset;
  }
};

// Lifecycle
onMounted(() => {
  nextTick(() => {
    if (getBody.value) {
      getBody.value.addEventListener('scroll', adjustHeader);
    }
  });
});

onBeforeUnmount(() => {
  if (getBody.value) {
    getBody.value.removeEventListener('scroll', adjustHeader);
  }
});
</script>

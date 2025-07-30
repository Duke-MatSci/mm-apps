<template>
  <MdApp md-waterfall md-mode="fixed">
    <template #md-app-toolbar="{ toolbarClasses, toolbarStyles }">
      <div class="viz-u-postion__rel">
        <div
          class="md-toolbar md-app-toolbar md-theme-default md-elevation-4 md-large md-dense md-primary"
          :class="toolbarClasses"
          :style="[toolbarStyles, transition, !showTop && hideHeaderView]"
          id="reset_bg"
        >
          <ExpHeader :showTop="showTop" :toggler="toggleMenuVisibility" />
        </div>
      </div>
    </template>
    <template #md-app-content>
      <md-app-content class="u--padding-zero">
        <router-view />
      </md-app-content>
    </template>
    <md-app-drawer :md-active="menuVisible" @update:md-active="handleDrawerUpdate">
      <Drawers id="leftdrawer" />
    </md-app-drawer>
  </MdApp>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import Drawers from '@/components/Drawer.vue';
import ExpHeader from '@/components/explorer/Header.vue';

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

const hideHeaderView = computed(() => ({ top: `-${74}px` }));

const transition = computed(() => ({ transition: `all ${0.2}s linear` }));

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

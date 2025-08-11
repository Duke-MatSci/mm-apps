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
        <div class="u--padding-zero u--layout-flex u--layout-flex-column utility-roverflow">
          <div class="section_loader" v-if="loading">
            <spinner :loading="loading" text="Loading Ontology Data" />
          </div>
          <template v-else>
            <router-view v-if="!namespace" />

            <template v-else>
              <Classes v-if="!searchLoading && searchResult" />
              <Home v-else />
            </template>

            <div class="explorer_page_footer u_margin-top-auto">
              <span class="explorer_page_footer-text">
                &copy; {{ new Date().getFullYear() }} MaterialsMine Project
              </span>
            </div>
          </template>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Drawer from '@/components/Drawer.vue';
import MdAppToolbar from '@/components/explorer/Header.vue';
import spinner from '@/components/Spinner.vue';
import Classes from '@/pages/ns/Classes.vue';
import Home from '@/pages/ns/Home.vue';

// Component name for debugging
defineOptions({
  name: 'NameSpaceBase',
});

const store = useStore();
const route = useRoute();

// Reactive data
const menuVisible = ref<boolean>(false);
const showTop = ref<boolean>(true);
const searchLoading = ref<boolean>(true);

// Computed properties
const loading = computed(() => store.getters['ns/isLoading']);
const searchResult = computed(() => store.state.ns.currentClass);
const namespace = computed(() => route.params?.namespace as string);
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

const findQuery = async (query: string) => {
  searchLoading.value = true;
  store.commit('ns/clearCurrentClass');
  await nextTick();
  await store.dispatch('ns/searchNSData', { query, singleResult: true });
  if (searchResult.value) {
    store.commit('ns/setSelectedId', searchResult.value.ID);
  }
  searchLoading.value = false;
};

// Lifecycle
onMounted(async () => {
  await store.dispatch('ns/fetchNsData');
  if (namespace.value) await findQuery(namespace.value);

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

// Watchers
watch(
  () => route.params,
  async (newValue) => {
    if (newValue?.namespace) {
      await findQuery(newValue.namespace as string);
    }
  }
);
</script>

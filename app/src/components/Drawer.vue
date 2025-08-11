<template>
  <div
    class="md-app-internal-drawer u--layout-flex u--layout-flex-column u--layout-flex-justify-sb"
  ></div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Reactive data for expandable sections
const showHome = ref(false);
const showAbout = ref(false);
const showVisualize = ref(false);
const showTools = ref(false);
const showCurate = ref(false);

const isAuth = computed(() => store.getters['auth/isAuthenticated']);
const isAdmin = computed(() => store.getters['auth/isAdmin']);
const name = computed(() => store.getters['auth/displayName']);

// Toggle methods for expandable sections
const toggleHome = () => {
  showHome.value = !showHome.value;
};
const toggleAbout = () => {
  showAbout.value = !showAbout.value;
};
const toggleVisualize = () => {
  showVisualize.value = !showVisualize.value;
};
const toggleTools = () => {
  showTools.value = !showTools.value;
};
const toggleCurate = () => {
  showCurate.value = !showCurate.value;
};

const login = () => {
  window.location.href = '/secure';
};

const logout = () => store.dispatch('auth/logout');

defineOptions({
  name: 'Drawer',
});
</script>

<style scoped>
.md-list-expand {
  padding-left: 16px;
  background-color: rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
}

.utility-navfonticon {
  margin-right: 8px;
}
</style>

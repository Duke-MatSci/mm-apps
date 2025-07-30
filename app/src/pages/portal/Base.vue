<template>
  <MdApp>
    <MdAppToolbar id="header" :toggler="toggleMenuVisibility" />

    <MdAppContent class="viz-u-postion__rel" v-if="isAdmin">
      <div class="md-layout u_width--max md-gutter md-alignment-top-center">
        <div class="md-layout-item md-size-60 md-medium-size-90 md-xsmall-size-95">
          <profile-header></profile-header>
          <div
            class="u_margin-top-small u_display-flex section_md-header md-layout-row md-theme-demo-light md-scrollbar"
          >
            <!-- permanent drawer -->
            <MdSideNav></MdSideNav>

            <div class="u_width--max md-content u--margin-pos utility-roverflow">
              <div v-if="!!info.name">
                <h2 class="md-title u--color-black" style="margin-bottom: 0.4rem">
                  {{ info.name }}
                </h2>
              </div>
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </MdAppContent>
    <MdAppContent
      class="u_margin-top-small u_display-flex section_md-header md-layout-row md-theme-demo-light md-scrollbar"
      v-else
    >
      <div class="md-size-20 u--margin-leftsm">
        <user-side-bar></user-side-bar>
      </div>
      <div class="md-content u--margin-pos utility-roverflow u_width--max">
        <div class="u_width--max">
          <profile-header></profile-header>
          <div class="u_margin-top-small u_width--max">
            <div class="md-content u_width--max">
              <div v-if="!!info.name">
                <h2 class="md-title u--color-black" style="margin-bottom: 0.4rem">
                  {{ info.name }}
                </h2>
              </div>
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </MdAppContent>

    <MdAppDrawer :md-active="menuVisible" @update:md-active="menuVisible = $event">
      <Drawer id="leftdrawer"></Drawer>
    </MdAppDrawer>
  </MdApp>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
// Vue Material components are globally registered
import PageHeader from '@/components/portal/Header.vue';
import SideNav from '@/components/portal/SideNav.vue';
import ProfileHeader from '@/components/portal/ProfileHeader.vue';
import Drawer from '@/components/Drawer.vue';
import UserSideBar from '@/components/portal/UserSideBar.vue';

// Component name for debugging
defineOptions({
  name: 'PortalBase',
});

// Store
const store = useStore();

// Reactive data
const menuVisible = ref(false);

// Computed
const info = computed(() => store.getters.appHeaderInfo);
const isAdmin = computed(() => store.getters['auth/isAdmin']);
const isAuth = computed(() => store.getters['auth/isAuthenticated']);

// Methods
const toggleMenuVisibility = () => {
  menuVisible.value = !menuVisible.value;
};

// Expose components
const components = {
  MdAppToolbar: PageHeader,
  MdSideNav: SideNav,
  ProfileHeader,
  UserSideBar,
};
</script>

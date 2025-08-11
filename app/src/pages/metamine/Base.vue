<template>
  <div id="metamine_app" md-waterfall md-mode="fixed">
    <md-toolbar class="md-large md-dense md-primary adjust_metamine-toolbar">
      <div class="md-toolbar-row">
        <div class="contactus_radios md-card-actions">
          <md-button class="md-icon-button" @click="toggleMenu">
            <md-icon class="metamine_menu-icon">menu</md-icon>
          </md-button>
          <router-link to="/mm"
            ><span class="md-title adjust_metamine-title">MetaMine</span></router-link
          >
        </div>

        <div class="md-toolbar-section-end">
          <div>
            <nav class="nav_menu nav_menu--lightbg">
              <ul class="nav_ul" style="width: 100%">
                <li>
                  <div class="nav_menu--container">
                    <a class="u--default-size nav_menu--handler" href="#">ABOUT</a>
                    <div class="nav_menu--siblings">
                      <router-link to="/mm/teams" class="nav_menu--siblings-lists">
                        About Us
                      </router-link>
                      <router-link to="/nm/how" class="nav_menu--siblings-lists">
                        How To
                      </router-link>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="nav_menu--container">
                    <a class="u--default-size nav_menu--handler" href="#">VISUALIZE</a>
                    <div class="nav_menu--siblings">
                      <router-link to="/explorer" class="nav_menu--siblings-lists">
                        Browse Data
                      </router-link>
                      <router-link
                        to="/mm/metamaterial_visualization_nu"
                        class="nav_menu--siblings-lists"
                      >
                        Material Visualization
                      </router-link>
                      <router-link to="/explorer/dataset" class="nav_menu--siblings-lists">
                        Explore Curated Datasets
                      </router-link>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="nav_menu--container">
                    <a class="u--default-size nav_menu--handler" href="#">TOOLS</a>
                    <div class="nav_menu--siblings">
                      <router-link to="/mm/pixelunit" class="nav_menu--siblings-lists">
                        Geometry Explorer
                      </router-link>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="nav_menu--container">
                    <a class="u--default-size nav_menu--handler" href="/nm/contact">CONTACT US</a>
                  </div>
                </li>
                <li>
                  <div class="nav_menu--container">
                    <a v-if="!isAuth" class="u--default-size nav_menu--handler" href="/secure">
                      <md-icon class="metamine_menu-icon">person</md-icon>
                      LOGIN/REGISTER
                    </a>
                    <a
                      v-else
                      class="u--default-size nav_menu--handler"
                      @click="store.dispatch('auth/logout')"
                    >
                      Hi {{ displayName }}
                    </a>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </md-toolbar>

    <!-- Navigation Drawer -->
    <md-drawer :md-active="menuVisible" @update:md-active="handleDrawerUpdate">
      <Drawer id="leftdrawer" />
    </md-drawer>

    <!-- Main Content -->
    <div class="md-content md-app-content md-flex u_height--max md-theme-default">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import Drawer from '@/components/Drawer.vue';

// Component name for debugging
defineOptions({
  name: 'MetamineBase',
});

// Store
const store = useStore();

// Reactive data
const menuVisible = ref<boolean>(false);

// Methods
const toggleMenu = (): void => {
  menuVisible.value = !menuVisible.value;
};

const handleDrawerUpdate = (value: boolean): void => {
  menuVisible.value = value;
};

// Computed
const isAuth = computed(() => store.getters['auth/isAuthenticated']);
const displayName = computed(() => store.getters['auth/displayName']);
</script>

<style scoped>
#metamine_app {
  font-size: 14px !important;
}
</style>

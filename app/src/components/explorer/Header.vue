<template>
  <div class="viz-u-postion__rel">
    <md-toolbar
      class="md-app-toolbar md-large md-dense md-primary md-theme-default"
      id="reset_bg"
      :style="[transition, !showTop && hideHeaderView]"
    >
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button" @click="toggler">
            <md-icon>menu</md-icon>
          </md-button>

          <router-link to="/" class="header-logo">
            <span class="md-title"
              ><img id="logo" src="@/assets/img/materialsmine_logo_sm.png"
            /></span>
          </router-link>
        </div>

        <div class="md-toolbar-section-end md-toolbar-section-end_adjust">
          <div class="nav nav_menu u--inline">
            <ul>
              <li>
                <router-link to="/nm" v-slot="{ navigate, href }" custom>
                  <a :href="href" @click="navigate">NanoMine</a></router-link
                >
              </li>
              <li>
                <router-link to="/mm" v-slot="{ navigate, href }" custom>
                  <a :href="href" @click="navigate">Metamine</a>
                </router-link>
              </li>
              <li>
                <span v-if="isAuth" class="u_color_white u--font-emph-m">
                  Hi {{ displayName }}</span
                >
                <a
                  v-if="!isAuth"
                  class="md-icon-button large u_color_white u--font-emph-m u_margin-top-small"
                  href="/secure"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Toolbar -->
      <div class="md-toolbar-row u_margin-top-med u_toggle-display-off">
        <md-tabs class="md-primary" id="reset_tab_bg" md-sync-route>
          <!-- Add _ to _menutabs as this is just a class selector for testing purposes only -->
          <md-tab
            class="_menutabs md-button"
            v-for="(route, i) in tabRoutes"
            :key="i"
            :to="route.path"
            :id="`tab-${route.name || route.label}`"
            :md-label="route.label"
            :exact="route.exact"
          />
        </md-tabs>
      </div>
    </md-toolbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { HEADER_ROUTES } from '@/modules/nav-routes';

interface Props {
  toggler: () => void;
  showTop: boolean;
}

const props = defineProps<Props>();

const route = useRoute();
const store = useStore();

// Computed properties
const isAuth = computed(() => store.getters['auth/isAuthenticated']);
const displayName = computed(() => store.getters['auth/displayName']);

const tabRoutes = computed(() => {
  const routeParent = route.path.split('/')[1] as keyof typeof HEADER_ROUTES;
  const routes = HEADER_ROUTES?.[routeParent] ?? [];
  return routes;
});

const hideHeaderView = computed(() => ({ top: `-${74}px` }));

const transition = computed(() => ({ transition: `all ${0.2}s linear` }));

defineOptions({
  name: 'ExpHeader',
});
</script>

<template>
  <div class="md-toolbar-row">
    <div class="md-toolbar-section-start">
      <md-button class="md-icon-button" @click="toggler">
        <md-icon class="u_color_white">menu</md-icon>
      </md-button>

      <router-link to="/" class="header-logo">
        <span class="md-title"><img id="logo" src="@/assets/img/materialsmine_logo_sm.png" /></span>
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
            <span v-if="isAuth" class="u_color_white u--font-emph-m"> Hi {{ displayName }}</span>
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
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

interface Props {
  toggler: () => void;
  showTop: boolean;
}

const props = defineProps<Props>();

const store = useStore();

// Computed properties
const isAuth = computed(() => store.getters['auth/isAuthenticated']);
const displayName = computed(() => store.getters['auth/displayName']);

defineOptions({
  name: 'PortalHeader',
});
</script>

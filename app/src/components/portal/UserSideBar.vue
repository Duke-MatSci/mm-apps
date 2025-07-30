<template>
  <div class="md-app-side-drawer u_display-flex u--layout-flex-column">
    <!-- fix style="min-height: 80vh" -->
    <div
      v-if="sideDrawerVisiblity"
      style="min-height: 80vh"
      class="md-app-internal-drawer u--layout-flex u--layout-flex-column u--layout-flex-justify-sb metamine_footer-ref-header"
    >
      <md-list md-expand-single="true" class="utility-transparentbg">
        <button
          v-if="sideDrawerVisiblity"
          class="utility-gridborder return-btn return-btn-text u--margin-leftsm"
          style="place-self: end"
          @click="toggleSideDrawerVisibility"
        >
          <md-icon class="return-btn-text metamine_intro-header u_margin-none"
            >keyboard_arrow_left</md-icon
          >
          <md-tooltip md-direction="right">Close Menu</md-tooltip>
        </button>
        <router-link :to="'/portal/user'" v-slot="{ navigate, href }" custom>
          <md-list-item @click="navigate" :href="href">
            <i class="md-icon md-icon-font u--default-size md-theme-default">manage_accounts</i>
            <span class="md-list-item-text utility-navfont">Account</span>
          </md-list-item>
        </router-link>
        <md-divider></md-divider>

        <md-list-item md-expand>
          <md-icon class="utility-navfonticon">bar_chart</md-icon>
          <span class="md-list-item-text utility-navfont">Chart</span>
          <template #md-expand>
            <md-list>
              <router-link to="/portal/user/favorite-charts" v-slot="{ navigate, href }" custom>
                <md-list-item :href="href" @click="navigate" class="md-inset"
                  >Favorite Chart</md-list-item
                >
              </router-link>
            </md-list>
          </template>
        </md-list-item>
        <md-divider></md-divider>

        <md-list-item md-expand>
          <md-icon class="utility-navfonticon">account_tree</md-icon>
          <span class="md-list-item-text utility-navfont">My Curations</span>
          <template #md-expand>
            <md-list>
              <router-link
                :to="'/portal/user/approved-curations'"
                v-slot="{ navigate, href }"
                custom
              >
                <md-list-item :href="href" @click="navigate" class="md-inset">
                  <md-icon class="utility-navfonticon">thumb_up_alt</md-icon>Approved
                  Curations</md-list-item
                >
              </router-link>
              <router-link
                to="/portal/user/unapproved-curations"
                v-slot="{ navigate, href }"
                custom
              >
                <md-list-item :href="href" @click="navigate" class="md-inset">
                  <md-icon class="utility-navfonticon">hive</md-icon>Unapproved Curations
                </md-list-item>
              </router-link>
            </md-list>
          </template>
        </md-list-item>

        <md-divider></md-divider>
      </md-list>
    </div>

    <button
      v-if="!sideDrawerVisiblity"
      class="utility-gridborder return-btn metamine_footer-ref-header"
      @click="toggleSideDrawerVisibility"
    >
      <md-icon class="return-btn-text metamine_intro-header u_margin-none"
        >keyboard_arrow_right</md-icon
      >
      <md-tooltip md-direction="right">Open Menu</md-tooltip>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

defineOptions({ name: 'UserSideBar' });

const store = useStore();

const sideDrawerVisiblity = ref(true);

const toggleSideDrawerVisibility = () => {
  sideDrawerVisiblity.value = !sideDrawerVisiblity.value;
};

const isAuth = computed(() => store.getters['auth/isAuthenticated']);
const isAdmin = computed(() => store.getters['auth/isAdmin']);
const name = computed(() => store.getters['auth/displayName']);
</script>

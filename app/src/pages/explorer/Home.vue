<template>
  <div class="u--layout-flex-verticalScreen u--layout-flex-column">
    <div class="section_teams u--margin-centered-verticalScreen" v-if="!searchEnabled">
      <div class="search_box">
        <h2 class="search_box_header teams_header">Welcome to MM Explorer</h2>
        <form class="form" @submit.prevent="submitSearch()">
          <div class="search_box_form">
            <div class="form__group search_box_form-item-1">
              <input
                type="text"
                ref="searchInput"
                class="form__input form__input--adjust"
                autocomplete="off"
                placeholder="Search"
                name="search"
                id="search"
                required
                v-model="searchWord"
              />
              <label htmlFor="search" class="form__label search_box_form_label">Search</label>
            </div>
          </div>
          <div class="form__group search_box_form-item-2 explorer_page-nav u--margin-neg">
            <button
              type="submit"
              class="btn btn--primary btn--noradius search_box_form_btn mid-first-li display-text u--margin-pos"
            >
              Search
            </button>
          </div>
        </form>
        <p class="search_box_text">
          MM Explorer is a research-focused discovery tool that enables collaboration among scholars
          of nano and meta materials. Browse or search information on articles, samples, images,
          charts, etc.
        </p>
      </div>
    </div>
    <div class="explorer_page-container u_margin-top-auto" v-if="!searchEnabled">
      <div class="explorer_page-nav">
        <div class="teams_list explorer_page-list">
          <ul class="utility_flex_mobile">
            <li v-for="link in pageNavLinks" :key="link.text">
              <router-link :to="'/' + link.link" v-slot="{ navigate, href }" custom>
                <div class="teams_container explorer_page-nav-card" :href="href" @click="navigate">
                  <md-icon id="nav-icon" class="explorer_page-nav-card_icon">{{
                    link.icon
                  }}</md-icon>
                  <span class="explorer_page-nav-card_text">{{ link.text }}</span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <search-header v-if="searchEnabled" />
    <search-results-table v-if="searchEnabled" />
    <div class="explorer_page_footer u_margin-top-small">
      <span class="explorer_page_footer-text"
        >&copy; {{ new Date().getFullYear() }} MaterialsMine Project</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import SearchHeader from '@/components/explorer/SearchHeader.vue';
import SearchResultsTable from '@/components/explorer/SearchResultsTable.vue';

const store = useStore();
const searchInput = ref<HTMLInputElement>();

// Reactive data
const pageNavLinks = ref([
  { icon: 'grid_view', text: 'Gallery', link: 'explorer/visualization' },
  { icon: 'cloud_upload', text: 'Curate', link: 'explorer/curate' },
  { icon: 'help', text: 'Help', link: 'nm/how' },
]);

// Computed properties
const searchWord = computed({
  get() {
    return store.getters['explorer/getSearchKeyword'];
  },
  set(payload: string) {
    store.commit('explorer/setSearchKeyword', payload);
  },
});

const searchEnabled = computed(() => store.getters['explorer/getSearching']);

// Methods
const setSearching = () => store.commit('explorer/setSearching');
const setSearchKeyword = (keyword: string) => store.commit('explorer/setSearchKeyword', keyword);

const submitSearch = (payload?: string) => {
  let keyPhrase: string;
  if (typeof payload === 'string') {
    keyPhrase = payload;
  } else {
    keyPhrase = searchWord.value;
  }
  setSearching();
  setSearchKeyword(keyPhrase);
  store.dispatch('explorer/results/searchKeyword', keyPhrase);
};

const disableRender = async (e: Event) => {
  const selected = (e.target as Element).closest('.search_box');
  if (!selected) {
    store.commit('explorer/setEnableAutosuggest', false);
  }
};

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', disableRender);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', disableRender);
});

defineOptions({
  name: 'ExplorerHome',
});
</script>

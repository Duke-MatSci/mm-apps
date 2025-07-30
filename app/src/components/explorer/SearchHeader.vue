<template>
  <div class="explorer_page_header metadata">
    <md-card style="padding: 2rem; margin: 2rem; z-index: 10">
      <form class="form" @submit.prevent="submitSearch()" autocomplete="off">
        <div class="search_box_form">
          <div class="form__group search_box_form-item-1">
            <input
              type="text"
              ref="searchInput"
              class="form__input form__input--adjust"
              placeholder="Search"
              name="search"
              id="search"
              required
              v-model="searchWord"
            />
            <label htmlFor="search" class="form__label search_box_form_label">Search</label>
          </div>
          <div class="form__group search_box_form-item-2">
            <button type="submit" class="btn btn--primary btn--noradius search_box_form_btn">
              Search
            </button>
          </div>
        </div>
      </form>
      <!-- <div class="search-dropdown-menu_parent" v-if="!!suggestions.length">
        <ul class="search-dropdown-menu">
          <li v-for="(suggestion, index) in suggestions" :key="index" class="" @click.prevent="submitSearch(suggestion)">
            <a href="#">{{ suggestion }}</a>
          </li>
        </ul>
      </div> -->
      <div style="text-align: right" v-if="getTotal > 1">
        <strong>{{ getTotal }}</strong> results for "{{ searchWord }}"
      </div>
      <div style="text-align: right" v-else>
        Found {{ getTotal }} result for query "{{ searchWord }}"
      </div>
    </md-card>
    <md-tabs class="btn--primary dialog-box_content">
      <md-tab
        :md-label="'Articles (' + passTotal.getArticles + ')'"
        @click.prevent="setResultsTabs('getArticles')"
      ></md-tab>
      <md-tab
        :md-label="'Samples (' + passTotal.getSamples + ')'"
        @click.prevent="setResultsTabs('getSamples')"
      ></md-tab>
      <md-tab
        :md-label="'Images (' + imageTotal + ')'"
        @click.prevent="setResultsTabs('getImages')"
      ></md-tab>
      <md-tab
        :md-label="'Charts (' + passTotal.getCharts + ')'"
        @click.prevent="setResultsTabs('getCharts')"
      ></md-tab>
      <md-tab
        :md-label="'Properties (' + passTotal.getMaterials + ')'"
        @click.prevent="setResultsTabs('getMaterials')"
      ></md-tab>
    </md-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const searchInput = ref<HTMLInputElement>();

// Computed properties
const searchWord = computed({
  get() {
    return store.getters['explorer/getSearchKeyword'];
  },
  async set(payload: string) {
    await store.commit('explorer/setSearchKeyword', payload);
  },
});

const searchEnabled = computed(() => store.getters['explorer/getSearching']);

const suggestions = computed(() => store.getters['explorer/results/getSuggestions']);

const enableAutosuggest = computed(() => store.getters['explorer/getAutosuggest']);

const resultsTab = computed(() => store.getters['explorer/getResultsTab']);

const passTotal = computed(() => store.getters['explorer/results/getTotalGroupings']);

const getTotal = computed(() => store.getters['explorer/results/getTotal']);

const imageTotal = computed(() => {
  return passTotal.value?.getImages ?? 0;
});

// Methods
const setResultsTab = (tab: string) => store.commit('explorer/setResultsTab', tab);
const setSearching = () => store.commit('explorer/setSearching');
const setSearchKeyword = (keyword: string) => store.commit('explorer/setSearchKeyword', keyword);
const setAutosuggest = (suggestions: string[]) =>
  store.commit('explorer/results/setAutosuggest', suggestions);

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

const setResultsTabs = (payload: string) => {
  return setResultsTab(payload);
};

defineOptions({
  name: 'SearchHeader',
});
</script>

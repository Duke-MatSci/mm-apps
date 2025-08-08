<template>
  <div class="gallery">
    <spinner :loading="getIsloading" text="Loading..." v-if="getIsloading" />
    <div class="utility-roverflow explorer_page-results metadata" v-else>
      <!-- Articles -->
      <div v-if="resultsTab === 'getArticles'" class="grid_explorer-fullrow" ref="articlesRef">
        <div
          v-for="(result, index) in getArticles"
          :key="index"
          class="btn--animated md-card gallery-item results_card u--font-emph-900"
        >
          <md-card-header style="padding: 0px">
            <router-link
              @click="fixUriBeforeRouting(result.identifier, 'http://dx.doi.org/')"
              to="#"
              class="results_card-title"
            >
              <div>{{ result.label }}</div>
            </router-link>
            <div>
              <div class="results_card-type">Articles</div>
              <div class="md-body-1 results_card-description">
                {{ result.identifier }}
              </div>
            </div>
          </md-card-header>
        </div>
      </div>

      <!-- Samples -->
      <div class="grid_explorer-fullrow" v-if="resultsTab === 'getSamples'" ref="samplesRef">
        <div
          v-for="(result, index) in getSamples"
          :key="index"
          class="btn--animated md-card gallery-item results_card u--font-emph-900"
          ref="sampleRef"
        >
          <md-card-header style="padding: 0px">
            <md-avatar v-if="result.thumbnail">
              <img
                :src="baseUrl + '/api/files/' + result.thumbnail.split('=')[1]"
                :alt="result.label"
                v-if="result.thumbnail"
              />
            </md-avatar>

            <router-link
              @click="fixUriBeforeRouting(result.identifier, 'http://materialsmine.org/sample/')"
              to="#"
              class="results_card-title"
            >
              <div>{{ result.label }}</div>
            </router-link>
            <div>
              <div class="results_card-type">Samples</div>
              <div class="md-body-1 results_card-description" v-if="result.description">
                {{ reduceDescription(result.description) }}
              </div>
              <div class="md-body-1 results_card-description" v-else-if="result.identifier">
                {{ result.identifier }}
              </div>
            </div>
          </md-card-header>
        </div>
      </div>

      <!-- Charts -->
      <div class="grid_explorer-boxes" v-if="resultsTab === 'getCharts'" ref="chartsRef">
        <div
          v-for="(result, index) in getCharts"
          :key="index"
          class="btn--animated md-card gallery-item results_card u--font-emph-900"
        >
          <div class="utility-gridicon_explorer" v-if="resultsTab === 'getCharts'">
            <div @click.prevent="bookmark(result.name, true)" v-if="result.bookmark">
              <md-icon>bookmark</md-icon>
            </div>
            <div @click.prevent="bookmark(result.name, false)" v-else>
              <md-icon>bookmark_border</md-icon>
            </div>
          </div>

          <md-card-media-cover md-solid>
            <md-card-media md-ratio="4:3" v-if="result.thumbnail">
              <img
                :src="baseUrl + '/api/knowledge/images?uri=' + result.thumbnail"
                :alt="result.label"
                v-if="result.thumbnail"
              />
            </md-card-media>
            <md-icon v-else class="md-size-5x"> image </md-icon>
          </md-card-media-cover>

          <md-card-header style="padding: 0px">
            <router-link
              @click="fixUriBeforeRouting(result.identifier, 'http://nanomine.org/viz/')"
              to="#"
              class="results_card-title"
            >
              <div>{{ result.label }}</div>
            </router-link>
          </md-card-header>
        </div>
      </div>

      <!-- Images -->
      <div class="grid_explorer-boxes" v-if="resultsTab === 'getImages'" ref="imagesRef">
        <div
          v-for="(result, index) in getImages"
          :key="index"
          class="btn--animated md-card gallery-item results_card u--font-emph-900"
        >
          <md-card-media-cover md-solid>
            <md-card-media md-ratio="4:3" v-if="result.file">
              <img :src="baseUrl + result.file" :alt="result.label" v-if="result.metaData.title" />
            </md-card-media>
            <md-icon v-else class="md-size-5x"> image </md-icon>
          </md-card-media-cover>

          <md-card-header style="padding: 0px">
            <router-link
              @click="fixUriBeforeRouting(result.metaData.id, result.file)"
              to="#"
              class="results_card-title"
            >
              <div>{{ result.description || 'Image' }}</div>
            </router-link>
          </md-card-header>
        </div>
      </div>

      <!-- Materials -->
      <div class="grid_explorer-fullrow" v-if="resultsTab === 'getMaterials'" ref="materialsRef">
        <div
          v-for="({ label }, index) in getMaterials"
          :key="index"
          class="btn--animated md-card gallery-item results_card u--font-emph-900"
        >
          <md-card-header style="padding: 0px">
            <router-link @click.prevent="loadProperties(label)" to="#" class="results_card-title">
              <div>{{ label }}</div>
            </router-link>
            <div>
              <div class="results_card-type">Materials</div>
            </div>
          </md-card-header>
        </div>
      </div>

      <!-- New -->
      <!-- <div :class="(resultsTab =='getImages' || resultsTab== 'getCharts') ? 'grid_explorer-boxes' : 'grid_explorer-fullrow'">
        <div v-for="(result, index) in getArticles"
          :key="index"
          class="btn--animated md-card gallery-item results_card">

          <div class="utility-gridicon_explorer" v-if="resultsTab === 'getCharts'">
            <div
              @click.prevent="bookmark(result.name, true)"
              v-if="result.bookmark"
            >
              <md-icon>bookmark</md-icon>
            </div>
            <div
              @click.prevent="bookmark(result.name, false)"
              v-else
            >
              <md-icon>bookmark_border</md-icon>
            </div>
          </div>

          <md-card-media-cover
            v-if="resultsTab=='getImages' || resultsTab== 'getCharts'"
            md-solid
          >
            <md-card-media md-ratio="4:3"  v-if="result.thumbnail">
              <img
                :src="getThumbnailUrl(result)"
                :alt="result.label"
                v-if="result.thumbnail"
              >
            </md-card-media>
            <md-icon v-else class="md-size-5x"> image </md-icon>
          </md-card-media-cover>

          <md-card-header style="padding:0px">
            <md-avatar v-if="resultsTab=='Samples' && result.thumbnail">
              <img
                :src="getThumbnailUrl(result)"
                :alt="result.label"
                v-if="result.thumbnail"
              >
            </md-avatar>
            <router-link @click="fixUriBeforeRouting(result.identifier)" to="#"
            class="results_card-title" v-if="resultsTab === 'getArticles'">
              <div >{{ result.label }}</div>
            </router-link>

            <router-link @click="fixUriBeforeRouting(result.identifier)" to="#"
            class="results_card-title" v-if="resultsTab === 'getSamples'">
              <div >{{ result.label }}</div>
            </router-link>

            <router-link :to="`/explorer/chart/view/${result.identifier}`"  class="results_card-title">
              <div >{{ result.label }}</div>
            </router-link>
            <div v-if="resultsTab !== 'getImages' && resultsTab !=='getCharts'">
              <div class="results_card-type">{{resultsTab}}</div>
              <div class="md-body-1 results_card-description" v-if="result.description" >
                  {{ reduceDescription(result.description) }}
              </div>
              <div class="md-body-1 results_card-description" v-else-if="result.identifier" >
                  {{ result.identifier }}
              </div>
            </div>
          </md-card-header>
        </div>
      </div> -->
      <!-- <pagination
        :cpage="page"
        :tpages="totalPages"
        @go-to-page="loadItems($event)"
      /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Spinner from '@/components/Spinner.vue';
import { useReduce } from '@/composables/useReduce';

const store = useStore();
const router = useRouter();
const { reduceDescription } = useReduce();

// Refs
const articlesRef = ref<HTMLElement>();
const samplesRef = ref<HTMLElement>();
const chartsRef = ref<HTMLElement>();
const imagesRef = ref<HTMLElement>();
const materialsRef = ref<HTMLElement>();
const sampleRef = ref<HTMLElement>();

// Reactive data
const baseUrl = ref(window.location.origin);

// Computed properties
const resultsTab = computed(() => store.getters['explorer/getResultsTab']);
const getArticles = computed(() => store.getters['explorer/results/getArticles']);
const getSamples = computed(() => store.getters['explorer/results/getSamples']);
const getImages = computed(() => store.getters['explorer/results/getImages']);
const getCharts = computed(() => store.getters['explorer/results/getCharts']);
const getMaterials = computed(() => store.getters['explorer/results/getMaterials']);
const getIsloading = computed(() => store.getters['explorer/results/getIsloading']);

// Component methods
const loadProperties = async (selectedValue: string) => {
  await store.dispatch('explorer/searchFacetFilterMaterials', selectedValue);
};

const fixUriBeforeRouting = (address: string, prefix: string) => {
  if (address && prefix) {
    const identifier = address.replace(prefix, '');
    if (resultsTab.value === 'getArticles') {
      return router.push(`/explorer/article/${identifier}`);
    } else if (resultsTab.value === 'getSamples') {
      return router.push(`/explorer/sample/${identifier}`);
    } else if (resultsTab.value === 'getCharts') {
      return router.push(`/explorer/chart/view/${encodeURIComponent(identifier)}`);
    } else if (resultsTab.value === 'getImages') {
      return router.push(`/explorer/images/${address}/${encodeURIComponent(prefix)}`);
    }
  }
};

// Placeholder for bookmark functionality
const bookmark = (name: string, isBookmarked: boolean) => {
  // Implementation would depend on bookmark store actions
  console.log('Bookmark:', name, isBookmarked);
};

defineOptions({
  name: 'search-results',
});
</script>

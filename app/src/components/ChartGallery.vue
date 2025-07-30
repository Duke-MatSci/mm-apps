<template>
  <div class="gallery">
    <div class="section_loader" v-if="loading">
      <spinner :loading="loading" text="Loading Charts" />
    </div>
    <div v-else>
      <div class="u_content__result">
        <!-- TODO TIME TO RESULT -->
        <span class="u_color utility-navfont" id="css-adjust-navfont">
          <strong v-if="otherArgs != null">{{ otherArgs }}</strong>
          <template v-if="isFavourite">
            <span v-if="totalFavorites === 0"> No favorite results </span>
            <span v-else-if="totalFavorites === 1"> 1 favorite result </span>
            <span v-else> About {{ totalFavorites }} favorite results </span>
          </template>
          <template v-else>
            <span v-if="total === 0"> No results </span>
            <span v-else-if="total === 1"> 1 result </span>
            <span v-else> About {{ total }} results </span>
          </template>
          ({{ (queryTimeMillis / 1000).toFixed(2) }} seconds)
        </span>
      </div>
      <template v-if="!!galleryChartItems && !!galleryChartItems.length">
        <div :class="isFavourite ? 'gallery-grid grid grid_col-3' : 'gallery-grid grid grid_col-5'">
          <MdCard
            v-for="(result, index) in galleryChartItems"
            :key="index"
            class="btn--animated gallery-item"
          >
            <div class="u_gridicon">
              <div @click.prevent="bookmark(result)" v-if="isAuth">
                <MdIcon>bookmark</MdIcon>
                <MdTooltip md-direction="top"> Add to Favorites </MdTooltip>
              </div>
              <!-- <div @click.prevent="bookmark(result.name, false)" v-else>
                <MdIcon>bookmark_border</MdIcon>
              </div> -->
              <div v-if="isAuth" @click.prevent="editChart(result)">
                <MdIcon>edit</MdIcon>
                <MdTooltip md-direction="top">Edit </MdTooltip>
              </div>
              <div
                v-if="isAuth && isAdmin"
                @click.prevent="renderDialog('Delete Chart?', 'delete', result, 80)"
              >
                <MdIcon>delete_outline</MdIcon>
              </div>
            </div>
            <router-link
              v-if="result.identifier"
              :to="{
                name: 'ChartView',
                params: { chartId: getChartId(result) },
              }"
            >
              <MdCardMediaCover md-solid>
                <MdCardMedia md-ratio="4:3">
                  <img
                    :src="baseUrl + result.thumbnail"
                    :alt="result.label"
                    v-if="result.thumbnail"
                  />
                  <img src="@/assets/img/rdf_flyer.svg" :alt="result.label" v-else />
                </MdCardMedia>
                <MdCardArea class="u_gridbg">
                  <MdCardHeader class="u_show_hide">
                    <span class="md-subheading">
                      <strong>{{ result.label }}</strong>
                    </span>
                    <span class="md-body-1">{{ reduceDescription(result.description, 15) }}</span>
                  </MdCardHeader>
                </MdCardArea>
              </MdCardMediaCover>
            </router-link>
          </MdCard>
        </div>
        <pagination :cpage="page" :tpages="totalPages" @go-to-page="loadPrevNextImage($event)" />
      </template>
      <div class="utility-roverflow u_centralize_text u_margin-top-med section_loader" v-else>
        <!-- <div class="u_display-flex spinner"></div> -->
        <h1 class="visualize_header-h1 u_margin-top-med">No Charts Exist...</h1>
      </div>
    </div>
    <AppDialog :active="dialogBoxActive" :minWidth="dialog.minWidth">
      <template v-slot:title>{{ dialog.title }}</template>
      <template v-slot:content>
        <div v-if="dialog.type == 'delete'">
          <MdContent v-if="dialog.chart">
            <div>
              This will permanently remove the chart
              <b>{{ dialog.chart.label }}</b>
            </div>
            with identifier <b>{{ dialog.chart.identifier }}</b>
          </MdContent>
        </div>
        <div v-if="dialog.type == 'missingChart'">
          <MdContent>
            <div>{{ formatText }}</div>
          </MdContent>
        </div>
        <div v-if="dialogLoading">
          <spinner :loading="dialogLoading" text="Deleting Chart" />
        </div>
      </template>
      <template v-slot:actions>
        <span v-if="dialog.type == 'delete' && dialog.chart">
          <MdButton @click.prevent="toggleDialogBox"> No, cancel </MdButton>
          <MdButton @click.prevent="deleteChart(dialog.chart)"> Yes, delete. </MdButton>
        </span>
        <MdButton v-else @click.prevent="toggleDialogBox">Close</MdButton>
      </template>
    </AppDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import spinner from '@/components/Spinner.vue';
import pagination from '@/components/explorer/Pagination.vue';
import AppDialog from '@/components/Dialog.vue';
// import defaultImg from '@/assets/img/rdf_flyer.svg';
import { toChartId } from '@/modules/vega-chart';
import { useReduce } from '@/composables/useReduce';
import { useExplorerQueryParams } from '@/composables/useExplorerQueryParams';

// Define props
interface Props {
  sender?: string;
  isFavourite?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  sender: 'Visualization Gallery',
  isFavourite: false,
});

// Setup composables
const store = useStore();
const route = useRoute();
const router = useRouter();
const { reduceDescription } = useReduce();
const { loadParams } = useExplorerQueryParams();

// Reactive data
const loading = ref(false);
const loadError = ref(false);
const otherArgs = ref(null);
const pageNumber = ref(1);
const baseUrl = ref(`${window.location.origin}/api/knowledge/images?uri=`);
const dialog = ref<{
  title: string;
  type?: string;
  minWidth?: number;
  chart?: any;
}>({
  title: 'Test',
});
const dialogLoading = ref(false);

// Computed properties
const dialogBoxActive = computed(() => store.getters.dialogBox);
const isAuth = computed(() => store.getters['auth/isAuthenticated']);
const isAdmin = computed(() => store.getters['auth/isAdmin']);
const items = computed(() => store.getters['explorer/gallery/items']);
const page = computed(() => store.getters['explorer/gallery/page']);
const total = computed(() => store.getters['explorer/gallery/total']);
const totalPages = computed(() => store.getters['explorer/gallery/totalPages']);
const queryTimeMillis = computed(() => store.getters['explorer/gallery/queryTimeMillis']);
const newChartExist = computed(() => store.getters['explorer/curation/getNewChartExist']);
const favoriteChartItems = computed(() => store.getters['explorer/gallery/favoriteChartItems']);
const totalFavorites = computed(() => store.getters['explorer/gallery/totalFavorites']);
const missingCharts = computed(() => store.getters['explorer/gallery/missingCharts']);

const galleryChartItems = computed(() => {
  if (!props.isFavourite) {
    return items.value;
  } else {
    return favoriteChartItems.value;
  }
});

const formatText = computed(() => {
  return formatMissingFavouriteText();
});

// Methods
const renderDialog = (title: string, type: string, result: any, minWidth: number) => {
  dialog.value = {
    title,
    type,
    minWidth,
    chart: result,
  };
  toggleDialogBox();
};

const deleteChart = async (chart: any, retry = false) => {
  try {
    if (!isAdmin.value) return; // temporary safeguard

    // Retry is a flag to determine if the function is called from retry action
    if (!retry) {
      dialogLoading.value = true;
    }
    await store.dispatch('explorer/curation/deleteEntityNanopub', chart.identifier);
    await store.dispatch('explorer/curation/deleteEntityES', {
      identifier: chart.identifier,
      type: 'charts',
    });
    await loadItems();
    if (!retry) {
      toggleDialogBox();
      dialogLoading.value = false;
    }
    return;
  } catch (error) {
    if (!retry) {
      toggleDialogBox();
      dialogLoading.value = false;
    }
    store.commit('setSnackbar', {
      message: error || 'Something went wrong',
      action: () => deleteChart(chart, true),
    });
  }
};

const editChart = (chart: any) => {
  return router.push(`/explorer/chart/editor/edit/${getChartId(chart)}`);
};

const bookmark = async (chart: any) => {
  await store.dispatch('explorer/gallery/bookmarkChart', { chart });
};

const localSearchMethod = async () => {
  await loadItems(pageNumber.value);
};

const loadItems = async (page = 1) => {
  try {
    loading.value = true;
    await store.dispatch('explorer/gallery/loadItems', { page });
    loading.value = false;
  } catch (error) {
    store.commit('setSnackbar', {
      message: error || 'Something went wrong',
      action: () => loadItems(page),
    });
    return (loading.value = false);
  }
};

const getChartId = (chart: any) => {
  return toChartId(chart.identifier);
};

const formatMissingFavouriteText = () => {
  const message = `${missingCharts.value.length} out of your favourite charts `;
  return missingCharts.value.length === 1
    ? `${message}is no longer available and has been removed from your favourite list.`
    : `${message}are no longer available and have been removed from your favourite list.`;
};

const checkAndRenderDialog = () => {
  if (!missingCharts.value.length) return null;
  else renderDialog('Missing Charts', 'missingChart', '', 80);
};

const loadFavorites = async () => {
  loading.value = true;
  if (!favoriteChartItems.value.length) {
    await store.dispatch('explorer/gallery/fetchFavoriteCharts', false);
  }
  loading.value = false;
  return checkAndRenderDialog();
};

const loadRegularCharts = async () => {
  const query = route.query;
  if (query?.page) {
    await loadParams(route.query);
  } else {
    await loadItems();
  }
};

const toggleDialogBox = () => {
  store.commit('setDialogBox');
};

const loadPrevNextImage = (event: any) => {
  // Handle pagination
  loadItems(event);
};

// Lifecycle
onMounted(async () => {
  if (props.isFavourite) {
    await loadFavorites();
  } else {
    return await loadRegularCharts();
  }
});

// Watchers
watch(newChartExist, () => {
  if (!props.isFavourite) {
    store.commit('explorer/curation/setNewChartExist', false);
    return loadItems();
  }
});

watch(dialogBoxActive, () => {
  if (dialogBoxActive.value === false && props.isFavourite) {
    store.commit('explorer/gallery/setMissingCharts', [], {
      root: true,
    });
  }
});

// Set app header info
store.commit('setAppHeaderInfo', {
  icon: '',
  name: props.sender,
});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

<template>
  <search-gallery
    :isEmpty="isEmpty"
    :totalItems="xmlFinder.totalItems || 0"
    :loading="loading"
    :error="!!error"
  >
    <template #search_input>
      <input
        type="text"
        ref="search_input"
        class="form__input form__input--flat"
        placeholder="Search XML"
        name="search"
        id="search"
        required
        v-model="searchWord"
      />
    </template>

    <template #filter_inputs>
      <div v-if="selectedFilters.includes('apprStatus')" class="u--margin-rightsm">
        <md-chip
          class="u--bg u_margin-bottom-small"
          md-deletable
          @md-delete="removeChip('apprStatus')"
        >
          Admin Approval Status: {{ apprStatus }}
        </md-chip>
      </div>

      <div v-if="selectedFilters.includes('curationState')" class="u--margin-rightsm">
        <md-chip
          class="u--bg u_margin-bottom-small"
          @md-delete="removeChip('curationState')"
          md-deletable
          >Curation State: {{ curationState }}</md-chip
        >
      </div>

      <div v-if="selectedFilters.includes('isNew')" class="u--margin-rightsm">
        <md-chip
          class="u--bg u_margin-bottom-small"
          @md-delete="removeChip('isNew')"
          md-deletable=""
          >is New: {{ isNew }}</md-chip
        >
      </div>

      <md-field v-if="selectedFilters.includes('user')" style="max-width: 100%">
        <label>Curating User</label>
        <md-input v-model="user"></md-input>
      </md-field>
      <md-field v-if="selectedFilters.includes('author')" style="max-width: 100%">
        <label>Author</label>
        <md-input v-model="author"></md-input>
      </md-field>
    </template>

    <template #action_buttons>
      <div class="form__field md-field">
        <select
          @change="(e) => selectFilters(e)"
          class="form__select"
          name="filterBy"
          id="filterBy"
        >
          <option value="" disabled selected>Filter by...</option>
          <option value="apprStatus::Approved">Admin Approval Status (Approved)</option>
          <option value="apprStatus::Not_Approved">Admin Approval Status (Not_Approved)</option>
          <option value="curationState::Edit">Editing State</option>
          <option value="curationState::Review">Reviewing State</option>
          <option value="curationState::Curated">Curated</option>
          <option value="author">Author</option>
          <option value="user">Curating User</option>
          <option value="isNew::Yes">New curation</option>
          <option value="isNew::No">Old Curation</option>
        </select>
      </div>
      <button
        type="submit"
        class="btn btn--primary btn--noradius search_box_form_btn mid-first-li display-text u--margin-pos"
        @click.prevent="submitSearch"
      >
        Search Xml
      </button>
      <button
        v-if="searchEnabled"
        type="submit"
        class="btn btn--primary btn--noradius search_box_form_btn mid-first-li display-text u--margin-pos"
        @click.prevent="customReset('XML')"
      >
        Clear Search
      </button>
    </template>

    <template #page_input>
      <input
        type="number"
        id="pagesize"
        class="u_width--xs utility-navfont"
        name="pagesize"
        v-model.lazy="pageSize"
        min="1"
        max="20"
      />
    </template>

    <template v-if="!!Object.keys(xmlFinder).length && !!xmlFinder.xmlData.length && !error">
      <md-card
        v-for="(xml, index) in xmlFinder.xmlData"
        :key="index"
        class="btn--animated gallery-item"
      >
        <div class="u_gridicon">
          <div
            v-if="isAuthorized(xml.user)"
            @click.prevent="editCuration(xml.id, xml.isNewCuration)"
          >
            <md-tooltip md-direction="top">Edit Curation</md-tooltip>
            <md-icon>edit</md-icon>
          </div>
          <div
            v-if="isAuthorized(xml.user)"
            @click.prevent="duplicateCuration(xml.id, xml.isNewCuration)"
          >
            <md-tooltip md-direction="top">Duplicate Curation</md-tooltip>
            <md-icon>content_copy</md-icon>
          </div>
          <div
            v-if="isAuthorized(xml.user)"
            @click.prevent="openDialogBox(xml.id, xml.isNewCuration)"
          >
            <md-tooltip md-direction="top">Delete Curation</md-tooltip>
            <md-icon>delete</md-icon>
          </div>
        </div>
        <router-link
          :to="{
            name: 'XmlVisualizer',
            params: { id: xml.id },
            query: { isNewCuration: xml.isNewCuration },
          }"
        >
          <md-card-media-cover md-solid>
            <md-card-media md-ratio="4:3">
              <md-icon class="explorer_page-nav-card_icon u_margin-top-small">code_off</md-icon>
            </md-card-media>
            <md-card-area class="u_gridbg">
              <md-card-header class="u_show_hide">
                <span class="md-subheading">
                  <strong>{{ xml.title || xml.id || '' }}</strong>
                </span>
                <span class="md-body-1">Click to view</span>
              </md-card-header>
            </md-card-area>
          </md-card-media-cover>
        </router-link>
      </md-card>
    </template>

    <!-- Dialog Box -->
    <dialog-box v-if="dialogBoxActive" :minWidth="40" :active="dialogBoxActive">
      <template v-slot:title>Delete Curation</template>
      <template v-slot:content
        >Are you sure? This action would permanently remove this curation from our server.</template
      >
      <template v-slot:actions>
        <md-button @click.prevent="closeDialogBox">Cancel</md-button>
        <md-button @click.prevent="confirmAction">Delete</md-button>
      </template>
    </dialog-box>

    <template #pagination>
      <pagination
        v-if="xmlFinder && xmlFinder.xmlData"
        :cpage="pageNumber"
        :tpages="xmlFinder.totalPages || 1"
        @go-to-page="loadPrevNextImage($event)"
      />
    </template>

    <template #errorMessage>{{
      !!error ? 'Cannot Load Xml List' : 'Sorry! No Xml Found'
    }}</template>
  </search-gallery>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import Pagination from '@/components/explorer/Pagination.vue';
import { XML_FINDER } from '@/modules/gql/xml-gql';
import { useExplorerQueryParams } from '@/composables/useExplorerQueryParams';
import SearchGallery from '@/components/XmlSearchUtil.vue';
import DialogBox from '@/components/Dialog.vue';

// Component name for debugging
defineOptions({
  name: 'XmlGallery',
});

// Composables
const store = useStore();
const route = useRoute();
const router = useRouter();
const { loadParams, updateParamsAndCall, resetSearch } = useExplorerQueryParams();

// Reactive data
const baseUrl = ref(window.location.origin);
const renderText = ref('Showing all XML');
const xmlFinder = ref([] as any);
const pageNumber = ref(1);
const pageSize = ref(20);
const searchEnabled = ref(false);
const searchWord = ref('');
const selectedFilters = ref([] as string[]);
const apprStatus = ref(null as string | null);
const curationState = ref(null as string | null);
const user = ref(null as string | null);
const author = ref(null as string | null);
const isNew = ref(null as string | null);
const filterParams = ref({} as any);
const error = ref(null as any);
const dialogBoxAction = ref(null as any);
const loading = ref(false);

// Computed properties
const isAuth = computed(() => store.getters['auth/isAuthenticated']);
const isAdmin = computed(() => store.getters['auth/isAdmin']);
const userId = computed(() => store.getters['auth/userId']);
const dialogBoxActive = computed(() => store.getters['dialogBox']);

const isEmpty = computed(() => {
  if (
    xmlFinder.value.length === 0 ||
    !Object.keys(xmlFinder.value).length ||
    xmlFinder.value.totalItems === 0
  ) {
    return true;
  }
  return false;
});

const filtersActive = computed(() => {
  return (
    !!apprStatus.value || !!curationState.value || !!user.value || !!isNew.value || !!author.value
  );
});

// Apollo query
const {
  result: xmlFinderResult,
  loading: xmlFinderLoading,
  error: xmlFinderError,
} = useQuery(
  XML_FINDER,
  computed(() => ({
    input: {
      pageNumber: pageNumber.value,
      pageSize: parseInt(String(pageSize.value)),
      filter: { param: route.query?.q, ...filterParams.value },
    },
  })),
  () => ({
    fetchPolicy: 'cache-first',
  })
);

// Watch for query results
watch(xmlFinderResult, (newValue) => {
  if (newValue) {
    xmlFinder.value = newValue.xmlFinder || [];
    error.value = null;
  }
});

// Watch for loading states
watch(xmlFinderLoading, (newValue) => {
  loading.value = newValue;
});

// Watch for errors
watch(xmlFinderError, (newValue) => {
  if (newValue) {
    if (newValue.networkError) {
      const err = newValue.networkError as any;
      error.value = `Network Error: ${err?.response?.status} ${err?.response?.statusText}`;
    } else if (newValue.graphQLErrors) {
      error.value = newValue.graphQLErrors;
    }
    store.commit('setSnackbar', {
      message: error.value,
      duration: 10000,
    });
  }
});

// Methods
const toggleDialogBox = () => store.commit('setDialogBox');

const closeDialogBox = () => {
  if (dialogBoxActive.value) {
    toggleDialogBox();
  }
  dialogBoxAction.value = null;
};

const openDialogBox = (id: string, isNew: boolean, func: any = null) => {
  if (!id) return;
  dialogBoxAction.value = !func ? () => deleteXmlCuration(id, isNew) : func;
  if (!dialogBoxActive.value) {
    toggleDialogBox();
  }
};

const confirmAction = () => {
  if (dialogBoxAction.value) {
    dialogBoxAction.value();
    closeDialogBox();
  }
};

const isAuthorized = (xmlUser: string) => {
  return isAuth.value && (xmlUser === userId.value || isAdmin.value);
};

const localSearchMethod = async () => {
  // TODO @aswallace: Update to user query params instead
  const filterParamsObj = {
    isNewCuration: selectedFilters.value.includes('isNew') ? isNew.value === 'Yes' : null,
    status: apprStatus.value,
    curationState: curationState.value,
    user: user.value,
    author: author.value,
  };
  for (const key in filterParamsObj) {
    if (filterParamsObj[key as keyof typeof filterParamsObj] === null) {
      delete filterParamsObj[key as keyof typeof filterParamsObj];
    }
  }
  filterParams.value = filterParamsObj;
  // The Apollo query will automatically refetch with the new variables
};

const submitSearch = async () => {
  if (!searchWord.value && !filtersActive.value) {
    return store.commit('setSnackbar', {
      message: 'Enter a XML sample file name or select a filter type',
      duration: 10000,
    });
  }
  error.value = null;
  searchEnabled.value = !!searchWord.value || !!filtersActive.value;
  pageNumber.value = 1;
  return await updateParamsAndCall(true);
};

const customReset = async (type: string) => {
  apprStatus.value = null;
  curationState.value = null;
  user.value = null;
  isNew.value = null;
  author.value = null;
  selectedFilters.value = [];
  filterParams.value = {};
  error.value = null;
  await resetSearch(type);
};

const editCuration = (id: string, isNew: boolean) => {
  router.push({
    name: 'EditXmlCuration',
    query: { isNew, id },
  });
};

const selectFilters = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  const value = target.value;
  const arrValue = value.split('::');
  if (!selectedFilters.value.includes(arrValue[0])) {
    selectedFilters.value.push(arrValue[0]);
  }
  if (arrValue[0] === 'apprStatus') apprStatus.value = arrValue[1];
  if (arrValue[0] === 'curationState') curationState.value = arrValue[1];
  if (arrValue[0] === 'user') user.value = arrValue[1];
  if (arrValue[0] === 'author') author.value = arrValue[1];
  if (arrValue[0] === 'isNew') isNew.value = arrValue[1];
  target.value = '';
};

const removeChip = (str: string) => {
  const index = selectedFilters.value.indexOf(str);
  if (index < 0) return;
  selectedFilters.value.splice(index, 1); // 2nd parameter means remove one item only
  if (str === 'apprStatus') apprStatus.value = null;
  if (str === 'curationState') curationState.value = null;
  if (str === 'user') user.value = null;
  if (str === 'author') author.value = null;
  if (str === 'isNew') isNew.value = null;
};

const deleteXmlCuration = async (id: string, isNew: boolean | null = null) => {
  if (id && isNew !== null) {
    await store.dispatch('explorer/curation/deleteCuration', {
      xmlId: id,
      isNew: isNew,
    });
    // The Apollo query will automatically refetch
  }
};

const duplicateCuration = async (id: string, isNew: boolean) => {
  const response = await store.dispatch('explorer/duplicateXml', {
    id,
    isNew,
  });
  if (response?.id) {
    editCuration(response.id, response.isNew);
  }
};

const loadPrevNextImage = (page: number) => {
  pageNumber.value = page;
  // The Apollo query will automatically refetch with the new page number
};

// Lifecycle
onMounted(() => {
  const query = route.query;
  if (query?.page || query?.size || query?.q) {
    return loadParams(route.query);
  }
});
</script>

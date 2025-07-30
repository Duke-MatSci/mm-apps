<template>
  <div class="datasets">
    <md-card style="width: 100%">
      <md-card-header class="dataset-header md-layout md-alignment-top-space-between">
        <span class="md-layout-item">
          <md-button class="md-primary md-raised md-icon-button" @click="toggleDatasetHide">
            <md-icon v-if="!datasetHideSelector">expand_more</md-icon>
            <md-icon v-else>expand_less</md-icon>
          </md-button>
          <md-button
            v-if="auth && auth.isLoggedIn()"
            class="md-primary md-raised md-icon-button"
            @click="toggleDatasetCard"
          >
            <md-icon>library_add</md-icon>
          </md-button>
          <md-button
            v-if="datasetsHeaderInfoIcon"
            class="md-primary md-raised md-icon-button"
            @click="datasetInfoDialog()"
          >
            <md-icon>info</md-icon>
          </md-button>
          {{ datasetsHeaderTitle }}
        </span>
        <span class="md-layout-item" style="width: 50%" v-show="datasetSelected !== null">{{
          headerDOI
        }}</span>
      </md-card-header>
      <md-card v-if="addDatasetDialogActive">
        <md-field>
          <label>Enter a comment to describe this dataset as uniquely as possible</label>
          <md-input v-model="addDatasetComment"></md-input>
        </md-field>
        <md-button
          @click="
            () => {
              addDatasetDialogActive = false;
              addDatasetComment = '';
            }
          "
          small
          >Cancel</md-button
        >
        <md-button @click="addDatasetSave" small color="primary" class="white--text"
          >Save</md-button
        >
      </md-card>

      <md-table
        v-model="displayDatasets"
        v-show="!datasetHideSelector"
        md-sort="seq"
        md-sort-order="asc"
        md-card
        md-fixed-header
      >
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 v-if="mineOnlyAlways" class="md-title">Datasets you've created</h1>
          </div>
          <div v-if="auth && auth.isLoggedIn() && !mineOnlyAlways">
            <md-checkbox v-model="showMineOnly" class="md-primary">Show mine only</md-checkbox>
          </div>
          <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="Filter datasets" v-model="datasetSearch"></md-input>
          </md-field>
        </md-table-toolbar>

        <md-table-empty-state
          md-label="No data available"
          :md-description="`Your search for '${datasetSearch}' returned no results.`"
        ></md-table-empty-state>

        <template #md-table-row="{ item }">
          <md-table-row @click="() => datasetClick(item)" :key="item.seq">
            <md-table-cell md-label="ID" md-sort-by="seq" md-numeric>{{ item.seq }}</md-table-cell>
            <md-table-cell md-label="DOI" md-sort-by="doi">{{ item.doi }}</md-table-cell>
            <md-table-cell md-label="Title" md-sort-by="title">{{ item.title }}</md-table-cell>
            <md-table-cell md-label="Comment" md-sort-by="datasetComment">{{
              item.datasetComment
            }}</md-table-cell>
          </md-table-row>
        </template>
      </md-table>
    </md-card>
    <dialog-box :active="dialogBoxActive">
      <template v-slot:title>{{ dialog.title }}</template>
      <template v-slot:content>{{ dialog.content }}</template>
      <template v-slot:actions>
        <md-button @click.prevent="toggleDialogBox">Close</md-button>
      </template>
    </dialog-box>
    <!--
    Dataset Info Dialog
    -->
    <dialog-box v-if="datasetInfoDialogActive">
      <template v-slot:title>Dataset Information</template>
      <template v-slot:content>
        <md-list class="md-double-line">
          <md-list-item v-for="(item, index) in datasetDialogInfo.items" :key="index">
            <v-subheader v-if="item.header" :key="item.header">
              {{ item.header }}
            </v-subheader>
            <md-divider v-else-if="item.divider" :key="index"></md-divider>
            <div v-else :key="item.title" class="md-list-item-text">
              <span v-html="item.title"></span>
              <span v-html="item.subtitle"></span>
            </div>
          </md-list-item>
        </md-list>
      </template>
      <template v-slot:actions>
        <md-button
          @click="
            () => {
              datasetInfoDialogActive = false;
            }
          "
        >
          <md-icon>close</md-icon>
        </md-button>
      </template>
    </dialog-box>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Dialog from '@/components/Dialog.vue';
import * as _ from 'lodash';

defineOptions({
  name: 'DatasetCreateOrSelect',
  components: { dialogBox: Dialog },
});

// Props
defineProps<{
  datasetOptions?: Record<string, any>;
  selectHeader?: string;
  selectedHandler?: ((selected: any) => void) | undefined;
}>();

// Data
const msg = ref('Hi');
const showMineOnly = ref(true);
const mineOnlyAlways = ref(false);
const addDatasetDialogActive = ref(false);
const addDatasetComment = ref('');
const datasetsError = ref(false);
const datasetsErrorMsg = ref('');
const datasetTransformed = ref({});
const datasetHideSelector = ref(true);
const datasetList = ref<any[]>([]);
const datasetSearch = ref('');
const displayDatasets = ref<any[]>([]);
const datasetSelected = ref<any | null>(null);
const datasetInfoDialogActive = ref(false);
const datasetDialogInfo = ref<any>({});
const dialogBoxActive = ref(false);
const dialog = ref<any>({});

// Mocked auth object
const auth = {
  getUserID: () => '0',
  getRunAsUser: () => false,
  isLoggedIn: () => false,
};

// Computed
const datasetsHeaderTitle = computed(() => {
  return datasetSelected.value
    ? 'Selected Dataset:'
    : defineProps<{ selectHeader?: string }>().selectHeader || 'Choose a dataset';
});
const datasetsHeaderInfoIcon = computed(() => !!datasetSelected.value);
const headerDOI = computed(() => {
  if (datasetSelected.value) {
    if (
      !datasetSelected.value.doi ||
      datasetSelected.value.doi.length < 1 ||
      datasetSelected.value.doi === 'unpublished-initial-create'
    ) {
      return datasetSelected.value.datasetComment;
    } else {
      return datasetSelected.value.doi;
    }
  }
  return null;
});

// Watchers
watch(
  () => defineProps<{ datasetOptions?: Record<string, any> }>().datasetOptions,
  (options) => {
    if (options) {
      overrideOptions(options);
    }
  }
);
watch(datasetSearch, () => datasetsFiltered());
watch(datasetList, () => datasetsFiltered());

// Lifecycle
import { onBeforeMount } from 'vue';
onBeforeMount(() => {
  getDatasets();
  overrideOptions(defineProps<{ datasetOptions?: Record<string, any> }>().datasetOptions || {});
  datasetsFiltered();
});

// Methods
function overrideOptions(datasetOptions: any) {
  mineOnlyAlways.value = false;
  if (datasetOptions.mineOnly === 'always') {
    mineOnlyAlways.value = true;
    showMineOnly.value = true;
  } else if (datasetOptions.mineOnly === 'true') {
    showMineOnly.value = true;
  } else {
    showMineOnly.value = false;
  }
}
function datasetInfoDialog() {
  datasetInfoDialogActive.value = true;
}
function toggleDatasetHide() {
  datasetHideSelector.value = !datasetHideSelector.value;
  datasetSelected.value = null;
  const props = defineProps<{ selectedHandler?: ((selected: any) => void) | undefined }>();
  if (props.selectedHandler && typeof props.selectedHandler === 'function') {
    props.selectedHandler(datasetSelected.value);
  }
}
function getDatasets() {
  fetch('/api/dataset')
    .then((resp) => resp.json())
    .then((data) => {
      if (data && data.data) {
        datasetList.value = data.data;
      }
    })
    .catch((err) => {
      datasetsError.value = err;
      if (auth.isLoggedIn()) {
        renderDialog('Datasets Error', 'Please try again later.');
      }
    });
}
function transformDataset(entry: any) {
  const transformed: Record<string, any> = {};
  _.keys(entry).forEach((k) => {
    if (k !== 'filesets' && k !== '__v' && k !== 'dttm_created' && k !== 'dttm_updated') {
      if (Array.isArray(entry[k])) {
        transformed[k] = entry[k].length > 0 ? entry[k].join('; ') : 'N/A';
      } else {
        transformed[k] = entry[k];
      }
      if (transformed[k] === null) {
        transformed[k] = 'N/A';
      }
    }
  });
  datasetDialogInfo.value = { items: [{ header: transformed.doi }] };
  _.keys(transformed).forEach((k) => {
    datasetDialogInfo.value.items.push({ title: k, subtitle: transformed[k] });
    datasetDialogInfo.value.items.push({ divider: true, inset: true });
  });
  return transformed;
}
function datasetClick(entry: any) {
  datasetSelected.value = entry;
  datasetTransformed.value = transformDataset(entry);
  datasetHideSelector.value = true;
  // filesetsList and Selected are not used in template, so omitted
  datasetsError.value = false;
  datasetsErrorMsg.value = '';
  const props = defineProps<{ selectedHandler?: ((selected: any) => void) | undefined }>();
  if (props.selectedHandler && typeof props.selectedHandler === 'function') {
    props.selectedHandler(datasetSelected.value);
  }
}
function toggleDatasetCard() {
  addDatasetDialogActive.value = !addDatasetDialogActive.value;
}
function addDatasetSave() {
  fetch('/api/dataset/create', {
    method: 'POST',
    body: JSON.stringify({
      dsInfo: {
        datasetComment: addDatasetComment.value,
        isPublic: false,
        ispublished: false,
      },
    }),
  })
    .then((resp) => resp.json())
    .then(() => {
      addDatasetComment.value = '';
      datasetsError.value = false;
      datasetsErrorMsg.value = '';
      addDatasetDialogActive.value = false;
      getDatasets();
    })
    .catch((err) => {
      datasetsError.value = err;
      renderDialog('Dataset Error', 'Please make sure you are logged in, or try again later.');
    });
}
function toggleDialogBox() {
  dialogBoxActive.value = !dialogBoxActive.value;
}
function renderDialog(title: string, content: string, closeHandler?: () => void) {
  dialog.value = { title, content };
  toggleDialogBox();
}
function datasetsFiltered() {
  const userID = auth.getUserID();
  const runAsUser = auth.getRunAsUser();
  const filteredDatasets = datasetList.value.filter((i) => {
    if (showMineOnly.value) {
      return i.userID && (i.userID === userID || i.userID === runAsUser);
    } else {
      return true;
    }
  });
  if (datasetSearch.value) {
    displayDatasets.value = filteredDatasets.filter((i) => {
      return `${i.seq || ''}${i.doi || ''}${i.title || ''}${i.datasetComment || ''}`.includes(
        datasetSearch.value
      );
    });
  } else {
    displayDatasets.value = filteredDatasets;
  }
}
</script>

<style scoped>
.datasets {
}

.dataset-header {
  background-color: #03a9f4;
  color: #ffffff;
  font-size: 22px;
  font-weight: bold;
}
</style>

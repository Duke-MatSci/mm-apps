<template>
  <div class="section_teams">
    <div
      class="section_loader"
      v-if="selectedFacetFilterMaterials.parsedResponseContent === undefined"
    >
      <spinner :loading="true" :text="'Loading ' + selectedFacetFilterMaterialsValue" />
    </div>
    <div class="" v-else>
      <h1 class="visualize_header-h1 article_title u_centralize_text">
        {{ selectedFacetFilterMaterialsValue }}
      </h1>
      <h2 class="article_title u_centralize_text">MaterialsMine Knowledge Graph</h2>
      <div style="max-width: 99%">
        <div class="md-layout md-gutter" :class="`md-alignment-top-center`">
          <div class="md-layout-item md-size-50">
            <div>
              <h2 class="sample-page_header">Definition (MaterialsMine):</h2>
              <p>
                {{
                  selectedFacetFilterMaterials.parsedResponseDefinition[0]
                    ? selectedFacetFilterMaterials.parsedResponseDefinition[0]['definition']
                    : 'N/A'
                }}
              </p>
            </div>
            <div v-if="selectedFacetFilterMaterials" data-test="materialComponents">
              <h2 class="sample-page_header">Curated Research Articles:</h2>
              <p>
                There are currently
                <strong>
                  {{
                    selectedFacetFilterMaterials.parsedResponseCount[0]
                      ? selectedFacetFilterMaterials.parsedResponseCount[0]['SampleCount']
                      : 0
                  }}
                </strong>
                nanocomposite samples in the MaterialsMine knowledge graph that contain
                {{ selectedFacetFilterMaterialsValue }} as a reported attribute or property.
              </p>
              <p>
                These data have been curated from
                <strong>
                  {{
                    selectedFacetFilterMaterials.parsedResponseCount[0]
                      ? selectedFacetFilterMaterials.parsedResponseCount[0]['DOICount']
                      : 0
                  }}
                </strong>
                research works, listed below.
              </p>
              <div>
                <md-table
                  @md-selected="onSelect"
                  v-model="selectedFacetFilterMaterials.parsedResponseContent"
                  md-sort="Authors"
                  md-sort-order="asc"
                  md-card
                  style="margin-top: 1.2rem"
                >
                  <template #md-table-row="{ item }">
                    <md-table-row md-selectable="single">
                      <md-table-cell md-label="Authors" md-sort-by="Authors">
                        {{ item.Authors }}
                      </md-table-cell>
                      <md-table-cell md-label="DOI" md-sort-by="DOI">
                        {{ item.DOI }}
                      </md-table-cell>
                      <md-table-cell md-label="Journal" md-sort-by="Journal">
                        {{ item.Journal }}
                      </md-table-cell>
                      <md-table-cell md-label="Title" md-sort-by="Title">
                        {{ item.Title }}
                      </md-table-cell>
                    </md-table-row>
                  </template>
                </md-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Spinner from '@/components/Spinner.vue';

// Store and router
const store = useStore();
const router = useRouter();

// Computed properties
const selectedFacetFilterMaterials = computed(
  () => store.getters['explorer/getSelectedFacetFilterMaterials']
);
const selectedFacetFilterMaterialsValue = computed(
  () => store.getters['explorer/getSelectedFacetFilterMaterialsValue']
);

// Methods
const onSelect = (arg: any) => {
  router.push({
    path: `/explorer/article/${arg.DOI}`,
  });
};

// Lifecycle
onBeforeMount(() => {
  if (selectedFacetFilterMaterialsValue.value === null) {
    router.push('/explorer');
  }
});

// Component name for debugging
defineOptions({
  name: 'FacetFilterView',
  components: {
    Spinner,
  },
});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

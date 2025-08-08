<template>
  <div class="md-layout section_referenceContainer">
    <div class="md-layout-item md-size-100" v-if="references.length">
      <h4 v-if="referenceOpen" @click="refOpen">
        References <i class="material-icons icon-adjust">keyboard_arrow_up</i>
      </h4>
      <h4 v-else @click="refOpen">
        References <i class="material-icons icon-adjust">keyboard_arrow_down</i>
      </h4>
    </div>
    <div class="md-layout-item md-size-100" v-if="referenceOpen">
      <p v-for="ref in referenceList" :key="ref.title" class="reference">
        {{ ref.authors }}, {{ ref.title }}, <i>{{ ref.venue }}</i
        >, {{ ref.date }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

// Props
interface Props {
  references: any[];
  openOnLoad?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  openOnLoad: false,
});

// Store
const store = useStore();

// Reactive data
const referenceOpen = ref(false);

// Computed
const referenceList = computed(() => {
  return Array.from(props.references, (id) =>
    store.getters['nanomine/referenceContainer/getReferenceById'](id)
  ).filter(Boolean); // don't keep undefined or null references
});

// Methods
const refOpen = () => {
  referenceOpen.value = !referenceOpen.value;
};

// Lifecycle
onMounted(() => {
  referenceOpen.value = props.openOnLoad;
});

// Component name for debugging
defineOptions({
  name: 'ReferenceContainer',
});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

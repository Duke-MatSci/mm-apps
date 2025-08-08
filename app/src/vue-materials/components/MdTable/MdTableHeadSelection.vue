<template>
  <md-table-head class="md-table-cell-selection" v-if="selectableCount">
    <div class="md-table-cell-container">
      <md-checkbox :model="allSelected" :disabled="isDisabled" @change="onChange" />
    </div>
  </md-table-head>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import MdTableHead from './MdTableHead.vue';

// Inject MdTable context
const MdTable = inject('MdTable') as any;

// Computed properties
const selectableCount = computed(() => {
  return Object.keys(selectable.value).length;
});

const isDisabled = computed(() => {
  return !selectableCount.value;
});

const selectable = computed(() => {
  return MdTable.selectable;
});

const selectedItems = computed(() => {
  return MdTable.selectedItems;
});

const allSelected = computed(() => {
  if (selectableCount.value === 0) {
    return false;
  }

  return selectable.value.every((item: any) => selectedItems.value.includes(item));
});

// Methods
const onChange = (val: boolean) => {
  if (val) {
    MdTable.selectedItems = selectedItems.value.concat(
      selectable.value.filter((item: any) => !selectedItems.value.includes(item))
    );
  } else {
    MdTable.selectedItems = selectedItems.value.filter(
      (item: any) => !selectable.value.includes(item)
    );
  }
};

// Component name for debugging
defineOptions({
  name: 'MdTableHeadSelection',
  components: {
    MdTableHead,
  },
});
</script>

<template>
  <thead>
    <tr>
      <md-table-head-selection />
      <md-table-head v-for="(item, index) in MdTable.items" :key="index" v-bind="item" />
    </tr>
  </thead>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import MdTableHead from './MdTableHead.vue';
import MdTableHeadSelection from './MdTableHeadSelection.vue';

// Inject MdTable context
const MdTable = inject('MdTable') as any;

// Component name for debugging
defineOptions({
  name: 'MdTableThead',
  components: {
    MdTableHead,
    MdTableHeadSelection,
  },
});
</script>

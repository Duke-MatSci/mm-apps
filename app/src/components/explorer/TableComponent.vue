<template>
  <section class="u_width--max">
    <md-table
      v-model="paginatedData"
      :md-sort="currentSort"
      :md-sort-order="currentSortOrder"
      :md-sort-fn="customSort"
    >
      <md-table-empty-state md-label="No Data" :md-description="emptyState"> </md-table-empty-state>
      <md-table-row v-for="(item, index) in paginatedData" :key="index">
        <md-table-cell v-for="(val, k, i) in item" :md-label="k" :key="`${k}/${i}`" :md-sort-by="k">
          {{ val }}
        </md-table-cell>
      </md-table-row>
    </md-table>
    <Pagination
      v-if="paginate && totalPages > 1"
      :cpage="currentPage"
      :tpages="totalPages || 1"
      @go-to-page="paginateTable($event)"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import Pagination from '@/components/explorer/Pagination.vue';

// Props
interface Props {
  tableData?: any[];
  paginate?: boolean;
  pageSize?: number;
  emptyState?: string;
  sortBy?: string;
}

const props = withDefaults(defineProps<Props>(), {
  tableData: () => [],
  paginate: true,
  pageSize: 7,
  emptyState: 'No Viscoelastic Data Uploaded',
  sortBy: '',
});

// Reactive data
const paginatedData = ref<any[]>([]);
const currentPage = ref(1);
const currentSort = ref('');
const currentSortOrder = ref('asc');

// Computed properties
const totalPages = computed(() => {
  const total = props.tableData?.length ?? 0;
  return Math.ceil(total / props.pageSize);
});

// Methods
const paginateTable = (page: number = currentPage.value) => {
  const data = props.tableData ?? [];
  if (data.length <= props.pageSize) {
    paginatedData.value = data;
    return;
  }
  const end = props.pageSize * page;
  const start = props.pageSize * (page - 1);
  paginatedData.value = data.slice(start, end);
  currentPage.value = page;
};

const customSort = () => {
  if (!props.tableData) return;
  const sortedData = [...props.tableData].sort((a, b) => {
    const aVal = a[currentSort.value];
    const bVal = b[currentSort.value];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return aVal - bVal;
    }
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal);
    }
    return 0;
  });

  if (currentSortOrder.value !== 'asc') {
    sortedData.reverse();
  }

  // Update the table data with sorted data
  if (!props.paginate) {
    paginatedData.value = sortedData;
  } else {
    // Re-paginate with sorted data
    const end = props.pageSize * currentPage.value;
    const start = props.pageSize * (currentPage.value - 1);
    paginatedData.value = sortedData.slice(start, end);
  }
};

const setTable = () => {
  if (!props.paginate) {
    paginatedData.value = props.tableData ?? [];
    return;
  }
  paginateTable();
};

// Watchers
watch(
  () => props.tableData,
  () => {
    setTable();
  },
  { deep: true }
);

// Lifecycle
onMounted(() => {
  setTable();
  currentSort.value = props.sortBy;
});

// Component name for debugging
defineOptions({
  name: 'TableComponent',
});
</script>

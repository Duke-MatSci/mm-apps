<template>
  <div class="md-table-pagination">
    <template v-if="mdPageOptions !== false">
      <span class="md-table-pagination-label">{{ mdLabel }}</span>

      <md-field>
        <md-select v-model="currentPageSize" md-dense md-class="md-pagination-select">
          <md-option v-for="amount in mdPageOptions" :key="amount" :value="amount">{{
            amount
          }}</md-option>
        </md-select>
      </md-field>
    </template>

    <span
      >{{ (mdPage - 1) * currentPageSize + 1 }}–{{ Math.min(mdPage * currentPageSize, mdCount) }}
      {{ mdSeparator }} {{ mdCount }}</span
    >

    <md-button
      class="md-icon-button md-table-pagination-previous"
      @click="changePage(-1)"
      :disabled="mdPage === 1"
    >
      <md-icon>keyboard_arrow_left</md-icon>
    </md-button>

    <md-button
      class="md-icon-button md-table-pagination-next"
      @click="changePage(+1)"
      :disabled="mdPage === pageCount"
    >
      <md-icon>keyboard_arrow_right</md-icon>
    </md-button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject } from 'vue';

// Helper function
const getPageData = (data: any[], mdPage: number, mdPageSize: number) => {
  return data.slice((mdPage - 1) * mdPageSize, (mdPage - 1) * mdPageSize + mdPageSize);
};

// Props
interface Props {
  mdData?: any[] | any;
  mdPageOptions?: number[] | boolean;
  mdPaginatedData?: any[];
  mdPageSize?: number;
  mdUpdate?: (page: number, pageSize: number, sort: any, sortOrder: any) => boolean | void;
  mdLabel?: string;
  mdSeparator?: string;
}

const props = withDefaults(defineProps<Props>(), {
  mdPageOptions: () => [5, 10, 25, 50, 100],
  mdPaginatedData: () => [],
  mdPageSize: 10,
  mdUpdate: () => true,
  mdLabel: 'Rows per page:',
  mdSeparator: 'of',
});

// Emits
const emit = defineEmits<{
  'update:mdData': [value: any];
  'update:mdPaginatedData': [value: any[]];
}>();

// Inject MdTable context
const MdTable = inject('MdTable') as any;

// Reactive data
const mdPage = ref(0);
const mdCount = ref(0);
const currentPageSize = ref(0);

// Computed properties
const pageCount = computed(() => {
  return getPageCount();
});

const isExternalPagination = computed(() => {
  return props.mdData && props.mdData.mdData;
});

// Methods
const getPageCount = () => {
  return Math.ceil(mdCount.value / currentPageSize.value);
};

const setPage = (page: number, count: number) => {
  mdPage.value = count > 0 ? (page > 0 ? page : mdPage.value > 0 ? mdPage.value : 1) : 0;
  const pageCountValue = getPageCount();
  if (mdPage.value > pageCountValue) {
    mdPage.value = pageCountValue;
  }
};

const updatePage = () => {
  if (currentPageSize.value !== 0) {
    if (isExternalPagination.value) {
      mdCount.value = props.mdData.mdCount;
      setPage(props.mdData.mdPage, mdCount.value);
      emit('update:mdPaginatedData', props.mdData.mdData);
    } else {
      mdCount.value = props.mdData.length;
      setPage(mdPage.value, mdCount.value);
      if (mdPage.value > 0) {
        emit(
          'update:mdPaginatedData',
          getPageData(props.mdData, mdPage.value, currentPageSize.value)
        );
      } else {
        emit('update:mdPaginatedData', []);
      }
    }
  }
};

const changePage = (addOrSubtract: number) => {
  if (
    props.mdUpdate(
      mdPage.value + addOrSubtract,
      currentPageSize.value,
      MdTable.sort,
      MdTable.sortOrder
    ) !== false
  ) {
    mdPage.value = mdPage.value + addOrSubtract;
    if (!isExternalPagination.value) {
      emit(
        'update:mdPaginatedData',
        getPageData(props.mdData, mdPage.value, currentPageSize.value)
      );
    }
  }
};

// Watchers
watch(
  () => props.mdData,
  (newMdData) => {
    emit('update:mdData', newMdData);
    updatePage();
  },
  { immediate: true }
);

watch(
  () => props.mdPageSize,
  (newPageSize) => {
    currentPageSize.value = newPageSize;
    updatePage();
  },
  { immediate: true }
);

watch(
  currentPageSize,
  (newValue, oldValue) => {
    if (props.mdUpdate(mdPage.value, newValue, MdTable.sort, MdTable.sortOrder) !== false) {
      updatePage();
    }
  },
  { immediate: true }
);

// Component name for debugging
defineOptions({
  name: 'MdTablePagination',
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';

.md-table-pagination {
  height: 56px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid;
  font-size: 12px;

  .md-table-pagination-previous {
    margin-right: 2px;
    margin-left: 18px;
  }

  .md-field {
    width: 48px;
    min-width: 36px;
    margin: -16px 24px 0 32px;

    &:after,
    &:before {
      display: none;
    }

    .md-select-value {
      font-size: 13px;
    }
  }
}

.md-menu-content.md-pagination-select {
  max-width: 82px;
  min-width: 56px;
  margin-top: 5px;
}
</style>

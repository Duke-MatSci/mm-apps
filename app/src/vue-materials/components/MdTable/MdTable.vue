<template>
  <md-tag-switcher :md-tag="contentTag" class="md-table">
    <slot name="md-table-toolbar" />

    <keep-alive>
      <md-table-alternate-header v-if="$slots['md-table-alternate-header'] && selectedCount">
        <slot name="md-table-alternate-header" :count="selectedCount" />
      </md-table-alternate-header>
    </keep-alive>

    <div
      class="md-table-fixed-header"
      :class="headerClasses"
      :style="headerStyles"
      v-if="mdFixedHeader"
    >
      <div
        class="md-table-fixed-header-container"
        ref="fixedHeaderContainer"
        @scroll="setHeaderScroll"
      >
        <table :style="fixedHeaderTableStyles">
          <md-table-thead />
        </table>
      </div>
    </div>

    <md-content
      class="md-table-content md-scrollbar"
      :class="contentClasses"
      :style="contentStyles"
      @scroll="setScroll"
    >
      <table ref="contentTable">
        <md-table-thead :class="headerClasses" v-if="!mdFixedHeader && $slots['md-table-row']" />

        <tbody v-if="!$slots['md-table-row']">
          <slot />
        </tbody>

        <tbody v-else-if="value.length">
          <md-table-row-ghost
            v-for="(item, index) in value"
            :key="getRowId(item, mdModelId)"
            :md-id="getRowId(item, mdModelId)"
            :md-index="index"
            :md-item="item"
          >
            <slot name="md-table-row" :item="item" :index="index" />
          </md-table-row-ghost>
        </tbody>

        <tbody v-else-if="$slots['md-table-empty-state']">
          <tr>
            <td :colspan="headerCount">
              <slot name="md-table-empty-state" />
            </td>
          </tr>
        </tbody>
      </table>

      <slot name="md-table-pagination" />
    </md-content>

    <slot v-if="!hasValue && $slots['md-table-pagination']" />
  </md-tag-switcher>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, provide, useSlots } from 'vue';
import MdUuid from '../../core/utils/MdUuid';
import MdPropValidator from '../../core/utils/MdPropValidator';
import MdTableThead from './MdTableThead.vue';
import MdTableAlternateHeader from './MdTableAlternateHeader.vue';
import MdTableRow from './MdTableRow.vue';
import MdTableRowGhost from './MdTableRowGhost.vue';
import MdTableCellSelection from './MdTableCellSelection.vue';

// Props
interface Props {
  value?: any[] | any;
  mdModelId?: string;
  mdCard?: boolean;
  mdFixedHeader?: boolean;
  mdHeight?: number | string;
  mdSort?: string;
  mdSortOrder?: 'asc' | 'desc';
  mdSortFn?: (value: any[]) => any[];
  mdSelectedValue?: any[] | any;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => [],
  mdModelId: 'id',
  mdCard: false,
  mdFixedHeader: false,
  mdHeight: 400,
  mdSort: undefined,
  mdSortOrder: 'asc',
  mdSortFn: undefined,
  mdSelectedValue: undefined,
});

// Emits
const emit = defineEmits<{
  input: [value: any];
  'update:mdSelectedValue': [value: any];
  'md-selected': [value: any];
}>();

// Slots
const slots = useSlots();

// Validate mdSortOrder prop
if (props.mdSortOrder && !['asc', 'desc'].includes(props.mdSortOrder)) {
  const validator = MdPropValidator('md-sort-order', ['asc', 'desc']);
  validator.validator(props.mdSortOrder);
}

// Helper function
const getObjectAttribute = (object: any, key: string) => {
  let value = object;

  for (let attribute of key.split('.')) {
    value = value[attribute];
  }

  return value;
};

// Reactive data
const windowResizeObserver = ref<any>(null);
const fixedHeaderTableWidth = ref(0);
const fixedHeaderPadding = ref(0);
const hasContentScroll = ref(false);
const fixedHeaderContainer = ref<HTMLElement | null>(null);
const contentTable = ref<HTMLElement | null>(null);
const itemsUuidMap = ref(new WeakMap());

// MdTable context interface
interface MdTableContext {
  items: Record<string, any>;
  sort: string | null;
  sortOrder: string | null;
  singleSelection: any;
  selectedItems: any[];
  selectable: any[];
  fixedHeader: boolean | null;
  contentPadding: number | null;
  contentEl: HTMLElement | null;
  selectingMode: string | null;
  hasValue?: any;
  emitEvent?: (eventName: string, value: any) => void;
  sortTable?: () => void;
  manageItemSelection?: (item: any) => void;
  getModel?: () => any;
  getModelItem?: (index: number) => any;
}

// MdTable context
const MdTable = ref<MdTableContext>({
  items: {},
  sort: null,
  sortOrder: null,
  singleSelection: null,
  selectedItems: [],
  selectable: [],
  fixedHeader: null,
  contentPadding: null,
  contentEl: null,
  selectingMode: null,
});

// Computed properties
const contentTag = computed(() => {
  if (props.mdCard) {
    return 'md-card';
  }
  return 'md-content';
});

const headerCount = computed(() => {
  return Object.keys(MdTable.value.items).length;
});

const selectedCount = computed(() => {
  return MdTable.value.selectedItems.length;
});

const headerStyles = computed(() => {
  if (props.mdFixedHeader) {
    return `padding-right: ${fixedHeaderPadding.value}px`;
  }
  return '';
});

const hasValue = computed(() => {
  return props.value && (Array.isArray(props.value) ? props.value.length !== 0 : true);
});

const headerClasses = computed(() => {
  if ((props.mdFixedHeader && hasContentScroll.value) || !hasValue.value) {
    return 'md-table-fixed-header-active';
  }
  return '';
});

const contentStyles = computed(() => {
  if (props.mdFixedHeader) {
    const height = typeof props.mdHeight === 'number' ? `${props.mdHeight}px` : props.mdHeight;
    return `height: ${height};max-height: ${height}`;
  }
  return '';
});

const contentClasses = computed(() => {
  if (props.mdFixedHeader && Array.isArray(props.value) && props.value.length === 0) {
    return 'md-table-empty';
  }
  return '';
});

const fixedHeaderTableStyles = computed(() => {
  return {
    width: fixedHeaderTableWidth.value + 'px',
  };
});

// Methods
const isEmpty = (value: any) => {
  return !value || value.length === 0;
};

const emitEvent = (eventName: string, value: any) => {
  emit(eventName as any, value);
};

const getRowId = (item: any, propertyName: string) => {
  let id = item[propertyName];

  if (id) {
    return id;
  }

  id = itemsUuidMap.value.get(item);

  if (!id) {
    id = 'md-row-' + MdUuid();
    itemsUuidMap.value.set(item, id);
  }

  return id;
};

const setScroll = ($event: Event) => {
  requestAnimationFrame(() => {
    if (props.mdFixedHeader && fixedHeaderContainer.value) {
      fixedHeaderContainer.value.scrollLeft = ($event.target as HTMLElement).scrollLeft;
    }

    hasContentScroll.value = ($event.target as HTMLElement).scrollTop > 0;
  });
};

const setHeaderScroll = ($event: Event) => {
  requestAnimationFrame(() => {
    if (MdTable.value.contentEl) {
      MdTable.value.contentEl.scrollLeft = ($event.target as HTMLElement).scrollLeft;
    }
  });
};

const getContentEl = () => {
  return document.querySelector('.md-table-content') as HTMLElement;
};

const setContentEl = () => {
  MdTable.value.contentEl = getContentEl();
};

const setHeaderPadding = () => {
  setContentEl();

  const { contentEl } = MdTable.value;
  if (!contentEl) return;

  const tableEl = contentEl.childNodes[0] as HTMLElement;
  if (!tableEl) return;

  fixedHeaderPadding.value = contentEl.offsetWidth - tableEl.offsetWidth;
};

const getModel = () => {
  return props.value;
};

const getModelItem = (index: number) => {
  return Array.isArray(props.value) ? props.value[index] : null;
};

const manageItemSelection = (item: any) => {
  if (MdTable.value.selectedItems.includes(item)) {
    MdTable.value.selectedItems = MdTable.value.selectedItems.filter((target) => target !== item);
  } else {
    MdTable.value.selectedItems = MdTable.value.selectedItems.concat([item]);
  }
};

const sortTable = () => {
  if (Array.isArray(props.value)) {
    const sortFn =
      props.mdSortFn ||
      ((value: any[]) => {
        const sortBy = MdTable.value.sort;
        const isAsc = MdTable.value.sortOrder === 'asc';
        const multiplier = isAsc ? 1 : -1;

        const comparator = function (a: any, b: any) {
          const aAttr = getObjectAttribute(a, sortBy || '');
          const bAttr = getObjectAttribute(b, sortBy || '');

          if (aAttr === bAttr) {
            return 0;
          } else if (aAttr === null || aAttr === undefined || Number.isNaN(aAttr)) {
            return 1;
          } else if (bAttr === null || bAttr === undefined || Number.isNaN(bAttr)) {
            return -1;
          } else if (typeof aAttr === 'number' && typeof bAttr === 'number') {
            return (aAttr - bAttr) * multiplier;
          }
          return String(aAttr).localeCompare(String(bAttr)) * multiplier;
        };

        return value.sort(comparator);
      });

    emit('input', sortFn([...props.value]));
  }
};

const select = (val: any) => {
  emit('update:mdSelectedValue', val);
  emit('md-selected', val);
};

const syncSelectedValue = () => {
  nextTick().then(() => {
    if (MdTable.value.selectingMode === 'single') {
      MdTable.value.singleSelection = props.mdSelectedValue;
    } else if (MdTable.value.selectingMode === 'multiple') {
      MdTable.value.selectedItems = props.mdSelectedValue || [];
    }
  });
};

const setWidth = () => {
  if (props.mdFixedHeader && contentTable.value) {
    fixedHeaderTableWidth.value = contentTable.value.offsetWidth;
  }
};

// Add methods to MdTable context
MdTable.value.hasValue = hasValue;
MdTable.value.emitEvent = emitEvent;
MdTable.value.sortTable = sortTable;
MdTable.value.manageItemSelection = manageItemSelection;
MdTable.value.getModel = getModel;
MdTable.value.getModelItem = getModelItem;

// Provide MdTable context to children
provide('MdTable', MdTable);

// Watchers
watch(
  () => props.mdSort,
  (sort) => {
    MdTable.value.sort = sort || null;
  },
  { immediate: true }
);

watch(
  () => props.mdSortOrder,
  (sortOrder) => {
    MdTable.value.sortOrder = sortOrder || null;
  },
  { immediate: true }
);

watch(
  () => props.mdFixedHeader,
  (fixedHeader) => {
    MdTable.value.fixedHeader = fixedHeader || null;
  },
  { immediate: true }
);

watch(
  hasValue,
  (hasValue) => {
    MdTable.value.hasValue = hasValue;
  },
  { immediate: true }
);

watch(
  () => MdTable.value.selectedItems,
  (val, old) => {
    let changed = (() => {
      let isValEmpty = isEmpty(val);
      let isOldEmpty = isEmpty(old);
      let hasValues = isValEmpty && isOldEmpty;

      if (hasValues) {
        return false;
      } else if (!hasValues) {
        return val.length !== old.length ? true : !val.every((item, index) => item == old[index]);
      }

      return true;
    })();

    if (changed) {
      select(val);
    }
  }
);

watch(
  () => MdTable.value.singleSelection,
  (val, old) => {
    if (val != old) {
      select(val);
    }
  }
);

watch(
  () => props.mdSelectedValue,
  () => {
    syncSelectedValue();
  }
);

watch(
  () => props.value,
  () => {
    syncSelectedValue();
    setWidth();
  }
);

// Lifecycle hooks
onMounted(() => {
  if (props.mdSort) {
    sortTable();
  }

  syncSelectedValue();
  setContentEl();
  nextTick().then(setWidth);

  if (props.mdFixedHeader) {
    setHeaderPadding();
    // Replace MdResizeObserver with window resize listener
    const handleResize = () => setWidth();
    window.addEventListener('resize', handleResize);
    windowResizeObserver.value = {
      destroy: () => window.removeEventListener('resize', handleResize),
    };
  }
});

onBeforeUnmount(() => {
  if (windowResizeObserver.value) {
    windowResizeObserver.value.destroy();
  }
});

// Component name for debugging
defineOptions({
  name: 'MdTable',
  components: {
    MdTableAlternateHeader,
    MdTableThead,
    MdTableRow,
    MdTableRowGhost,
    MdTableCellSelection,
  },
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';

.md-table {
  display: flex;
  flex-flow: column wrap;
  overflow-x: auto;

  .md-table-fixed-header {
    position: relative;

    .md-table-fixed-header-container {
      -webkit-box-flex: 1;
      flex: 1;
      overflow-x: auto;

      &::-webkit-scrollbar,
      &::-webkit-scrollbar-thumb,
      &::-webkit-scrollbar-button {
        display: none;
      }
    }
  }

  .md-table-fixed-header-active {
    border-bottom: 1px solid;
  }

  .md-table-content {
    flex: 1;
    overflow-x: auto;
    transition: height 0.3s $md-transition-default-timing;
  }

  .md-table-empty {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    overflow: hidden;
  }
}
</style>

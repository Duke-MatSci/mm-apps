<template>
  <th
    class="md-table-head"
    :id="String(id)"
    :class="headClasses"
    :style="headStyles"
    @click="changeSort"
  >
    <div class="md-table-head-container" v-if="$slots.default">
      <div class="md-table-head-label">
        <slot />
      </div>
    </div>

    <md-ripple class="md-table-head-container" :md-disabled="!hasSort" v-else>
      <div class="md-table-head-label">
        <md-upward-icon class="md-table-sortable-icon" v-if="hasSort">arrow_upward</md-upward-icon>

        {{ label }}

        <md-tooltip v-if="tooltip">{{ tooltip }}</md-tooltip>
      </div>
    </md-ripple>
  </th>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, inject, useSlots } from 'vue';
import MdUpwardIcon from '../../core/icons/MdUpwardIcon.vue';
import MdResizeObserver from '../../core/utils/MdResizeObserver';

// Props
interface Props {
  mdNumeric?: boolean;
  numeric?: boolean;
  id?: string | number;
  label?: string;
  tooltip?: string;
  sortBy?: string;
}

const props = defineProps<Props>();

// Slots
const slots = useSlots();

// Inject MdTable context
const MdTable = inject('MdTable') as any;

// Reactive data
const width = ref<number | null>(null);
const windowResizeObserver = ref<any>(null);

// Computed properties
const hasSort = computed(() => {
  return MdTable.sort && props.sortBy;
});

const isSorted = computed(() => {
  if (MdTable.sort) {
    return MdTable.sort === props.sortBy;
  }
  return false;
});

const isDescSorted = computed(() => {
  return isSorted.value && MdTable.sortOrder === 'desc';
});

const isAscSorted = computed(() => {
  return isSorted.value && MdTable.sortOrder === 'asc';
});

const headStyles = computed(() => {
  return {
    width: width.value + 'px',
  };
});

const headClasses = computed(() => {
  return {
    'md-numeric': props.numeric || props.mdNumeric,
    'md-sortable': hasSort.value,
    'md-sorted': isSorted.value,
    'md-sorted-desc': isDescSorted.value,
  };
});

// Methods
const changeSort = () => {
  if (hasSort.value) {
    if (isAscSorted.value) {
      MdTable.sortOrder = 'desc';
    } else {
      MdTable.sortOrder = 'asc';
    }

    MdTable.sort = props.sortBy;
    MdTable.emitEvent('md-sorted', MdTable.sort);
    MdTable.emitEvent('update:mdSort', MdTable.sort);
    MdTable.emitEvent('update:mdSortOrder', MdTable.sortOrder);
    MdTable.sortTable();
  }
};

const getChildNodesBySelector = (el: Element, selector: string) => {
  return Array.from(el.childNodes).filter((node) => {
    return (
      node.nodeType === Node.ELEMENT_NODE &&
      (node as Element).classList &&
      (node as Element).classList.contains(selector)
    );
  });
};

const getNodeIndex = (nodes: NodeList, el: Element) => {
  return Array.from(nodes).indexOf(el);
};

const setWidth = () => {
  if (MdTable.fixedHeader) {
    const cellSelector = 'md-table-cell';
    const thEls = getChildNodesBySelector(
      document.querySelector('.md-table-head')?.parentNode as Element,
      'md-table-head'
    );
    const tdEls = MdTable.contentEl.querySelectorAll('tr:first-child .' + cellSelector);
    const nodeIndex = getNodeIndex(tdEls, document.querySelector('.md-table-head') as Element);

    if (tdEls[nodeIndex]) {
      width.value = tdEls[nodeIndex].offsetWidth;
    }
  }
};

// Lifecycle hooks
onMounted(() => {
  nextTick().then(setWidth);

  if (MdTable.fixedHeader) {
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
  name: 'MdTableHead',
  components: {
    MdUpwardIcon,
  },
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';

.md-table-head {
  padding: 0;
  position: relative;
  font-size: 12px;
  line-height: 16px;
  text-align: left;

  &:last-child:not(:first-child) .md-table-head-label {
    padding-right: 24px;
  }

  &.md-numeric {
    text-align: right;
  }

  &.md-sortable:first-of-type,
  &.md-table-cell-selection + .md-sortable {
    .md-table-sortable-icon {
      right: 8px;
      left: auto;
    }
  }

  .md-icon {
    $size: 16px;
    width: $size;
    height: $size;
    font-size: $size;

    &:not(.md-sortable-icon) {
      margin: 0 4px;
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.md-sortable {
  cursor: pointer;

  &:hover,
  &.md-sorted {
    .md-table-sortable-icon {
      opacity: 1;
    }
  }

  &.md-sorted-desc {
    .md-table-sortable-icon {
      transform: translateY(-50%) rotate(180deg);
    }
  }
}

.md-table-head-container {
  height: 56px;
  padding: 14px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.md-table-head-label {
  height: 28px;
  padding-right: 32px;
  padding-left: 24px;
  display: inline-block;
  position: relative;
  overflow: hidden;
  line-height: 28px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.md-table-sortable-icon {
  position: absolute;
  top: 50%;
  left: 0;
  transition: 0.3s $md-transition-default-timing;
  transform: translateY(-50%);
  opacity: 0;
  color: rgba(#000, 0.38);
}
</style>

<template>
  <td class="md-table-cell" :class="cellClasses">
    <div class="md-table-cell-container">
      <slot />
    </div>
  </td>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, inject } from 'vue';

// Props
interface Props {
  mdId?: string | number;
  mdLabel?: string;
  mdNumeric?: boolean;
  mdTooltip?: string;
  mdSortBy?: string;
}

const props = defineProps<Props>();

// Inject MdTable context
const MdTable = inject('MdTable') as any;

// Reactive data
const index = ref<number | null>(null);
const parentNode = ref<HTMLElement | null>(null);

// Computed properties
const cellClasses = computed(() => {
  return {
    'md-numeric': props.mdNumeric,
  };
});

// Methods
const setCellData = ($vm: any = null) => {
  const targetVm = $vm || { props, index: index.value };
  MdTable.items[targetVm.index] = {
    id: targetVm.props.mdId,
    label: targetVm.props.mdLabel,
    numeric: targetVm.props.mdNumeric,
    tooltip: targetVm.props.mdTooltip,
    sortBy: targetVm.props.mdSortBy,
  };
};

const updateAllCellData = () => {
  MdTable.items = {};

  if (!parentNode.value) return;

  const cells = Array.from(parentNode.value.childNodes).filter((node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return false;
    const element = node as Element;
    const isSelection = element.classList && element.classList.contains('md-table-cell-selection');
    const isTd = element.tagName && element.tagName.toLowerCase() === 'td';

    return isTd && !isSelection;
  });

  cells.forEach((cell, cellIndex) => {
    const element = cell as Element;
    const vm = (element as any).__vueParentComponent;

    if (vm) {
      vm.index = cellIndex;
      setCellData(vm);
    }
  });
};

// Watchers
watch(
  () => props.mdSortBy,
  () => {
    setCellData();
  }
);

watch(
  () => props.mdNumeric,
  () => {
    setCellData();
  }
);

watch(
  () => props.mdLabel,
  () => {
    setCellData();
  }
);

watch(
  () => props.mdTooltip,
  () => {
    setCellData();
  }
);

// Lifecycle hooks
onMounted(() => {
  const el = document.querySelector('.md-table-cell');
  if (el && el.parentNode) {
    parentNode.value = el.parentNode as HTMLElement;
  }
  updateAllCellData();
});

onBeforeUnmount(() => {
  const el = document.querySelector('.md-table-cell');
  if (el && el.parentNode) {
    const rowRemoved = el.parentNode !== null;
    if (rowRemoved) {
      return false;
    }
    updateAllCellData();
  }
});

// Component name for debugging
defineOptions({
  name: 'MdTableCell',
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';

.md-table-cell {
  height: 48px;
  position: relative;
  transition: 0.3s $md-transition-default-timing;
  font-size: 13px;
  line-height: 18px;

  &.md-numeric {
    text-align: right;
  }

  &:last-child .md-table-cell-container {
    padding-right: 24px;
  }
}

.md-table-cell-container {
  padding: 6px 32px 6px 24px;
}
</style>

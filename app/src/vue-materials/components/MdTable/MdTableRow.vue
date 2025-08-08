<template>
  <tr class="md-table-row" :class="rowClasses" @click="onClick">
    <md-table-cell-selection
      :value="isMultipleSelected"
      @input="(selected: boolean) => (selected ? addSelection() : removeSelection())"
      :md-disabled="mdDisabled"
      :md-selectable="mdSelectable === 'multiple'"
      :md-row-id="mdIndex"
      v-if="selectableCount"
    />
    <slot />
  </tr>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, inject } from 'vue';
import MdPropValidator from '../../core/utils/MdPropValidator';
import MdTableCellSelection from './MdTableCellSelection.vue';

// Props
interface Props {
  mdIndex?: number | string;
  mdId?: number | string;
  mdSelectable?: 'multiple' | 'single';
  mdDisabled?: boolean;
  mdAutoSelect?: boolean;
  mdItem?: any[] | any;
}

const props = defineProps<Props>();

// Inject MdTable context
const MdTable = inject('MdTable') as any;

// Reactive data
const index = ref<number | null>(null);

// Computed properties
const selectableCount = computed(() => {
  return MdTable.selectable.length;
});

const isMultipleSelected = computed(() => {
  return MdTable.selectedItems.includes(props.mdItem);
});

const isSingleSelected = computed(() => {
  return MdTable.singleSelection === props.mdItem;
});

const hasMultipleSelection = computed(() => {
  return MdTable.hasValue && props.mdSelectable === 'multiple';
});

const hasSingleSelection = computed(() => {
  return MdTable.hasValue && props.mdSelectable === 'single';
});

const rowClasses = computed(() => {
  if (MdTable.hasValue) {
    return {
      'md-has-selection': !props.mdDisabled && (props.mdAutoSelect || hasSingleSelection.value),
      'md-selected': isMultipleSelected.value,
      'md-selected-single': isSingleSelected.value,
    };
  }
  return {};
});

const isInSelectedItems = computed(() => {
  return MdTable.selectedItems.includes(props.mdItem);
});

// Methods
const onClick = () => {
  if (MdTable.hasValue && !props.mdDisabled) {
    if (hasMultipleSelection.value) {
      selectRowIfMultiple();
    } else if (hasSingleSelection.value) {
      selectRowIfSingle();
    }
  }
};

const toggleSelection = () => {
  MdTable.manageItemSelection(props.mdItem);
};

const addSelection = () => {
  if (!isMultipleSelected.value) {
    MdTable.selectedItems = MdTable.selectedItems.concat([props.mdItem]);
  }
};

const removeSelection = () => {
  if (isMultipleSelected.value) {
    MdTable.selectedItems = MdTable.selectedItems.filter((target: any) => target !== props.mdItem);
  }
};

const selectRowIfSingle = () => {
  if (MdTable.singleSelection === props.mdItem) {
    MdTable.singleSelection = null;
  } else {
    MdTable.singleSelection = props.mdItem;
  }
};

const selectRowIfMultiple = () => {
  if (props.mdAutoSelect) {
    toggleSelection();
  }
};

const addSelectableItem = () => {
  if (!hasMultipleSelection.value || props.mdDisabled) {
    return false;
  }

  if (MdTable.selectable.includes(props.mdItem)) {
    return false;
  }

  MdTable.selectable = MdTable.selectable.concat([props.mdItem]);
};

const removeSelectableItem = (target: any = props.mdItem) => {
  if (props.mdSelectable === 'multiple') {
    MdTable.selectable = MdTable.selectable.filter((item: any) => item !== target);
  }
};

// Watchers
watch(
  () => props.mdDisabled,
  () => {
    if (props.mdDisabled) {
      removeSelectableItem();
    } else {
      addSelectableItem();
    }
  }
);

watch(
  () => props.mdSelectable,
  () => {
    MdTable.selectingMode = props.mdSelectable;
  }
);

watch(
  () => props.mdItem,
  (after, before) => {
    removeSelectableItem(before);
    nextTick(addSelectableItem);
  }
);

// Lifecycle hooks
onMounted(() => {
  nextTick(() => {
    addSelectableItem();
    MdTable.selectingMode = props.mdSelectable;
  });
});

onBeforeUnmount(() => {
  removeSelectableItem();
});

// Component name for debugging
defineOptions({
  name: 'MdTableRow',
  components: {
    MdTableCellSelection,
  },
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';

.md-table-row {
  transition: 0.3s $md-transition-default-timing;
  transition-property: background-color, font-weight;
  will-change: background-color, font-weight;

  &.md-has-selection {
    cursor: pointer;
  }

  &.md-selected-single {
    font-weight: 500;
  }

  tbody & td {
    border-top: 1px solid;
  }
}
</style>

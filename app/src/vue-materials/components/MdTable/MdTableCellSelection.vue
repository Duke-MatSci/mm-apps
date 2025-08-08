<template>
  <td class="md-table-cell md-table-cell-selection" v-if="mdSelectable">
    <div class="md-table-cell-container">
      <md-checkbox
        v-model="isSelected"
        :disabled="!mdSelectable || mdDisabled"
        @change="onChange"
      />
    </div>
  </td>
</template>

<script setup lang="ts">
import { ref, watch, inject } from 'vue';

// Props
interface Props {
  value?: boolean;
  mdRowId?: number | string;
  mdSelectable?: boolean;
  mdDisabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: false,
  mdRowId: undefined,
  mdSelectable: false,
  mdDisabled: false,
});

// Emits
const emit = defineEmits<{
  input: [value: boolean];
}>();

// Inject MdTable context
const MdTable = inject('MdTable') as any;

// Reactive data
const isSelected = ref(false);

// Watchers
watch(
  () => props.value,
  (value) => {
    isSelected.value = value;
  },
  { immediate: true }
);

// Methods
const onChange = () => {
  emit('input', isSelected.value);
};

// Component name for debugging
defineOptions({
  name: 'MdTableCellSelection',
});
</script>

<style lang="scss">
.md-table-cell-selection {
  width: 66px;

  + th {
    .md-table-head-label {
      padding-left: 0;
    }
  }

  + td {
    .md-table-cell-container {
      padding-left: 0;
    }
  }

  .md-table-head-container,
  .md-table-cell-container,
  .md-table-head-label,
  .md-table-cell-label {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
  }

  .md-checkbox {
    margin: 0;

    .md-checkbox-container {
      width: 18px;
      min-width: 18px;
      height: 18px;

      &:after {
        top: -1px;
        left: 4px;
      }
    }
  }
}
</style>

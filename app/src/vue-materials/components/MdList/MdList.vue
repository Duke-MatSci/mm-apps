<template>
  <ul class="md-list" v-bind="$attrs">
    <slot />
  </ul>
</template>

<script setup lang="ts">
import { ref, provide, inject } from 'vue';
import { useMdTheme } from '../../core/MdTheme';

interface Props {
  mdExpandSingle?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mdExpandSingle: false,
});

const $mdActiveTheme = useMdTheme();

// MdList context for expandable items
const expandable = ref<any[]>([]);

const expandATab = (expandedListItem: any) => {
  if (props.mdExpandSingle && expandedListItem) {
    const otherExpandableListItems = expandable.value.filter((target) => {
      return target.id !== expandedListItem.id;
    });
    otherExpandableListItems.forEach((expandableListItem) => {
      expandableListItem.close();
    });
  }
};

const pushExpandable = (expandableListItem: any) => {
  if (!expandable.value.find((target) => target.id === expandableListItem.id)) {
    expandable.value.push(expandableListItem);
  }
};

const removeExpandable = (expandableListItem: any) => {
  const index = expandable.value.findIndex((target) => target.id === expandableListItem.id);
  if (index !== -1) {
    expandable.value.splice(index, 1);
  }
};

const MdList = {
  expandable,
  expandATab,
  pushExpandable,
  removeExpandable,
};

provide('MdList', MdList);

defineOptions({
  name: 'MdList',
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';
@import './theme.scss';

.md-list {
  margin: 0;
  padding: 8px 0;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  list-style: none;

  &.md-dense {
    padding: 4px 0;
  }

  .md-divider {
    margin-top: -1px;
  }

  .md-subheader {
    &.md-inset {
      padding-left: 72px;
    }
  }

  > .md-subheader:first-of-type {
    margin-top: -8px;
  }
}
</style>

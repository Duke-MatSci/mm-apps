<template>
  <div class="md-tab" :id="String(id)" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, ref, watch, onMounted, onBeforeUnmount } from 'vue';

interface Props {
  id?: string | number;
  href?: string | number;
  mdDisabled?: boolean;
  mdLabel?: string | number;
  mdIcon?: string;
  mdTemplateData?: Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => 'md-tab-' + Math.random().toString(36).substr(2, 9),
  mdTemplateData: () => ({}),
});

// Inject MdTabs from parent
const MdTabs = inject<any>('MdTabs');
const tabsId = inject<string>('MdTabsId');

const setTabData = () => {
  if (MdTabs) {
    MdTabs.addTab({
      id: props.id,
      label: props.mdLabel,
      icon: props.mdIcon,
      disabled: props.mdDisabled,
      hasContent: true,
      href: props.href,
    });
  }
};

const removeTabData = () => {
  if (MdTabs) {
    MdTabs.removeTab(props.id);
  }
};

watch(
  () => props,
  () => {
    if (MdTabs) {
      MdTabs.updateTab(props.id, {
        label: props.mdLabel,
        icon: props.mdIcon,
        disabled: props.mdDisabled,
      });
    }
  },
  { deep: true }
);

onMounted(() => {
  setTabData();
});

onBeforeUnmount(() => {
  removeTabData();
});

defineOptions({
  name: 'MdTab',
});
</script>

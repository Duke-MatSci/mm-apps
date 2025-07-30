<template>
  <div class="md-list-item-expand" :class="expandClasses">
    <md-list-item-content :md-disabled="isDisabled" @click="toggleExpand">
      <slot />

      <md-icon class="md-list-expand-icon">keyboard_arrow_down</md-icon>
    </md-list-item-content>

    <div class="md-list-expand" ref="listExpand" :style="expandStyles">
      <slot name="md-expand" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, inject } from 'vue';
import MdIcon from '../../MdIcon/MdIcon.vue';
import MdListItemContent from './MdListItemContent.vue';

interface Props {
  mdExpanded?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mdExpanded: false,
  disabled: false,
});

const emit = defineEmits<{
  'update:mdExpanded': [value: boolean];
  'md-expanded': [];
  'md-collapsed': [];
}>();

// Inject MdList from parent
const MdList = inject<any>('MdList');

// Refs
const listExpand = ref<HTMLElement>();

// Reactive data
const expandStyles = ref({});
const showContent = ref(false);

const isDisabled = computed(() => props.disabled);

const expandClasses = computed(() => {
  return {
    'md-active': showContent.value,
  };
});

// Methods
const getChildrenSize = () => {
  if (!listExpand.value) return 0;

  const expandEl = listExpand.value;
  let size = 0;

  Array.from(expandEl.children).forEach((child: any) => {
    size += child.offsetHeight;
  });

  return size;
};

const fetchStyle = () => {
  return new Promise<void>((resolve) => {
    nextTick(() => {
      if (showContent.value) {
        expandStyles.value = {
          height: 'auto',
          opacity: '1',
          transform: 'translate3D(0, 0, 0)',
        };
      } else {
        // Clear all inline styles to let CSS handle the collapsed state
        expandStyles.value = {};
      }

      resolve();
    });
  });
};

const toggleExpand = () => {
  // Change the state first, then apply styles
  showContent.value = !showContent.value;

  // Apply styles after state change
  fetchStyle();
};

const open = () => {
  if (showContent.value) {
    return false;
  }

  // Set the state immediately, then apply styles
  showContent.value = true;

  // Apply styles after state change
  fetchStyle();
};

const close = () => {
  if (!showContent.value) {
    return false;
  }

  // Set the state immediately, then apply styles
  showContent.value = false;

  // Apply styles after state change
  fetchStyle();
};

// Watchers
watch(
  () => props.mdExpanded,
  (newValue) => {
    if (newValue) {
      open();
    } else {
      close();
    }
  }
);

watch(showContent, (newValue) => {
  emit('update:mdExpanded', newValue);
  nextTick(() => {
    if (newValue) {
      emit('md-expanded');
    } else {
      emit('md-collapsed');
    }
  });

  if (newValue && MdList) {
    MdList.expandATab(componentRef);
  }
});

// Create a unique ID for this component
const componentId = Math.random().toString(36).substr(2, 9);
// Create a reference object for this component
const componentRef = { id: componentId, close };

// Lifecycle hooks
onMounted(() => {
  if (MdList) {
    MdList.pushExpandable(componentRef);
  }

  if (props.mdExpanded) {
    open();
  }
});

onBeforeUnmount(() => {
  if (MdList) {
    MdList.removeExpandable(componentRef);
  }
});

defineOptions({
  name: 'MdListItemExpand',
  components: {
    MdIcon,
    MdListItemContent,
  },
});
</script>

<style lang="scss">
@import '../../MdAnimation/variables.scss';

.md-list-item-expand {
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  transition: border 0.4s $md-transition-stand-timing;
  will-change: border;

  &.md-active {
    > .md-list-item-content > .md-list-expand-icon {
      perspective: 1000px;
      perspective-origin: 50% 50%;
      transform: rotateX(180deg);
    }

    .md-list-expand {
      opacity: 1;
      transform: translate3D(0, 0, 0);
    }
  }

  .md-list-expand {
    height: 0;
    opacity: 0;
    overflow: hidden;
    transform: translate3D(0, -24px, 0);
    transition: 0.4s $md-transition-stand-timing;
    transition-property: transform, opacity, height;
    will-change: transform, opacity, height;
  }

  .md-list-expand-icon {
    transition: transform 0.4s $md-transition-stand-timing;
    will-change: transform;
  }
}
</style>

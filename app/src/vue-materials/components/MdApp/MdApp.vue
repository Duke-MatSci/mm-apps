<template>
  <component :is="appComponent" v-bind="$attrs" :class="appClasses" :style="appStyles">
    <!-- Pass through named slots -->
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>

    <!-- Handle default slot children and organize them into appropriate named slots -->
    <template #md-app-toolbar>
      <slot name="md-app-toolbar" />
      <template v-for="child in toolbarChildren" :key="child.key">
        <component :is="child" />
      </template>
    </template>

    <template #md-app-content>
      <slot name="md-app-content" />
      <template v-for="child in contentChildren" :key="child.key">
        <component :is="child" />
      </template>
    </template>

    <template #md-app-drawer-left>
      <slot name="md-app-drawer-left" />
      <template v-for="child in leftDrawerChildren" :key="child.key">
        <component :is="child" />
      </template>
    </template>

    <template #md-app-drawer-right>
      <slot name="md-app-drawer-right" />
      <template v-for="child in rightDrawerChildren" :key="child.key">
        <component :is="child" />
      </template>
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, provide, useSlots, h, VNode } from 'vue';
import { useMdAppMixin } from './MdAppMixin';
import MdAppSideDrawer from './MdAppSideDrawer.vue';
import MdAppInternalDrawer from './MdAppInternalDrawer.vue';

// Props
interface Props {
  mdMode?: string;
  mdWaterfall?: boolean;
  mdScrollbar?: boolean;
  mdTheme?: string | boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mdMode: undefined,
  mdWaterfall: false,
  mdScrollbar: true,
  mdTheme: undefined,
});

// Use MdAppMixin
const { MdApp, appClasses, handleScroll } = useMdAppMixin(props);

// Provide MdApp context to children
provide('MdApp', MdApp);

// Get slots
const slots = useSlots();

// Helper functions
const normalizeTagName = (tagName: string) => {
  return tagName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

const isValidChild = (componentOptions: any) => {
  const componentTypes = ['md-app-toolbar', 'md-app-drawer', 'md-app-content'];
  return componentOptions && componentTypes.includes(normalizeTagName(componentOptions.tag));
};

const isRightDrawer = (propsData: any) => {
  if (!propsData) return false;
  return propsData.mdRight === '' || !!propsData.mdRight;
};

const shouldRenderSlot = (data: any, componentOptions: any) => {
  const componentTypes = ['md-app-toolbar', 'md-app-drawer', 'md-app-content'];
  return (data && componentTypes.includes(data.slot)) || isValidChild(componentOptions);
};

const generateAttrKeys = (attrs: any) => {
  return JSON.stringify({
    persistent: attrs && attrs['md-persistent'],
    permanent: attrs && attrs['md-permanent'],
  });
};

const hasInternalDrawer = (attrs: any) => {
  const mdPermanent = attrs && attrs['md-permanent'];
  return mdPermanent && (mdPermanent === 'clipped' || mdPermanent === 'card');
};

// Organize default slot children into appropriate categories
const defaultChildren = computed(() => {
  return slots.default?.() || [];
});

const toolbarChildren = computed(() => {
  return defaultChildren.value.filter((child: VNode) => {
    const componentName = (child as any).type?.name || '';
    const normalizedName = normalizeTagName(componentName);
    return normalizedName === 'md-app-toolbar';
  });
});

const contentChildren = computed(() => {
  return defaultChildren.value.filter((child: VNode) => {
    const componentName = (child as any).type?.name || '';
    const normalizedName = normalizeTagName(componentName);
    return normalizedName === 'md-app-content';
  });
});

const leftDrawerChildren = computed(() => {
  return defaultChildren.value.filter((child: VNode) => {
    const componentName = (child as any).type?.name || '';
    const normalizedName = normalizeTagName(componentName);
    return normalizedName === 'md-app-drawer' && !isRightDrawer((child as any).props);
  });
});

const rightDrawerChildren = computed(() => {
  return defaultChildren.value.filter((child: VNode) => {
    const componentName = (child as any).type?.name || '';
    const normalizedName = normalizeTagName(componentName);
    return normalizedName === 'md-app-drawer' && isRightDrawer((child as any).props);
  });
});

// Computed properties
const appComponent = computed(() => {
  // Check if we have internal drawer
  const children = defaultChildren.value;
  const drawers = children.filter((child: VNode) => {
    const componentName = (child as any).type?.name || '';
    const normalizedName = normalizeTagName(componentName);
    return (
      ['md-app-drawer', 'md-app-drawer-right', 'md-app-drawer-left'].indexOf(normalizedName) > -1
    );
  });

  for (const drawer of drawers) {
    if (drawer && hasInternalDrawer((drawer as any).props)) {
      return MdAppInternalDrawer;
    }
  }

  return MdAppSideDrawer;
});

const appStyles = computed(() => {
  return {
    ...(props as any),
  };
});

// Define component name
defineOptions({
  name: 'MdApp',
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';
@import '../MdLayout/mixins.scss';

.md-app {
  display: flex;
  overflow: hidden;
  position: relative;

  &.md-fixed {
    .md-app-scroller {
      overflow: auto;
    }
  }

  &.md-reveal,
  &.md-fixed-last,
  &.md-overlap,
  &.md-flexible {
    transform: translate3d(0, 0, 0);

    .md-app-toolbar {
      position: absolute;
      top: 0;
    }
  }

  &.md-flexible,
  &.md-overlap {
    .md-app-toolbar {
      min-height: 0;
    }
  }

  &.md-flexible {
    .md-toolbar-row {
      &:first-child {
        z-index: 2;
      }

      &:last-child {
        position: fixed;
        bottom: 0;
        z-index: 1;
      }
    }

    .md-display-1 {
      position: fixed;
    }
  }

  &.md-overlap {
    .md-app-toolbar {
      z-index: 1;
    }

    .md-app-content {
      margin: -64px 24px 24px;
      position: relative;
      z-index: 2;

      @include md-layout-small {
        margin: -64px 16px 16px;
      }

      @include md-layout-xsmall {
        margin: -64px 8px 8px;
      }
    }
  }
}

.md-app-drawer {
  &.md-permanent-card + .md-app-scroller .md-content {
    @include md-layout-small-and-up {
      padding-left: 0;
      padding-right: 0;
      border-left: none;
      border-right: none;
    }
  }
}

.md-app-content {
  padding: 16px;

  @include md-layout-small-and-up {
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
  }

  > p {
    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.md-app-container {
  flex: 1;
  display: flex;
  overflow: auto;
  transform: translate3D(0, 0, 0);
  transition: padding-left 0.4s $md-transition-default-timing,
    padding-right 0.4s $md-transition-default-timing;
  will-change: padding-left, padding-right;
}

.md-app-scroller {
  flex: 1;
}
</style>

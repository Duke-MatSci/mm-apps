<template>
  <div class="md-drawer" :class="[mdActiveTheme, drawerClasses]" v-bind="$attrs">
    <div @click.stop>
      <slot />
    </div>
  </div>

  <!-- Simple overlay -->
  <div v-if="mdActive" class="drawer-overlay" @click="closeDrawer"></div>
</template>

<script setup lang="ts">
import { computed, inject, watch, onMounted, onBeforeUnmount } from 'vue';

// Props
interface Props {
  mdTheme?: string;
  mdRight?: boolean;
  mdPermanent?: 'full' | 'clipped' | 'card' | boolean;
  mdPersistent?: 'mini' | 'full' | boolean;
  mdActive?: boolean;
  mdFixed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mdTheme: 'default',
  mdRight: false,
  mdPermanent: false,
  mdPersistent: false,
  mdActive: false,
  mdFixed: false,
});

// Emits
const emit = defineEmits<{
  'update:mdActive': [value: boolean];
  'md-opened': [];
  'md-closed': [];
}>();

// Inject theme from parent component
const mdActiveTheme = inject(
  'mdActiveTheme',
  computed(() => `md-theme-${props.mdTheme}`)
);

// Computed
const drawerClasses = computed(() => {
  const classes: Record<string, boolean> = {
    'md-left': !props.mdRight,
    'md-right': props.mdRight,
    'md-temporary': isTemporary.value,
    'md-persistent': !!props.mdPersistent,
    'md-permanent': !!props.mdPermanent,
    'md-active': props.mdActive,
    'md-fixed': props.mdFixed,
  };

  if (props.mdPermanent && typeof props.mdPermanent === 'string') {
    classes[`md-permanent-${props.mdPermanent}`] = true;
  }

  if (props.mdPersistent && typeof props.mdPersistent === 'string') {
    classes[`md-persistent-${props.mdPersistent}`] = true;
  }

  return classes;
});

const isTemporary = computed(() => {
  return !props.mdPermanent && !props.mdPersistent;
});

const mode = computed(() => {
  if (props.mdPersistent) {
    return 'persistent';
  }
  if (props.mdPermanent) {
    return 'permanent';
  }
  return 'temporary';
});

const submode = computed(() => {
  if (props.mdPersistent && typeof props.mdPersistent === 'string') {
    return props.mdPersistent;
  }
  if (props.mdPermanent && typeof props.mdPermanent === 'string') {
    return props.mdPermanent;
  }
  return undefined;
});

// Methods
const closeDrawer = () => {
  emit('update:mdActive', false);
};

// Watchers
watch(
  () => props.mdActive,
  (visible) => {
    if (visible) {
      emit('md-opened');
    } else {
      emit('md-closed');
    }
  }
);

// Define component name
defineOptions({
  name: 'MdDrawer',
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';
@import '../MdLayout/mixins.scss';
@import '../MdElevation/mixins.scss';
@import '../MdCard/base.scss';
@import './theme.scss';

@mixin md-drawer-base() {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
}

@mixin md-drawer-temporary() {
  @include md-drawer-base;
  z-index: 30;
  transform: translate3D(-100%, 0, 0);
  transition: transform 0.4s $md-transition-stand-timing;
  will-change: transform, box-shadow;
}

@mixin md-drawer-temporary-active() {
  transform: translate3D(0, 0, 0);
  transition-timing-function: $md-transition-default-timing;

  @include md-layout-xsmall {
    @include md-elevation(16);
  }
}

.md-drawer {
  @include md-drawer-temporary;
  width: 300px;
  max-width: calc(100vw - 56px);
  overflow-x: hidden;
  overflow-y: auto;
  background-color: white;
  z-index: 1000;

  @include md-layout-xsmall {
    width: 280px;
  }

  &.md-right {
    right: 0;
    left: auto;
    transform: translate3D(100%, 0, 0);
  }

  &.md-fixed {
    position: fixed;
  }

  &.md-active {
    @include md-drawer-temporary-active;
  }

  &:not(.md-temporary) {
    ~ .md-overlay {
      @include md-layout-small-and-up {
        background: none;
        pointer-events: none;
      }
    }
  }

  &.md-temporary {
    &.md-left {
      + .md-app-container .md-content {
        border-left: none;
      }
    }

    &.md-right-previous {
      + .md-app-container .md-content {
        border-right: none;
      }
    }

    &.md-active {
      @include md-elevation(16);
    }
  }

  &.md-permanent {
    @include md-layout-small-and-up {
      position: relative;
      transform: translate3D(0, 0, 0);
    }
  }

  &.md-permanent-full {
    @include md-layout-small-and-up {
      z-index: 3;

      .md-list {
        padding-top: 0;
      }
    }
  }

  &.md-permanent-clipped,
  &.md-permanent-card {
    @include md-layout-small-and-up {
      z-index: 1;
    }
  }

  &.md-permanent-card {
    @include md-layout-small-and-up {
      @include md-card;
      margin: 8px;
      z-index: 1;
    }

    @include md-layout-medium-and-up {
      margin: 16px;
    }

    @include md-layout-large-and-up {
      margin: 24px;
    }
  }

  &.md-persistent {
    &:not(.md-active) {
      &.md-left {
        + .md-app-container .md-content {
          border-left: none;
        }
      }

      &.md-right-previous {
        + .md-app-container .md-content {
          border-right: none;
        }
      }
    }
  }

  &.md-persistent-mini {
    transform: translate3D(0, 64px, 0);
    transition: 0.3s $md-transition-stand-timing;
    transition-property: transform, width;
    will-change: transform, box-shadow;

    &.md-left {
      border-right: 1px solid;
    }

    &.md-right {
      border-left: 1px solid;
    }

    &.md-active {
      &.md-left {
        + .md-app-container .md-content {
          border-left: none;
        }
      }

      &.md-right-previous {
        + .md-app-container .md-content {
          border-right: none;
        }
      }
    }

    &:not(.md-active) {
      width: 70px !important;
      z-index: 1;
      white-space: nowrap;

      .md-toolbar {
        display: none;
      }

      .md-list-item-content {
        padding: 0 23px;
      }
    }

    &.md-active {
      position: relative;
      transform: translate3D(0, 0, 0);
      white-space: normal;
    }
  }

  .md-list-item-container {
    font-size: 14px;
    text-transform: none;
  }
}

.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 30;
  cursor: pointer;
}
</style>

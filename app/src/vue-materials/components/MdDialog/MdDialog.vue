<template>
  <Teleport to="body" v-if="mdActive">
    <transition name="md-dialog">
      <div class="md-dialog">
        <div
          class="md-dialog-container"
          :class="[dialogContainerClasses, mdActiveTheme]"
          v-on="$attrs"
        >
          <slot />
          <div v-if="mdBackdrop" :class="mdBackdropClass" class="md-overlay" @click="onClick"></div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, watch } from 'vue';

// Props
interface Props {
  mdTheme?: string;
  mdActive?: boolean;
  mdBackdrop?: boolean;
  mdBackdropClass?: string;
  mdCloseOnEsc?: boolean;
  mdClickOutsideToClose?: boolean;
  mdFullscreen?: boolean;
  mdKeepAlive?: boolean;
  mdAnimateFromSource?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mdTheme: 'default',
  mdActive: false,
  mdBackdrop: true,
  mdBackdropClass: 'md-dialog-overlay',
  mdCloseOnEsc: true,
  mdClickOutsideToClose: true,
  mdFullscreen: true,
  mdKeepAlive: false,
  mdAnimateFromSource: false,
});

// Emits
const emit = defineEmits<{
  'update:mdActive': [value: boolean];
  'md-opened': [];
  'md-closed': [];
  'md-clicked-outside': [];
}>();

// Inject theme from parent component
const mdActiveTheme = inject(
  'mdActiveTheme',
  computed(() => `md-theme-${props.mdTheme}`)
);

// Computed
const dialogContainerClasses = computed(() => ({
  'md-dialog-fullscreen': props.mdFullscreen,
}));

// Methods
const closeDialog = () => {
  emit('update:mdActive', false);
};

const onClick = () => {
  if (props.mdClickOutsideToClose) {
    closeDialog();
  }
  emit('md-clicked-outside');
};

const onEsc = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.mdCloseOnEsc) {
    closeDialog();
  }
};

// Watchers
watch(
  () => props.mdActive,
  async (isActive) => {
    await nextTick();
    if (isActive) {
      emit('md-opened');
      // Add event listener for ESC key
      document.addEventListener('keydown', onEsc);
    } else {
      emit('md-closed');
      // Remove event listener for ESC key
      document.removeEventListener('keydown', onEsc);
    }
  }
);

// Define component name
defineOptions({
  name: 'MdDialog',
  inheritAttrs: false,
});
</script>

<style lang="scss">
@import '../MdElevation/mixins.scss';
@import './theme.scss';

$opacity-transition-duration: 0.15s;
$transform-transition-duration: 0.2s;
$max-duration: max($opacity-transition-duration, $transform-transition-duration);

.md-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  display: flex;
  transition-duration: $max-duration;
  z-index: 110;

  &.md-dialog-leave,
  &.md-dialog-enter-to {
    .md-dialog-container {
      opacity: 1;
      transform: scale(1);
    }

    .md-dialog-fullscreen {
      @media (max-width: 600px) {
        opacity: 0;
        transform: translate(0, 30%);
      }
    }
  }

  &.md-dialog-enter,
  &.md-dialog-leave-to {
    .md-dialog-container {
      opacity: 0;
      transform: scale(0.9);
    }

    .md-dialog-fullscreen {
      @media (max-width: 600px) {
        opacity: 1;
        transform: translate(0, 0);
      }
    }
  }
}

.md-dialog-container {
  @include md-elevation(24);
  min-width: 280px;
  max-width: 80%;
  max-height: 80%;
  margin: auto;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  border-radius: 2px;
  backface-visibility: hidden;
  pointer-events: auto;
  opacity: 1;
  transform-origin: center center;
  transition: opacity $opacity-transition-duration cubic-bezier(0.25, 0.8, 0.25, 1),
    transform $transform-transition-duration cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: opacity, transform;

  &.md-dialog-leave,
  &.md-dialog-enter-to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  &.md-dialog-enter,
  &.md-dialog-leave-to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
}

.md-dialog-container {
  .md-tabs {
    flex: 1;
    max-width: 100%;
  }

  .md-tabs-navigation {
    padding: 0 12px;
  }

  .md-tab {
    @media (max-width: 600px) {
      padding: 12px;
    }
  }
}

.md-dialog-fullscreen {
  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    border-radius: 0;
    transform: none;

    &.md-dialog-enter,
    &.md-dialog-leave-to {
      opacity: 0;
      transform: translate3D(0, 30%, 0);
    }

    &.md-dialog-leave,
    &.md-dialog-enter-to {
      opacity: 1;
      transform: translate3D(0, 0, 0);
    }
  }
}

.md-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
}
</style>

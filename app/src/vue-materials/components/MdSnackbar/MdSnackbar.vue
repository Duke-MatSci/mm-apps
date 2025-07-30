<template>
  <md-portal v-if="mdPersistent && mdDuration !== Infinity">
    <keep-alive>
      <md-snackbar-content :md-classes="[snackbarClasses, mdActiveTheme]" v-if="mdActive">
        <slot />
      </md-snackbar-content>
    </keep-alive>
  </md-portal>

  <md-portal v-else>
    <md-snackbar-content :md-classes="[snackbarClasses, mdActiveTheme]" v-if="mdActive">
      <slot />
    </md-snackbar-content>
  </md-portal>
</template>

<script setup lang="ts">
import { computed, inject, watch } from 'vue';
import MdPortal from '../MdPortal/MdPortal.vue';
import MdSnackbarContent from './MdSnackbarContent.vue';
import { createSnackbar, destroySnackbar } from './MdSnackbarQueue';

interface Props {
  mdActive?: boolean;
  mdPersistent?: boolean;
  mdDuration?: number;
  mdPosition?: 'center' | 'left';
}

const props = withDefaults(defineProps<Props>(), {
  mdActive: false,
  mdPersistent: false,
  mdDuration: 4000,
  mdPosition: 'center',
});

const emit = defineEmits<{
  'update:mdActive': [value: boolean];
  'md-opened': [];
  'md-closed': [];
}>();

// Inject theme from parent component
const mdActiveTheme = inject(
  'mdActiveTheme',
  computed(() => null)
);

const snackbarClasses = computed(() => {
  return {
    ['md-position-' + props.mdPosition]: true,
  };
});

watch(
  () => props.mdActive,
  (isActive) => {
    if (isActive) {
      createSnackbar(props.mdDuration, props.mdPersistent, {
        _vnode: { componentInstance: { initDestroy: (immediate: boolean) => immediate } },
      }).then(() => {
        emit('update:mdActive', false);
        emit('md-opened');
      });
    } else {
      destroySnackbar();
      emit('md-closed');
    }
  }
);

defineOptions({
  name: 'MdSnackbar',
  components: {
    MdPortal,
    MdSnackbarContent,
  },
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';
@import '../MdLayout/mixins.scss';
@import '../MdElevation/mixins.scss';
@import './theme.scss';

.md-snackbar {
  @include md-elevation(6);
  min-width: 288px;
  max-width: 568px;
  min-height: 48px;
  max-height: 80px;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 1000;
  border-radius: 2px;
  transition: 0.4s $md-transition-default-timing;
  will-change: background-color, color, opacity, transform;

  &.md-position-center {
    margin: 0 auto;
    right: 0;
    bottom: 0;
    left: 0;

    &.md-snackbar-enter,
    &.md-snackbar-leave-active {
      transform: translate3D(0, calc(100% + 8px), 0);
    }
  }

  &.md-position-left {
    bottom: 24px;
    left: 24px;

    &.md-snackbar-enter,
    &.md-snackbar-leave-active {
      transform: translate3D(0, calc(100% + 32px), 0);
    }
  }

  @include md-layout-xsmall {
    left: 0;
    transform: none;
    border-radius: 0;
  }
}

.md-snackbar-enter,
.md-snackbar-leave-active {
  opacity: 0;

  .md-snackbar-content {
    opacity: 0;
  }
}

.md-snackbar-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: opacity 0.38s $md-transition-drop-timing;

  .md-button {
    min-width: 0;
    margin: -8px -8px -8px 36px;

    @include md-layout-xsmall {
      margin-left: 12px;
    }

    + .md-button {
      margin-left: 16px;
    }
  }
}
</style>

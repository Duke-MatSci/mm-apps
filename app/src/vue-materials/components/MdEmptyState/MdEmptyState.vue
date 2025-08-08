<template>
  <transition name="md-empty-state" appear>
    <div
      class="md-empty-state"
      :class="[emptyStateClasses, $mdActiveTheme]"
      :style="emptyStateStyles"
    >
      <div class="md-empty-state-container">
        <template v-if="mdIcon">
          <md-icon
            class="md-empty-state-icon"
            v-if="isAssetIcon(mdIcon)"
            :md-src="mdIcon"
          ></md-icon>
          <md-icon class="md-empty-state-icon" v-else>{{ mdIcon }}</md-icon>
        </template>
        <strong class="md-empty-state-label" v-if="mdLabel">{{ mdLabel }}</strong>
        <p class="md-empty-state-description" v-if="mdDescription">{{ mdDescription }}</p>

        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MdEmptyStateProps, { type MdEmptyStateProps as Props } from './MdEmptyStateProps';

// Props
const props = withDefaults(defineProps<Props>(), {
  mdRounded: false,
  mdSize: 420,
  mdIcon: undefined,
  mdLabel: undefined,
  mdDescription: undefined,
});

// Computed properties
const emptyStateClasses = computed(() => {
  return {
    'md-rounded': props.mdRounded,
  };
});

const emptyStateStyles = computed(() => {
  if (props.mdRounded) {
    const size = props.mdSize + 'px';

    return {
      width: size,
      height: size,
    };
  }
  return {};
});

// Asset icon check (simplified version)
const isAssetIcon = (icon: string) => {
  return icon.includes('.') || icon.startsWith('/');
};

// Component name for debugging
defineOptions({
  name: 'MdEmptyState',
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';
@import '../MdIcon/mixins.scss';

@mixin md-empty-state-base() {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.md-empty-state {
  @include md-empty-state-base;
  max-width: 420px;
  padding: 36px;
  margin: 0 auto;
  position: relative;
  transition: opacity 0.15s $md-transition-enter-timing, transform 0.3s $md-transition-enter-timing;
  will-change: transform, opacity;

  &.md-rounded {
    max-width: auto;
    border-radius: 50%;

    .md-empty-state-container {
      padding: 40px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }

  .md-button {
    margin: 0.5em 0 0;
  }
}

.md-empty-state-enter {
  opacity: 0;
  transform: scale(0.87);

  .md-empty-state-container {
    opacity: 0;
  }
}

.md-empty-state-container {
  @include md-empty-state-base;
  transition: opacity 0.4s $md-transition-default-timing;
  will-change: opacity;
}

.md-empty-state-icon {
  @include md-icon-size(160px);
  margin: 0;
}

.md-empty-state-label {
  font-size: 26px;
  font-weight: 500;
  line-height: 40px;
}

.md-empty-state-description {
  margin: 1em 0;
  font-size: 16px;
  line-height: 24px;
}
</style>

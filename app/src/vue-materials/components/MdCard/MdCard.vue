<template>
  <div class="md-card" :class="[mdActiveTheme, cardClasses]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, inject } from 'vue';

// Props
interface Props {
  mdTheme?: string;
  mdWithHover?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mdTheme: 'default',
  mdWithHover: false,
});

// Inject theme from parent component
const mdActiveTheme = inject(
  'mdActiveTheme',
  computed(() => `md-theme-${props.mdTheme}`)
);

// Reactive data
const MdCard = reactive({
  expand: false,
});

// Provide data to child components
provide('MdCard', MdCard);

// Computed
const cardClasses = computed(() => ({
  'md-with-hover': props.mdWithHover,
  'md-expand-active': MdCard.expand,
}));

// Define component name
defineOptions({
  name: 'MdCard',
});
</script>

<style lang="scss">
@import './theme.scss';
@import './base.scss';

$md-card-radius: 2px;

.md-card {
  @include md-card;

  &.md-with-hover {
    cursor: pointer;
    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    will-change: background-color, box-shadow;

    &:hover {
      z-index: 2;
      @include md-elevation(8);
    }
  }

  &.md-expand-active {
    .md-card-expand-trigger.md-icon-button {
      transform: rotate(180deg);
    }
  }

  .md-subhead,
  .md-title,
  .md-subheading {
    margin: 0;
    font-weight: 400;
  }

  .md-subhead {
    opacity: 0.54;
    font-size: 14px;
    letter-spacing: 0.01em;
    line-height: 20px;

    + .md-title {
      margin-top: 4px;
    }
  }

  .md-title {
    font-size: 24px;
    letter-spacing: 0;
    line-height: 32px;
  }
}
</style>

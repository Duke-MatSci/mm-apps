<template>
  <md-svg-loader
    class="md-icon md-icon-image"
    :md-src="mdSrc"
    :class="[mdActiveTheme]"
    v-if="mdSrc"
    @md-loaded="$emit('md-loaded')"
  />
  <i class="md-icon md-icon-font" :class="[mdActiveTheme]" v-else>
    <slot />
  </i>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import MdSvgLoader from '../MdSvgLoader/MdSvgLoader.vue';

interface Props {
  mdSrc?: string;
  mdTheme?: string;
}

const props = withDefaults(defineProps<Props>(), {
  mdSrc: undefined,
  mdTheme: 'default',
});

const emit = defineEmits<{
  'md-loaded': [];
}>();

// Inject theme from parent component or use prop
const mdActiveTheme = inject(
  'mdActiveTheme',
  computed(() => `md-theme-${props.mdTheme}`)
);

defineOptions({
  name: 'MdIcon',
  components: {
    MdSvgLoader,
  },
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';
@import './mixins.scss';

$icon-size: 24px;

.md-icon {
  @include md-icon-size($icon-size);
  margin: auto;
  display: inline-flex;
  user-select: none;
  align-items: center;
  justify-content: center;
  vertical-align: middle;

  &.md-size-2x {
    @include md-icon-size($icon-size * 2);
  }

  &.md-size-3x {
    @include md-icon-size($icon-size * 3);
  }

  &.md-size-4x {
    @include md-icon-size($icon-size * 4);
  }

  &.md-size-5x {
    @include md-icon-size($icon-size * 5);
  }
}

.md-icon-image {
  svg {
    height: 100%;
    flex: 1;
    transition: fill 0.4s $md-transition-default-timing;
  }
}

.md-icon {
  transition: color 0.4s $md-transition-default-timing;
  direction: ltr;
  font-family: 'Material Icons';
  font-feature-settings: 'liga';
  font-style: normal;
  letter-spacing: normal;
  line-height: 1;
  text-rendering: optimizeLegibility;
  text-transform: none;
  word-wrap: normal;
  white-space: nowrap;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

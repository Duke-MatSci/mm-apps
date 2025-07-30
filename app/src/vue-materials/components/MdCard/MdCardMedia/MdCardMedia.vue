<template>
  <div class="md-card-media" :class="mediaClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Props
interface Props {
  mdRatio?: string;
  mdMedium?: boolean;
  mdBig?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mdRatio: undefined,
  mdMedium: false,
  mdBig: false,
});

// Computed properties
const mediaClasses = computed(() => {
  let classes: Record<string, boolean> = {};

  if (props.mdRatio) {
    const ratio = getAspectRatio();

    if (ratio) {
      const [horiz, vert] = ratio;
      classes[`md-ratio-${horiz}-${vert}`] = true;
    }
  }

  if (props.mdMedium || props.mdBig) {
    classes = {
      'md-medium': !!props.mdMedium,
      'md-big': !!props.mdBig,
    };
  }

  return classes;
});

// Methods
const getAspectRatio = () => {
  if (!props.mdRatio) return null;

  let ratio: string[] = [];

  if (props.mdRatio.indexOf(':') !== -1) {
    ratio = props.mdRatio.split(':');
  } else if (props.mdRatio.indexOf('/') !== -1) {
    ratio = props.mdRatio.split('/');
  } else if (props.mdRatio.indexOf('-') !== -1) {
    ratio = props.mdRatio.split('-');
  }

  return ratio.length === 2 ? ratio : null;
};

// Define component name
defineOptions({
  name: 'MdCardMedia',
});
</script>

<style lang="scss">
@mixin md-image-aspect-ratio($width, $height) {
  overflow: hidden;

  &:before {
    width: 100%;
    padding-top: ($height / $width) * 100%;
    display: block;
    content: ' ';
  }

  img {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    transform: translateY(-50%);
  }
}

.md-card-media {
  position: relative;

  &.md-ratio-16-9 {
    @include md-image-aspect-ratio(16, 9);
  }

  &.md-ratio-4-3 {
    @include md-image-aspect-ratio(4, 3);
  }

  &.md-ratio-1-1 {
    @include md-image-aspect-ratio(1, 1);
  }

  + .md-card-header {
    padding-top: 24px;
  }

  + .md-card-content:last-child {
    padding-bottom: 16px;
  }

  img {
    width: 100%;
  }
}
</style>

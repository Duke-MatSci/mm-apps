<template>
  <div class="md-card-media-cover" :class="coverClasses">
    <slot />
    <div class="md-card-backdrop" :style="coverStyles" v-if="mdTextScrim" ref="backdrop"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';

// Props
interface Props {
  mdTextScrim?: boolean;
  mdSolid?: boolean;
}

const props = defineProps<Props>();

// Refs
const backdrop = ref<HTMLElement | null>(null);
const backdropBackground = ref<string>('');

// Computed properties
const coverClasses = computed(() => {
  return {
    'md-text-scrim': !!props.mdTextScrim,
    'md-solid': !!props.mdSolid,
  };
});

const coverStyles = computed(() => {
  return {
    background: backdropBackground.value,
  };
});

// Methods
const applyScrimColor = (darkness: number) => {
  if (backdrop.value) {
    backdropBackground.value = `linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, ${
      darkness / 2
    }) 66%, rgba(0, 0, 0, ${darkness}) 100%)`;
  }
};

const applySolidColor = (darkness: number) => {
  const element = document.querySelector('.md-card-area') as HTMLElement;
  if (element) {
    element.style.background = `rgba(0, 0, 0, ${darkness})`;
  }
};

const getImageLightness = (
  image: HTMLImageElement,
  onLoad: (lightness: number) => void,
  onError: () => void
) => {
  const canvas = document.createElement('canvas');

  image.crossOrigin = 'Anonymous';

  image.onload = () => {
    let colorSum = 0;
    let ctx: CanvasRenderingContext2D;
    let imageData: ImageData;
    let imageMetadata: Uint8ClampedArray;
    let r: number;
    let g: number;
    let b: number;
    let average: number;

    canvas.width = image.width;
    canvas.height = image.height;
    ctx = canvas.getContext('2d')!;

    ctx.drawImage(image, 0, 0);

    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    imageMetadata = imageData.data;

    for (let x = 0, len = imageMetadata.length; x < len; x += 4) {
      r = imageMetadata[x];
      g = imageMetadata[x + 1];
      b = imageMetadata[x + 2];

      average = Math.floor((r + g + b) / 3);
      colorSum += average;
    }

    onLoad(Math.floor(colorSum / (image.width * image.height)));
  };

  image.onerror = onError;
};

// Lifecycle hooks
onMounted(() => {
  const applyBackground = (darkness = 0.6) => {
    if (props.mdTextScrim) {
      applyScrimColor(darkness);
    } else if (props.mdSolid) {
      applySolidColor(darkness);
    }
  };

  const image = document.querySelector('img') as HTMLImageElement;

  if (image && (props.mdTextScrim || props.mdSolid)) {
    getImageLightness(
      image,
      (lightness) => {
        const limit = 256;
        let darkness = (Math.abs(limit - lightness) * 100) / limit + 15 / 100;

        if (darkness >= 0.7) {
          darkness = 0.7;
        }

        applyBackground(darkness);
      },
      () => applyBackground()
    );
  }
});

// Define component name
defineOptions({
  name: 'MdCardMediaCover',
});
</script>

<style lang="scss">
.md-card-media-cover {
  position: relative;
  color: #fff;

  &.md-solid {
    .md-card-area {
      background-color: rgba(#000, 0.54);
    }
  }

  &.md-text-scrim {
    .md-card-backdrop {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
    }
  }

  .md-card-area {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
  }

  .md-card-header {
    display: flex;
    flex-direction: column;

    + .md-card-actions {
      padding-top: 0;
    }
  }

  .md-subhead {
    opacity: 1;
  }

  .md-card-header,
  .md-card-actions {
    .md-button:not(.md-primary):not(.md-accent) {
      color: #fff !important;

      &.md-icon-button {
        .md-icon {
          color: #fff !important;
        }
      }
    }
  }
}
</style>

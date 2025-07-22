<template>
  <div class="md-list-expansion" :class="expansionClasses">
    <div class="md-list-expansion-content" :style="contentStyles">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MdListExpansion',
  props: {
    mdExpanded: {
      type: Boolean,
      default: false,
    },
    mdAnimate: {
      type: String,
      default: 'slide',
      validator: (value: string) => ['slide', 'fade', 'scale'].includes(value),
    },
    mdDuration: {
      type: Number,
      default: 300,
    },
  },
  computed: {
    expansionClasses() {
      return {
        'md-expanded': this.mdExpanded,
        [`md-animate-${this.mdAnimate}`]: this.mdAnimate,
      };
    },
    contentStyles() {
      return {
        transitionDuration: `${this.mdDuration}ms`,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.md-list-expansion {
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  .md-list-expansion-content {
    padding: 16px;
    background-color: rgba(0, 0, 0, 0.02);
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }

  // Slide animation
  &.md-animate-slide {
    max-height: 0;
    opacity: 0;

    &.md-expanded {
      max-height: 1000px;
      opacity: 1;
    }
  }

  // Fade animation
  &.md-animate-fade {
    opacity: 0;
    transform: translateY(-10px);

    &.md-expanded {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // Scale animation
  &.md-animate-scale {
    opacity: 0;
    transform: scale(0.95);

    &.md-expanded {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>

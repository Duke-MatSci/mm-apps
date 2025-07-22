<template>
  <div class="md-content" :class="[contentClasses, $mdActiveTheme]" :style="contentStyles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'MdContent',
  props: {
    mdTheme: {
      type: String,
      default: 'default',
    },
    mdPadding: {
      type: Boolean,
      default: true,
    },
    mdNoPadding: {
      type: Boolean,
      default: false,
    },
    mdCompact: {
      type: Boolean,
      default: false,
    },
    mdSpacious: {
      type: Boolean,
      default: false,
    },
    mdScrollable: {
      type: Boolean,
      default: false,
    },
    mdScrollbar: {
      type: Boolean,
      default: true,
    },
    mdOverflow: {
      type: String,
      default: 'auto',
      validator: (value: string) => ['auto', 'hidden', 'visible', 'scroll'].includes(value),
    },
    mdHeight: {
      type: [String, Number],
      default: null,
    },
    mdMaxHeight: {
      type: [String, Number],
      default: null,
    },
    mdMinHeight: {
      type: [String, Number],
      default: null,
    },
    mdWidth: {
      type: [String, Number],
      default: null,
    },
    mdMaxWidth: {
      type: [String, Number],
      default: null,
    },
    mdMinWidth: {
      type: [String, Number],
      default: null,
    },
    mdElevated: {
      type: Boolean,
      default: false,
    },
    mdFlat: {
      type: Boolean,
      default: false,
    },
    mdInset: {
      type: Boolean,
      default: false,
    },
    mdOutlined: {
      type: Boolean,
      default: false,
    },
    mdRounded: {
      type: Boolean,
      default: false,
    },
    mdResponsive: {
      type: Boolean,
      default: false,
    },
    mdLoading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const $mdActiveTheme = computed(() => {
      return props.mdTheme || 'default';
    });

    const contentClasses = computed(() => {
      return {
        'md-no-padding': props.mdNoPadding || !props.mdPadding,
        'md-compact': props.mdCompact,
        'md-spacious': props.mdSpacious,
        'md-scrollable': props.mdScrollable,
        'md-no-scrollbar': !props.mdScrollbar,
        'md-elevated': props.mdElevated,
        'md-flat': props.mdFlat,
        'md-inset': props.mdInset,
        'md-outlined': props.mdOutlined,
        'md-rounded': props.mdRounded,
        'md-responsive': props.mdResponsive,
        'md-loading': props.mdLoading,
        'md-disabled': props.disabled,
        [`md-overflow-${props.mdOverflow}`]: props.mdOverflow !== 'auto',
      };
    });

    const contentStyles = computed(() => {
      const styles: Record<string, string> = {};

      if (props.mdHeight) {
        styles.height = typeof props.mdHeight === 'number' ? `${props.mdHeight}px` : props.mdHeight;
      }

      if (props.mdMaxHeight) {
        styles.maxHeight =
          typeof props.mdMaxHeight === 'number' ? `${props.mdMaxHeight}px` : props.mdMaxHeight;
      }

      if (props.mdMinHeight) {
        styles.minHeight =
          typeof props.mdMinHeight === 'number' ? `${props.mdMinHeight}px` : props.mdMinHeight;
      }

      if (props.mdWidth) {
        styles.width = typeof props.mdWidth === 'number' ? `${props.mdWidth}px` : props.mdWidth;
      }

      if (props.mdMaxWidth) {
        styles.maxWidth =
          typeof props.mdMaxWidth === 'number' ? `${props.mdMaxWidth}px` : props.mdMaxWidth;
      }

      if (props.mdMinWidth) {
        styles.minWidth =
          typeof props.mdMinWidth === 'number' ? `${props.mdMinWidth}px` : props.mdMinWidth;
      }

      if (props.mdOverflow) {
        styles.overflow = props.mdOverflow;
      }

      return styles;
    });

    return {
      $mdActiveTheme,
      contentClasses,
      contentStyles,
    };
  },
});
</script>

<style lang="scss">
@import './theme.scss';
</style>

<template>
  <div class="md-list" :class="[$mdActiveTheme, listClasses]">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MdList',
  props: {
    mdTheme: {
      type: String,
      default: 'default',
    },
    mdDense: {
      type: Boolean,
      default: false,
    },
    mdSingleLine: {
      type: Boolean,
      default: false,
    },
    mdTwoLine: {
      type: Boolean,
      default: false,
    },
    mdThreeLine: {
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
    mdInset: {
      type: Boolean,
      default: false,
    },
    mdOutlined: {
      type: Boolean,
      default: false,
    },
    mdElevated: {
      type: Boolean,
      default: false,
    },
    mdFlat: {
      type: Boolean,
      default: false,
    },
    mdInteractive: {
      type: Boolean,
      default: false,
    },
    mdSelectable: {
      type: Boolean,
      default: false,
    },
    mdResponsive: {
      type: Boolean,
      default: false,
    },
    mdAnimate: {
      type: String,
      default: null,
      validator: (value: string | null) =>
        !value || ['fade-in', 'slide-in', 'scale-in'].includes(value),
    },
    mdHover: {
      type: String,
      default: null,
      validator: (value: string | null) => !value || ['elevate', 'glow'].includes(value),
    },
    mdFocusRing: {
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
    mdExpandable: {
      type: Boolean,
      default: false,
    },
    mdAccordion: {
      type: Boolean,
      default: false,
    },
    mdExpandIcon: {
      type: String,
      default: 'expand_more',
    },
    mdCollapseIcon: {
      type: String,
      default: 'expand_less',
    },
  },
  computed: {
    $mdActiveTheme() {
      return this.mdTheme || 'default';
    },
    listClasses() {
      return {
        'md-dense': this.mdDense,
        'md-single-line': this.mdSingleLine,
        'md-two-line': this.mdTwoLine,
        'md-three-line': this.mdThreeLine,
        'md-compact': this.mdCompact,
        'md-spacious': this.mdSpacious,
        'md-inset': this.mdInset,
        'md-outlined': this.mdOutlined,
        'md-elevated': this.mdElevated,
        'md-flat': this.mdFlat,
        'md-interactive': this.mdInteractive,
        'md-selectable': this.mdSelectable,
        'md-responsive': this.mdResponsive,
        [`md-animate-${this.mdAnimate}`]: this.mdAnimate,
        [`md-hover-${this.mdHover}`]: this.mdHover,
        'md-focus-ring': this.mdFocusRing,
        'md-loading': this.mdLoading,
        'md-disabled': this.disabled,
        'md-expandable': this.mdExpandable,
        'md-accordion': this.mdAccordion,
      };
    },
  },
});
</script>

<style lang="scss">
@import './theme.scss';
</style>

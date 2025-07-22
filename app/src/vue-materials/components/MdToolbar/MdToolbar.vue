<template>
  <header class="md-toolbar" :class="[toolbarClasses, $mdActiveTheme]">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section md-toolbar-section-start">
        <slot name="md-toolbar-section-start"></slot>
      </div>
      <div class="md-toolbar-section md-toolbar-section-center">
        <slot name="md-toolbar-section-center">
          <h3 v-if="title" class="md-toolbar-title">{{ title }}</h3>
        </slot>
      </div>
      <div class="md-toolbar-section md-toolbar-section-end">
        <slot name="md-toolbar-section-end"></slot>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MdToolbar',
  props: {
    mdTheme: {
      type: String,
      default: 'default',
    },
    title: {
      type: String,
      default: null,
    },
    mdElevation: {
      type: [String, Number],
      default: 4,
    },
    mdProminent: {
      type: Boolean,
      default: false,
    },
    mdDense: {
      type: Boolean,
      default: false,
    },
    mdExtended: {
      type: Boolean,
      default: false,
    },
    mdFixed: {
      type: Boolean,
      default: false,
    },
    mdAbsolute: {
      type: Boolean,
      default: false,
    },
    mdStatic: {
      type: Boolean,
      default: false,
    },
    mdResponsive: {
      type: Boolean,
      default: false,
    },
    mdWithNavIcon: {
      type: Boolean,
      default: false,
    },
    mdWithActions: {
      type: Boolean,
      default: false,
    },
    mdAnimate: {
      type: String,
      default: null,
      validator: (value: string | null) =>
        !value || ['slide-down', 'fade-in', 'scale-in'].includes(value),
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
  },
  computed: {
    $mdActiveTheme() {
      return this.mdTheme || 'default';
    },
    toolbarClasses() {
      return {
        [`md-elevation-${this.mdElevation}`]: this.mdElevation !== 0,
        'md-prominent': this.mdProminent,
        'md-dense': this.mdDense,
        'md-extended': this.mdExtended,
        'md-fixed': this.mdFixed,
        'md-absolute': this.mdAbsolute,
        'md-static': this.mdStatic,
        'md-responsive': this.mdResponsive,
        'md-with-nav-icon': this.mdWithNavIcon,
        'md-with-actions': this.mdWithActions,
        [`md-animate-${this.mdAnimate}`]: this.mdAnimate,
        [`md-hover-${this.mdHover}`]: this.mdHover,
        'md-focus-ring': this.mdFocusRing,
        'md-loading': this.mdLoading,
        'md-disabled': this.disabled,
      };
    },
  },
});
</script>

<style lang="scss">
@import './theme.scss';
</style>

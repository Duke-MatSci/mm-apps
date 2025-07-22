<template>
  <div>
    <!-- Drawer Overlay - positioned outside the drawer -->
    <div
      v-if="showOverlay"
      class="md-drawer-overlay"
      :class="overlayClasses"
      @click="handleOverlayClick"
    ></div>

    <!-- Drawer Container -->
    <aside class="md-drawer" :class="[drawerClasses, $mdActiveTheme]" :style="drawerStyles">
      <div class="md-drawer-content">
        <slot></slot>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'MdDrawer',
  props: {
    mdTheme: {
      type: String,
      default: 'default',
    },
    mdActive: {
      type: Boolean,
      default: false,
    },
    mdRight: {
      type: Boolean,
      default: false,
    },
    mdPermanent: {
      type: [Boolean, String],
      default: false,
      validator: (value: boolean | string) => {
        if (typeof value === 'boolean') return true;
        return ['full', 'clipped', 'card'].includes(value);
      },
    },
    mdPersistent: {
      type: [Boolean, String],
      default: false,
      validator: (value: boolean | string) => {
        if (typeof value === 'boolean') return true;
        return ['mini', 'full'].includes(value);
      },
    },
    mdTemporary: {
      type: Boolean,
      default: false,
    },
    mdWidth: {
      type: [String, Number],
      default: 256,
    },
    mdVariant: {
      type: String,
      default: 'standard',
      validator: (value: string) =>
        ['standard', 'mini', 'clipped', 'floating', 'full-height', 'responsive'].includes(value),
    },
    mdOverlayType: {
      type: String,
      default: 'standard',
      validator: (value: string) => ['standard', 'light', 'dark', 'blur'].includes(value),
    },
    mdAnimate: {
      type: Boolean,
      default: true,
    },
    mdDisableOverlay: {
      type: Boolean,
      default: false,
    },
    mdFixed: {
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
    mdInset: {
      type: Boolean,
      default: false,
    },
    mdOutlined: {
      type: Boolean,
      default: false,
    },
    mdResponsive: {
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
    mdLoading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:md-active', 'open', 'close'],
  computed: {
    $mdActiveTheme() {
      return this.mdTheme || 'default';
    },
    drawerClasses() {
      return {
        'md-right': this.mdRight,
        'md-permanent': this.mdPermanent,
        'md-persistent': this.mdPersistent,
        'md-temporary': this.mdTemporary,
        'md-active': this.mdActive,
        'md-fixed': this.mdFixed,
        'md-elevated': this.mdElevated,
        'md-flat': this.mdFlat,
        'md-inset': this.mdInset,
        'md-outlined': this.mdOutlined,
        'md-responsive': this.mdResponsive,
        'md-compact': this.mdCompact,
        'md-spacious': this.mdSpacious,
        'md-loading': this.mdLoading,
        'md-disabled': this.disabled,
        [`md-${this.mdVariant}`]: this.mdVariant !== 'standard',
        [`md-permanent-${this.mdPermanent}`]: typeof this.mdPermanent === 'string',
        [`md-persistent-${this.mdPersistent}`]: typeof this.mdPersistent === 'string',
        'md-no-animate': !this.mdAnimate,
      };
    },
    drawerStyles() {
      const width = typeof this.mdWidth === 'number' ? `${this.mdWidth}px` : this.mdWidth;
      const styles: Record<string, string> = {
        width,
      };

      // Only apply positioning for non-permanent drawers
      if (!this.mdPermanent) {
        styles[this.mdRight ? 'right' : 'left'] = this.mdActive ? '0' : `-${width}`;
      }

      return styles;
    },
    showOverlay() {
      return !this.mdDisableOverlay && (this.mdTemporary || this.mdPersistent) && this.mdActive;
    },
    overlayClasses() {
      return {
        'md-active': this.mdActive,
        [`md-overlay-${this.mdOverlayType}`]: this.mdOverlayType !== 'standard',
      };
    },
  },
  methods: {
    handleOverlayClick() {
      if (this.mdActive && (this.mdTemporary || this.mdPersistent)) {
        this.$emit('update:md-active', false);
        this.$emit('close');
      }
    },
  },
  watch: {
    mdActive(newVal: boolean) {
      if (newVal) {
        this.$emit('open');
      } else {
        this.$emit('close');
      }
    },
  },
});
</script>

<style lang="scss">
@import './theme.scss';
</style>

<template>
  <button
    :class="buttonClasses"
    :style="buttonStyles"
    @click="$emit('click', $event)"
    :disabled="disabled"
    :type="buttonType"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MdButton',
  props: {
    mdTheme: {
      type: String,
      default: 'default',
    },
    mdType: {
      type: String,
      default: 'button',
      validator: (value: string) => ['button', 'submit', 'reset'].includes(value),
    },
    mdRaised: {
      type: Boolean,
      default: false,
    },
    mdOutlined: {
      type: Boolean,
      default: false,
    },
    mdFab: {
      type: Boolean,
      default: false,
    },
    mdMiniFab: {
      type: Boolean,
      default: false,
    },
    mdIcon: {
      type: Boolean,
      default: false,
    },
    mdSize: {
      type: String,
      default: 'normal',
      validator: (value: string) => ['small', 'normal', 'large'].includes(value),
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
  emits: ['click'],
  computed: {
    buttonType(): 'button' | 'submit' | 'reset' {
      return this.mdType as 'button' | 'submit' | 'reset';
    },
    buttonClasses() {
      return {
        'md-button': true,
        [`md-theme-${this.mdTheme}`]: true,
        'md-flat':
          !this.mdRaised && !this.mdOutlined && !this.mdFab && !this.mdMiniFab && !this.mdIcon,
        'md-raised': this.mdRaised,
        'md-outlined': this.mdOutlined,
        'md-fab': this.mdFab,
        'md-mini-fab': this.mdMiniFab,
        'md-icon-button': this.mdIcon,
        [`md-size-${this.mdSize}`]: this.mdSize !== 'normal',
        'md-loading': this.mdLoading,
        'md-disabled': this.disabled || this.mdLoading,
      };
    },
    buttonStyles() {
      return {};
    },
  },
});
</script>

<style lang="scss">
@import './theme.scss';
/* MdButton uses migrated CSS classes from vue-material.min.css */
/* Additional component-specific styles can be added here if needed */

.md-button {
  /* Base styles are provided by vue-material.min.css */

  /* Component-specific overrides or additions */
  &.md-icon-button {
    /* Ensure icon buttons have proper styling */
    min-width: 40px;
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 50%;
    line-height: 40px;
  }
}
</style>

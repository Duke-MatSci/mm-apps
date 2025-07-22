<template>
  <div class="md-list-item" :class="[$mdActiveTheme, itemClasses]" @click="handleClick">
    <div class="md-list-item-content">
      <slot></slot>
    </div>
    <div
      v-if="mdExpandable && mdShowExpandIcon"
      class="md-list-item-expand-icon"
      @click.stop="handleExpandClick"
    >
      <MdIcon>{{ mdExpanded ? mdCollapseIcon : mdExpandIcon }}</MdIcon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MdIcon from '../MdIcon/MdIcon.vue';

export default defineComponent({
  name: 'MdListItem',
  components: {
    MdIcon,
  },
  props: {
    mdTheme: {
      type: String,
      default: 'default',
    },
    mdDisabled: {
      type: Boolean,
      default: false,
    },
    mdRipple: {
      type: Boolean,
      default: true,
    },
    mdSelected: {
      type: Boolean,
      default: false,
    },
    mdInteractive: {
      type: Boolean,
      default: true,
    },
    mdFocusable: {
      type: Boolean,
      default: true,
    },
    mdExpandable: {
      type: Boolean,
      default: false,
    },
    mdExpanded: {
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
    mdShowExpandIcon: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['click', 'expand', 'collapse'],
  computed: {
    $mdActiveTheme() {
      return this.mdTheme || 'default';
    },
    itemClasses() {
      return {
        'md-disabled': this.mdDisabled,
        'md-ripple': this.mdRipple,
        'md-selected': this.mdSelected,
        'md-interactive': this.mdInteractive,
        'md-focusable': this.mdFocusable,
        'md-expandable': this.mdExpandable,
        'md-expanded': this.mdExpanded,
      };
    },
  },
  methods: {
    handleClick(event: Event) {
      if (!this.mdDisabled) {
        this.$emit('click', event);
      }
    },
    handleExpandClick(event: Event) {
      if (!this.mdDisabled && this.mdExpandable) {
        if (this.mdExpanded) {
          this.$emit('collapse', event);
        } else {
          this.$emit('expand', event);
        }
      }
    },
  },
});
</script>

<style lang="scss">
@import './theme.scss';
</style>

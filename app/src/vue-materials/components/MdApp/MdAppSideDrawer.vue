<template>
  <div class="md-app md-app-side-drawer md-layout-row" :class="[appClasses, $mdActiveTheme]">
    <slot name="md-app-drawer-left"></slot>
    <slot name="md-app-drawer-right-previous"></slot>
    <main
      class="md-app-container md-flex md-layout-column"
      :class="[$mdActiveTheme, scrollerClasses]"
      :style="contentStyles"
      @scroll.passive="handleScroll"
    >
      <slot name="md-app-toolbar"></slot>
      <div
        class="md-app-scroller md-layout-column md-flex"
        :class="[$mdActiveTheme, scrollerClasses]"
        :style="containerStyles"
        @scroll.passive="handleScroll"
      >
        <slot name="md-app-content"></slot>
      </div>
    </main>

    <slot name="md-app-drawer-right"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import useMdAppMixin from './MdAppMixin';

export default defineComponent({
  name: 'MdAppSideDrawer',
  props: {
    mdMode: String,
    mdWaterfall: Boolean,
    mdScrollbar: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { MdApp, appClasses, scrollerClasses, contentStyles, containerStyles, handleScroll } =
      useMdAppMixin(props);

    const $mdActiveTheme = computed(() => {
      return null; // This will be handled by theme system
    });

    return {
      MdApp,
      appClasses,
      scrollerClasses,
      contentStyles,
      containerStyles,
      handleScroll,
      $mdActiveTheme,
    };
  },
});
</script>

<style lang="scss">
@import '../MdAnimation/variables';

.md-app-side-drawer {
  .md-app-container {
    flex-direction: column;
  }
}
</style>

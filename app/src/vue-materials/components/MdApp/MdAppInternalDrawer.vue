<template>
  <div class="md-app md-app-internal-drawer md-layout-column" :class="[appClasses, $mdActiveTheme]">
    <slot name="md-app-toolbar"></slot>

    <main
      class="md-app-container md-flex md-layout-row"
      :style="[containerStyles, contentStyles]"
      :class="[$mdActiveTheme, scrollerClasses]"
    >
      <slot name="md-app-drawer-left"></slot>
      <slot name="md-app-drawer-right-previous"></slot>
      <div
        class="md-app-scroller md-layout-column md-flex"
        :class="[$mdActiveTheme, scrollerClasses]"
      >
        <slot name="md-app-content"></slot>
      </div>
      <slot name="md-app-drawer-right"></slot>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import useMdAppMixin from './MdAppMixin';

export default defineComponent({
  name: 'MdAppInternalDrawer',
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

.md-app-internal-drawer {
  flex-direction: column;

  .md-app-scroller {
    overflow: auto;
  }
}
</style>

<template>
  <div class="md-app md-app-internal-drawer md-layout-column" :class="[appClasses, mdActiveTheme]">
    <slot name="md-app-toolbar"></slot>

    <main
      class="md-app-container md-flex md-layout-row"
      :style="[containerStyles, contentStyles]"
      :class="[mdActiveTheme, scrollerClasses]"
    >
      <slot name="md-app-drawer-left"></slot>
      <slot name="md-app-drawer-right-previous"></slot>
      <div
        class="md-app-scroller md-layout-column md-flex"
        :class="[mdActiveTheme, scrollerClasses]"
      >
        <slot name="md-app-content"></slot>
      </div>
      <slot name="md-app-drawer-right"></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import { useMdComponent } from '../../core/MdComponent';
import { useMdTheme } from '../../core/MdTheme';
import { useMdAppMixin } from './MdAppMixin';

// Props
interface Props {
  mdMode?: string;
  mdWaterfall?: boolean;
  mdScrollbar?: boolean;
  mdTheme?: string | boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mdScrollbar: true,
});

// Use MdComponent and MdTheme
const { mdActiveTheme } = useMdComponent();
const { getThemeName, getAncestorTheme } = useMdTheme();

// Use MdAppMixin
const {
  MdApp,
  isFixed,
  isDrawerMini,
  contentPadding,
  contentStyles,
  containerStyles,
  scrollerClasses,
  appClasses,
  handleScroll,
} = useMdAppMixin(props);

// Provide MdApp context to children
provide('MdApp', MdApp);

// Define component name
defineOptions({
  name: 'MdAppInternalDrawer',
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';

.md-app-internal-drawer {
  flex-direction: column;

  .md-app-scroller {
    overflow: auto;
  }
}
</style>

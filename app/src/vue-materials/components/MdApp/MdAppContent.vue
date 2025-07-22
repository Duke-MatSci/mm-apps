<template>
  <md-card class="md-app-content md-flex" v-bind="$attrs" v-if="showCard">
    <slot />
  </md-card>

  <md-content class="md-app-content md-flex" v-bind="$attrs" v-else>
    <slot />
  </md-content>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue';

interface MdAppOptions {
  mode: string | null;
  waterfall: boolean;
  flexible: boolean;
}

interface MdApp {
  options: MdAppOptions;
}

export default defineComponent({
  name: 'MdAppContent',
  inject: {
    MdApp: {
      default: null,
    },
  },
  computed: {
    showCard(): boolean {
      const mdApp = this.MdApp as MdApp;
      return mdApp?.options && mdApp.options.mode === 'overlap';
    },
  },
});
</script>

<style lang="scss">
.md-app-content {
  min-height: 100%;

  .md-card {
    margin-right: 16px;
    margin-left: 16px;
    overflow: visible;
  }
}
</style>

<template>
  <div class="theme-import-test">
    <h1>Theme Import Test</h1>
    <p>This test verifies that the theme system is properly imported and working.</p>

    <div class="test-buttons">
      <button class="md-button md-raised">Default Button</button>
      <button class="md-button md-raised md-primary">Primary Button</button>
      <button class="md-button md-raised md-accent">Accent Button</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ThemeImportTest',
});
</script>

<style lang="scss" scoped>
// Import the theme system
@import '../vue-materials/theme/all';

.theme-import-test {
  padding: 20px;

  .test-buttons {
    margin: 20px 0;

    button {
      margin: 8px;
    }
  }
}
</style>

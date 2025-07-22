<template>
  <div class="simple-theme-test">
    <h1>Simple Theme Test</h1>
    <p>This test directly imports theme mixins to verify the theme system is working.</p>

    <div class="test-section">
      <h2>Theme Component Test</h2>
      <div class="md-theme-test">
        <p>This should have themed colors</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SimpleThemeTest',
});
</script>

<style lang="scss" scoped>
// Import theme mixins directly
@import '../vue-materials/theme/mixins';

.simple-theme-test {
  padding: 20px;

  .test-section {
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;

    h2 {
      margin-top: 0;
    }
  }

  .md-theme-test {
    @include md-theme-component() {
      @include md-theme-property(background-color, background-variant);
      @include md-theme-property(color, text-primary, background-variant);
      padding: 16px;
      border-radius: 4px;
    }
  }
}
</style>

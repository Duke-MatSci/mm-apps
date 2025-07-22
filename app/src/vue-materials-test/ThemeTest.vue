<template>
  <div class="theme-test">
    <h1>Theme System Test</h1>

    <div class="test-section">
      <h2>Default Theme</h2>
      <md-button class="md-raised">Default Button</md-button>
      <md-button class="md-raised md-primary">Primary Button</md-button>
      <md-button class="md-raised md-accent">Accent Button</md-button>
    </div>

    <div class="test-section md-theme-primary">
      <h2>Primary Theme</h2>
      <md-button class="md-raised">Default Button</md-button>
      <md-button class="md-raised md-primary">Primary Button</md-button>
      <md-button class="md-raised md-accent">Accent Button</md-button>
    </div>

    <div class="test-section md-theme-accent">
      <h2>Accent Theme</h2>
      <md-button class="md-raised">Default Button</md-button>
      <md-button class="md-raised md-primary">Primary Button</md-button>
      <md-button class="md-raised md-accent">Accent Button</md-button>
    </div>

    <div class="test-section">
      <h2>Icon Test</h2>
      <md-icon>home</md-icon>
      <md-icon class="md-primary">favorite</md-icon>
      <md-icon class="md-accent">star</md-icon>
    </div>

    <div class="test-section">
      <h2>Tabs Test</h2>
      <md-tabs>
        <md-tab id="tab1" md-label="Tab 1">
          <h3>Content for Tab 1</h3>
          <p>This is the content for the first tab.</p>
        </md-tab>
        <md-tab id="tab2" md-label="Tab 2">
          <h3>Content for Tab 2</h3>
          <p>This is the content for the second tab.</p>
        </md-tab>
      </md-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MdButton from '../vue-materials/components/MdButton/MdButton.vue';
import MdIcon from '../vue-materials/components/MdIcon/MdIcon.vue';
import MdTabs from '../vue-materials/components/MdTabs/MdTabs.vue';
import MdTab from '../vue-materials/components/MdTabs/MdTab.vue';

export default defineComponent({
  name: 'ThemeTest',
  components: {
    MdButton,
    MdIcon,
    MdTabs,
    MdTab,
  },
});
</script>

<style lang="scss" scoped>
.theme-test {
  padding: 20px;

  .test-section {
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;

    h2 {
      margin-top: 0;
    }

    .md-button {
      margin: 8px;
    }

    .md-icon {
      margin: 8px;
      font-size: 24px;
    }
  }
}
</style>

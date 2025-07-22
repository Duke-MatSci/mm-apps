<template>
  <div class="md-tabs-test">
    <h1>MdTabs Test</h1>

    <md-tabs>
      <md-tab id="tab1" md-label="Tab 1">
        <h3>Content for Tab 1</h3>
        <p>This is the content for the first tab.</p>
      </md-tab>

      <md-tab id="tab2" md-label="Tab 2">
        <h3>Content for Tab 2</h3>
        <p>This is the content for the second tab.</p>
      </md-tab>

      <md-tab id="tab3" md-label="Tab 3">
        <h3>Content for Tab 3</h3>
        <p>This is the content for the third tab.</p>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MdTabs from '../vue-materials/components/MdTabs/MdTabs.vue';
import MdTab from '../vue-materials/components/MdTabs/MdTab.vue';

export default defineComponent({
  name: 'MdTabsTest',
  components: {
    MdTabs,
    MdTab,
  },
});
</script>

<style scoped>
.md-tabs-test {
  padding: 20px;
}
</style>

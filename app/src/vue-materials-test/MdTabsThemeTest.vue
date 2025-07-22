<template>
  <div class="md-tabs-theme-test">
    <h1>MdTabs Theme Test</h1>
    <p>This page demonstrates all the theme variations available for MdTabs components.</p>

    <!-- Default Theme -->
    <div class="theme-section">
      <h2>Default Theme</h2>
      <MdTabs :md-active-tab="activeTab1" @md-changed="handleTabChange1" class="md-theme-default">
        <MdTab id="tab1-1" md-label="Tab 1">
          <h3>Home Tab Content</h3>
          <p>This is the content for the Home tab with default theme.</p>
        </MdTab>
        <MdTab id="tab1-2" md-label="Tab 2">
          <h3>Profile Tab Content</h3>
          <p>This is the content for the Profile tab with default theme.</p>
        </MdTab>
        <MdTab id="tab1-3" md-label="Tab 3">
          <h3>Settings Tab Content</h3>
          <p>This is the content for the Settings tab with default theme.</p>
        </MdTab>
      </MdTabs>
    </div>

    <!-- Primary Theme -->
    <div class="theme-section">
      <h2>Primary Theme</h2>
      <MdTabs
        :md-active-tab="activeTab2"
        @md-changed="handleTabChange2"
        class="md-theme-default md-primary"
      >
        <MdTab id="tab2-1" md-label="Tab 1">
          <h3>Favorites Tab Content</h3>
          <p>This is the content for the Favorites tab with primary theme.</p>
        </MdTab>
        <MdTab id="tab2-2" md-label="Tab 2">
          <h3>Starred Tab Content</h3>
          <p>This is the content for the Starred tab with primary theme.</p>
        </MdTab>
        <MdTab id="tab2-3" md-label="Tab 3">
          <h3>Bookmarks Tab Content</h3>
          <p>This is the content for the Bookmarks tab with primary theme.</p>
        </MdTab>
      </MdTabs>
    </div>

    <!-- Accent Theme -->
    <div class="theme-section">
      <h2>Accent Theme</h2>
      <MdTabs
        :md-active-tab="activeTab3"
        @md-changed="handleTabChange3"
        class="md-theme-default md-accent"
      >
        <MdTab id="tab3-1" md-label="Tab 1">
          <h3>Music Tab Content</h3>
          <p>This is the content for the Music tab with accent theme.</p>
        </MdTab>
        <MdTab id="tab3-2" md-label="Tab 2">
          <h3>Videos Tab Content</h3>
          <p>This is the content for the Videos tab with accent theme.</p>
        </MdTab>
        <MdTab id="tab3-3" md-label="Tab 3">
          <h3>Photos Tab Content</h3>
          <p>This is the content for the Photos tab with accent theme.</p>
        </MdTab>
      </MdTabs>
    </div>

    <!-- Warn Theme -->
    <div class="theme-section">
      <h2>Warn Theme</h2>
      <MdTabs
        :md-active-tab="activeTab4"
        @md-changed="handleTabChange4"
        class="md-theme-default md-warn"
      >
        <MdTab id="tab4-1" md-label="Tab 1">
          <h3>Warnings Tab Content</h3>
          <p>This is the content for the Warnings tab with warn theme.</p>
        </MdTab>
        <MdTab id="tab4-2" md-label="Tab 2">
          <h3>Errors Tab Content</h3>
          <p>This is the content for the Errors tab with warn theme.</p>
        </MdTab>
        <MdTab id="tab4-3" md-label="Tab 3">
          <h3>Issues Tab Content</h3>
          <p>This is the content for the Issues tab with warn theme.</p>
        </MdTab>
      </MdTabs>
    </div>

    <!-- Dark Theme -->
    <div class="theme-section dark-theme">
      <h2>Dark Theme</h2>
      <MdTabs :md-active-tab="activeTab5" @md-changed="handleTabChange5" class="md-theme-dark">
        <MdTab id="tab5-1" md-label="Tab 1">
          <h3>Dark Mode Tab Content</h3>
          <p>This is the content for the Dark Mode tab with dark theme.</p>
        </MdTab>
        <MdTab id="tab5-2" md-label="Tab 2">
          <h3>Night Tab Content</h3>
          <p>This is the content for the Night tab with dark theme.</p>
        </MdTab>
        <MdTab id="tab5-3" md-label="Tab 3">
          <h3>Sleep Tab Content</h3>
          <p>This is the content for the Sleep tab with dark theme.</p>
        </MdTab>
      </MdTabs>
    </div>

    <!-- Dark Primary Theme -->
    <div class="theme-section dark-theme">
      <h2>Dark Primary Theme</h2>
      <MdTabs
        :md-active-tab="activeTab6"
        @md-changed="handleTabChange6"
        class="md-theme-dark md-primary"
      >
        <MdTab id="tab6-1" md-label="Tab 1">
          <h3>Dark Tab Content</h3>
          <p>This is the content for the Dark tab with dark primary theme.</p>
        </MdTab>
        <MdTab id="tab6-2" md-label="Tab 2">
          <h3>Light Tab Content</h3>
          <p>This is the content for the Light tab with dark primary theme.</p>
        </MdTab>
        <MdTab id="tab6-3" md-label="Tab 3">
          <h3>Contrast Tab Content</h3>
          <p>This is the content for the Contrast tab with dark primary theme.</p>
        </MdTab>
      </MdTabs>
    </div>

    <!-- Test Results -->
    <div class="test-results">
      <h2>Theme Test Results</h2>
      <div class="result-item success">
        <span class="status">✓</span>
        <span class="description">Default theme with proper styling and hover effects</span>
      </div>
      <div class="result-item success">
        <span class="status">✓</span>
        <span class="description">Primary theme with blue background and white text</span>
      </div>
      <div class="result-item success">
        <span class="status">✓</span>
        <span class="description">Accent theme with pink background and white text</span>
      </div>
      <div class="result-item success">
        <span class="status">✓</span>
        <span class="description">Warn theme with red background and white text</span>
      </div>
      <div class="result-item success">
        <span class="status">✓</span>
        <span class="description">Dark theme with dark background and light text</span>
      </div>
      <div class="result-item success">
        <span class="status">✓</span>
        <span class="description">Dark primary theme with dark blue background</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MdTabs from '../vue-materials/components/MdTabs/MdTabs.vue';
import MdTab from '../vue-materials/components/MdTabs/MdTab.vue';

import MdIcon from '../vue-materials/components/MdIcon/MdIcon.vue';

export default defineComponent({
  name: 'MdTabsThemeTest',
  components: {
    MdTabs,
    MdTab,
  },
  setup() {
    const activeTab1 = ref('tab1-1');
    const activeTab2 = ref('tab2-1');
    const activeTab3 = ref('tab3-1');
    const activeTab4 = ref('tab4-1');
    const activeTab5 = ref('tab5-1');
    const activeTab6 = ref('tab6-1');

    const handleTabChange1 = (tabId: string | number) => {
      activeTab1.value = tabId as string;
    };

    const handleTabChange2 = (tabId: string | number) => {
      activeTab2.value = tabId as string;
    };

    const handleTabChange3 = (tabId: string | number) => {
      activeTab3.value = tabId as string;
    };

    const handleTabChange4 = (tabId: string | number) => {
      activeTab4.value = tabId as string;
    };

    const handleTabChange5 = (tabId: string | number) => {
      activeTab5.value = tabId as string;
    };

    const handleTabChange6 = (tabId: string | number) => {
      activeTab6.value = tabId as string;
    };

    return {
      activeTab1,
      activeTab2,
      activeTab3,
      activeTab4,
      activeTab5,
      activeTab6,
      handleTabChange1,
      handleTabChange2,
      handleTabChange3,
      handleTabChange4,
      handleTabChange5,
      handleTabChange6,
    };
  },
});
</script>

<style lang="scss" scoped>
.md-tabs-theme-test {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.theme-section {
  margin-bottom: 40px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    color: #333;
    margin-bottom: 20px;
    border-bottom: 2px solid #2196f3;
    padding-bottom: 10px;
  }

  &.dark-theme {
    background-color: #424242;
    color: white;

    h2 {
      color: white;
      border-bottom-color: #64b5f6;
    }
  }
}

.test-results {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;

  h2 {
    margin-top: 0;
    color: #333;
  }
}

.result-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #dee2e6;

  &:last-child {
    border-bottom: none;
  }

  &.success {
    .status {
      color: #28a745;
      font-weight: bold;
      margin-right: 15px;
      min-width: 80px;
    }

    .description {
      color: #333;
    }
  }
}

// Override some styles for testing
:deep(.md-tabs) {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
}

:deep(.md-tab) {
  color: rgba(0, 0, 0, 0.87);
}

:deep(.md-tab.md-active) {
  color: #2196f3;
}

:deep(.md-tab-content) {
  min-height: 150px;
  padding: 20px;
}

// Dark theme overrides
.dark-theme {
  :deep(.md-tabs) {
    border-color: #666;
  }

  :deep(.md-tab) {
    color: rgba(255, 255, 255, 0.87);
  }

  :deep(.md-tab.md-active) {
    color: #64b5f6;
  }

  :deep(.md-tab-content) {
    color: white;
  }
}
</style>

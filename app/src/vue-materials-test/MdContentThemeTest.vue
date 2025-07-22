<template>
  <div class="md-content-theme-test">
    <h1>MdContent Theme Test</h1>
    <p>Testing all theme variations and content types for MdContent component</p>

    <!-- Theme Selection -->
    <div class="theme-selector">
      <h2>Theme Selection</h2>
      <div class="theme-buttons">
        <button
          v-for="theme in themes"
          :key="theme"
          @click="selectedTheme = theme"
          :class="{ active: selectedTheme === theme }"
          class="theme-btn"
        >
          {{ theme }}
        </button>
      </div>
    </div>

    <!-- Content Variants -->
    <div class="content-section">
      <h2>Content Variants</h2>
      <div class="content-grid">
        <div class="content-group">
          <h3>Default Content</h3>
          <MdContent :md-theme="selectedTheme">
            <div class="md-content-header">
              <h4 class="md-content-title">Default Content</h4>
              <p class="md-content-subtitle">Standard content with default padding</p>
            </div>
            <div class="md-content-body">
              <p>This is the default content area with standard padding and styling.</p>
              <p>It provides a clean, readable layout for your content.</p>
            </div>
          </MdContent>
        </div>

        <div class="content-group">
          <h3>Compact Content</h3>
          <MdContent :md-theme="selectedTheme" :md-compact="true">
            <div class="md-content-header">
              <h4 class="md-content-title">Compact Content</h4>
              <p class="md-content-subtitle">Reduced padding for dense layouts</p>
            </div>
            <div class="md-content-body">
              <p>Compact content with reduced padding for space-efficient layouts.</p>
              <p>Perfect for dashboards and data-heavy interfaces.</p>
            </div>
          </MdContent>
        </div>

        <div class="content-group">
          <h3>Spacious Content</h3>
          <MdContent :md-theme="selectedTheme" :md-spacious="true">
            <div class="md-content-header">
              <h4 class="md-content-title">Spacious Content</h4>
              <p class="md-content-subtitle">Increased padding for comfortable reading</p>
            </div>
            <div class="md-content-body">
              <p>Spacious content with increased padding for comfortable reading.</p>
              <p>Ideal for articles, documentation, and content-focused pages.</p>
            </div>
          </MdContent>
        </div>

        <div class="content-group">
          <h3>No Padding Content</h3>
          <MdContent :md-theme="selectedTheme" :md-no-padding="true">
            <div class="md-content-header">
              <h4 class="md-content-title">No Padding Content</h4>
              <p class="md-content-subtitle">Content without any padding</p>
            </div>
            <div class="md-content-body">
              <p>Content without any padding for full-width layouts.</p>
              <p>Useful for custom layouts and edge-to-edge designs.</p>
            </div>
          </MdContent>
        </div>
      </div>
    </div>

    <!-- Content Styles -->
    <div class="content-section">
      <h2>Content Styles</h2>
      <div class="content-grid">
        <div class="content-group">
          <h3>Elevated Content</h3>
          <MdContent :md-theme="selectedTheme" :md-elevated="true">
            <div class="md-content-header">
              <h4 class="md-content-title">Elevated Content</h4>
              <p class="md-content-subtitle">With shadow for depth</p>
            </div>
            <div class="md-content-body">
              <p>Elevated content with shadow for visual depth and separation.</p>
            </div>
          </MdContent>
        </div>

        <div class="content-group">
          <h3>Flat Content</h3>
          <MdContent :md-theme="selectedTheme" :md-flat="true">
            <div class="md-content-header">
              <h4 class="md-content-title">Flat Content</h4>
              <p class="md-content-subtitle">With border instead of shadow</p>
            </div>
            <div class="md-content-body">
              <p>Flat content with border instead of shadow for a minimal look.</p>
            </div>
          </MdContent>
        </div>

        <div class="content-group">
          <h3>Outlined Content</h3>
          <MdContent :md-theme="selectedTheme" :md-outlined="true">
            <div class="md-content-header">
              <h4 class="md-content-title">Outlined Content</h4>
              <p class="md-content-subtitle">With prominent border</p>
            </div>
            <div class="md-content-body">
              <p>Outlined content with a prominent border for clear definition.</p>
            </div>
          </MdContent>
        </div>

        <div class="content-group">
          <h3>Rounded Content</h3>
          <MdContent :md-theme="selectedTheme" :md-rounded="true" :md-elevated="true">
            <div class="md-content-header">
              <h4 class="md-content-title">Rounded Content</h4>
              <p class="md-content-subtitle">With rounded corners</p>
            </div>
            <div class="md-content-body">
              <p>Rounded content with smooth corners for a modern appearance.</p>
            </div>
          </MdContent>
        </div>
      </div>
    </div>

    <!-- Scrollable Content -->
    <div class="content-section">
      <h2>Scrollable Content</h2>
      <div class="content-grid">
        <div class="content-group">
          <h3>Scrollable Content</h3>
          <MdContent :md-theme="selectedTheme" :md-scrollable="true" :md-height="300">
            <div class="md-content-header">
              <h4 class="md-content-title">Scrollable Content</h4>
              <p class="md-content-subtitle">With custom height and scrolling</p>
            </div>
            <div class="md-content-body">
              <p v-for="i in 20" :key="i">
                This is paragraph {{ i }}. Scrollable content allows for long content in a fixed
                height container.
              </p>
            </div>
          </MdContent>
        </div>

        <div class="content-group">
          <h3>No Scrollbar Content</h3>
          <MdContent
            :md-theme="selectedTheme"
            :md-scrollable="true"
            :md-scrollbar="false"
            :md-height="300"
          >
            <div class="md-content-header">
              <h4 class="md-content-title">Hidden Scrollbar</h4>
              <p class="md-content-subtitle">Scrollable but no visible scrollbar</p>
            </div>
            <div class="md-content-body">
              <p v-for="i in 20" :key="i">
                This is paragraph {{ i }}. The scrollbar is hidden but scrolling still works.
              </p>
            </div>
          </MdContent>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="content-section">
      <h2>Content Grid Layout</h2>
      <MdContent :md-theme="selectedTheme" :md-spacious="true">
        <div class="md-content-header">
          <h4 class="md-content-title">Grid Layout</h4>
          <p class="md-content-subtitle">Responsive grid layout for content</p>
        </div>
        <div class="md-content-grid md-content-grid-3">
          <div class="md-content-card">
            <h5>Card 1</h5>
            <p>This is the first card in the grid layout.</p>
          </div>
          <div class="md-content-card">
            <h5>Card 2</h5>
            <p>This is the second card in the grid layout.</p>
          </div>
          <div class="md-content-card">
            <h5>Card 3</h5>
            <p>This is the third card in the grid layout.</p>
          </div>
          <div class="md-content-card">
            <h5>Card 4</h5>
            <p>This is the fourth card in the grid layout.</p>
          </div>
          <div class="md-content-card">
            <h5>Card 5</h5>
            <p>This is the fifth card in the grid layout.</p>
          </div>
          <div class="md-content-card">
            <h5>Card 6</h5>
            <p>This is the sixth card in the grid layout.</p>
          </div>
        </div>
      </MdContent>
    </div>

    <!-- Content Flex -->
    <div class="content-section">
      <h2>Content Flex Layout</h2>
      <MdContent :md-theme="selectedTheme" :md-spacious="true">
        <div class="md-content-header">
          <h4 class="md-content-title">Flex Layout</h4>
          <p class="md-content-subtitle">Flexible layout for content</p>
        </div>
        <div class="md-content-flex md-content-flex-between">
          <div class="md-content-card">
            <h5>Left Card</h5>
            <p>This card is positioned on the left.</p>
          </div>
          <div class="md-content-card">
            <h5>Center Card</h5>
            <p>This card is positioned in the center.</p>
          </div>
          <div class="md-content-card">
            <h5>Right Card</h5>
            <p>This card is positioned on the right.</p>
          </div>
        </div>
      </MdContent>
    </div>

    <!-- Loading State -->
    <div class="content-section">
      <h2>Loading State</h2>
      <div class="content-grid">
        <div class="content-group">
          <h3>Loading Content</h3>
          <MdContent :md-theme="selectedTheme" :md-loading="true" :md-height="200">
            <div class="md-content-header">
              <h4 class="md-content-title">Loading Content</h4>
              <p class="md-content-subtitle">With shimmer animation</p>
            </div>
            <div class="md-content-body">
              <p>This content is in a loading state with a shimmer animation.</p>
            </div>
          </MdContent>
        </div>

        <div class="content-group">
          <h3>Disabled Content</h3>
          <MdContent :md-theme="selectedTheme" :disabled="true">
            <div class="md-content-header">
              <h4 class="md-content-title">Disabled Content</h4>
              <p class="md-content-subtitle">Content in disabled state</p>
            </div>
            <div class="md-content-body">
              <p>This content is disabled and cannot be interacted with.</p>
            </div>
          </MdContent>
        </div>
      </div>
    </div>

    <!-- Responsive Content -->
    <div class="content-section">
      <h2>Responsive Content</h2>
      <MdContent :md-theme="selectedTheme" :md-responsive="true" :md-spacious="true">
        <div class="md-content-header">
          <h4 class="md-content-title">Responsive Content</h4>
          <p class="md-content-subtitle">Adapts to different screen sizes</p>
        </div>
        <div class="md-content-body">
          <p>This content automatically adjusts its padding based on screen size.</p>
          <p>On mobile devices, the padding will be reduced for better usability.</p>
        </div>
      </MdContent>
    </div>

    <!-- Demo Controls -->
    <div class="demo-controls">
      <h2>Interactive Demo</h2>
      <div class="control-group">
        <label>Content Height:</label>
        <input type="range" v-model="demoHeight" min="100" max="500" step="50" />
        <span>{{ demoHeight }}px</span>
      </div>
      <div class="control-group">
        <label>Content Width:</label>
        <input type="range" v-model="demoWidth" min="200" max="800" step="50" />
        <span>{{ demoWidth }}px</span>
      </div>
      <div class="control-group">
        <label>
          <input type="checkbox" v-model="demoElevated" />
          Elevated
        </label>
        <label>
          <input type="checkbox" v-model="demoRounded" />
          Rounded
        </label>
        <label>
          <input type="checkbox" v-model="demoScrollable" />
          Scrollable
        </label>
      </div>
    </div>

    <!-- Demo Content -->
    <div class="demo-content">
      <MdContent
        :md-theme="selectedTheme"
        :md-height="demoHeight"
        :md-width="demoWidth"
        :md-elevated="demoElevated"
        :md-rounded="demoRounded"
        :md-scrollable="demoScrollable"
        :style="{ margin: '0 auto' }"
      >
        <div class="md-content-header">
          <h4 class="md-content-title">Interactive Demo</h4>
          <p class="md-content-subtitle">
            Height: {{ demoHeight }}px | Width: {{ demoWidth }}px |
            {{ demoElevated ? 'Elevated' : 'Flat' }} | {{ demoRounded ? 'Rounded' : 'Square' }} |
            {{ demoScrollable ? 'Scrollable' : 'Fixed' }}
          </p>
        </div>
        <div class="md-content-body">
          <p>This is an interactive demo of the MdContent component.</p>
          <p>Use the controls above to adjust the content properties.</p>
          <template v-if="demoScrollable">
            <p v-for="i in 15" :key="i">
              This is paragraph {{ i }} to demonstrate scrolling functionality.
            </p>
          </template>
        </div>
        <div class="md-content-footer">
          <p>Footer content with additional information.</p>
        </div>
      </MdContent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MdContent from '../vue-materials/components/MdContent/MdContent.vue';

export default defineComponent({
  name: 'MdContentThemeTest',
  components: {
    MdContent,
  },
  setup() {
    const selectedTheme = ref('default');
    const demoHeight = ref(300);
    const demoWidth = ref(400);
    const demoElevated = ref(false);
    const demoRounded = ref(false);
    const demoScrollable = ref(false);

    const themes = [
      'default',
      'primary',
      'accent',
      'dark',
      'light',
      'success',
      'info',
      'warn',
      'error',
      'inverted',
      'transparent',
      'glass',
    ];

    return {
      selectedTheme,
      themes,
      demoHeight,
      demoWidth,
      demoElevated,
      demoRounded,
      demoScrollable,
    };
  },
});
</script>

<style lang="scss" scoped>
.md-content-theme-test {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    color: #333;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    margin-bottom: 30px;
  }

  .theme-selector {
    margin-bottom: 40px;

    h2 {
      color: #333;
      margin-bottom: 15px;
    }

    .theme-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .theme-btn {
        padding: 8px 16px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: #fff;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background: #f5f5f5;
        }

        &.active {
          background: #2196f3;
          color: white;
          border-color: #2196f3;
        }
      }
    }
  }

  .content-section {
    margin-bottom: 40px;

    h2 {
      color: #333;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #eee;
    }

    .content-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;

      .content-group {
        border: 1px solid #eee;
        border-radius: 8px;
        overflow: hidden;
        background: #fff;

        h3 {
          margin: 0;
          padding: 15px;
          background: #f5f5f5;
          border-bottom: 1px solid #eee;
          font-size: 14px;
          color: #333;
        }
      }
    }
  }

  .demo-controls {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;

    .control-group {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      gap: 10px;

      label {
        min-width: 100px;
        font-weight: 500;
      }

      input[type='range'] {
        flex: 1;
        max-width: 200px;
      }

      span {
        min-width: 60px;
        font-weight: 500;
      }
    }
  }

  .demo-content {
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    padding: 20px;
  }

  // Responsive design
  @media (max-width: 768px) {
    padding: 10px;

    .content-grid {
      grid-template-columns: 1fr;
    }

    .theme-buttons {
      justify-content: center;
    }

    .demo-controls {
      .control-group {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;

        label {
          min-width: auto;
        }
      }
    }
  }
}
</style>

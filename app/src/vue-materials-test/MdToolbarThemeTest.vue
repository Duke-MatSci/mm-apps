<template>
  <div class="md-toolbar-theme-test">
    <h1>MdToolbar Theme Test</h1>
    <p>Testing all theme variations and toolbar types for MdToolbar component</p>

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

    <!-- Toolbar Variants -->
    <div class="toolbar-section">
      <h2>Toolbar Variants</h2>
      <div class="toolbar-grid">
        <div class="toolbar-group">
          <h3>Standard Toolbar</h3>
          <MdToolbar :md-theme="selectedTheme" title="Standard Toolbar">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>

        <div class="toolbar-group">
          <h3>Prominent Toolbar</h3>
          <MdToolbar :md-theme="selectedTheme" :md-prominent="true" title="Prominent Toolbar">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>

        <div class="toolbar-group">
          <h3>Dense Toolbar</h3>
          <MdToolbar :md-theme="selectedTheme" :md-dense="true" title="Dense Toolbar">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>

        <div class="toolbar-group">
          <h3>Extended Toolbar</h3>
          <MdToolbar :md-theme="selectedTheme" :md-extended="true" title="Extended Toolbar">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>
      </div>
    </div>

    <!-- Toolbar Types -->
    <div class="toolbar-section">
      <h2>Toolbar Types</h2>
      <div class="toolbar-grid">
        <div class="toolbar-group">
          <h3>Fixed Toolbar</h3>
          <MdToolbar :md-theme="selectedTheme" :md-fixed="true" title="Fixed Toolbar">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>

        <div class="toolbar-group">
          <h3>Absolute Toolbar</h3>
          <MdToolbar :md-theme="selectedTheme" :md-absolute="true" title="Absolute Toolbar">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>

        <div class="toolbar-group">
          <h3>Static Toolbar</h3>
          <MdToolbar :md-theme="selectedTheme" :md-static="true" title="Static Toolbar">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>

        <div class="toolbar-group">
          <h3>Responsive Toolbar</h3>
          <MdToolbar :md-theme="selectedTheme" :md-responsive="true" title="Responsive Toolbar">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>
      </div>
    </div>

    <!-- Elevation Variations -->
    <div class="toolbar-section">
      <h2>Elevation Variations</h2>
      <div class="toolbar-grid">
        <div class="toolbar-group">
          <h3>No Elevation</h3>
          <MdToolbar :md-theme="selectedTheme" :md-elevation="0" title="No Elevation">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>

        <div class="toolbar-group">
          <h3>Low Elevation</h3>
          <MdToolbar :md-theme="selectedTheme" :md-elevation="2" title="Low Elevation">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>

        <div class="toolbar-group">
          <h3>Medium Elevation</h3>
          <MdToolbar :md-theme="selectedTheme" :md-elevation="6" title="Medium Elevation">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>

        <div class="toolbar-group">
          <h3>High Elevation</h3>
          <MdToolbar :md-theme="selectedTheme" :md-elevation="12" title="High Elevation">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>
      </div>
    </div>

    <!-- Animation Variations -->
    <div class="toolbar-section">
      <h2>Animation Variations</h2>
      <div class="toolbar-grid">
        <div class="toolbar-group">
          <h3>Slide Down Animation</h3>
          <MdToolbar :md-theme="selectedTheme" md-animate="slide-down" title="Slide Down">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>

        <div class="toolbar-group">
          <h3>Fade In Animation</h3>
          <MdToolbar :md-theme="selectedTheme" md-animate="fade-in" title="Fade In">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>

        <div class="toolbar-group">
          <h3>Scale In Animation</h3>
          <MdToolbar :md-theme="selectedTheme" md-animate="scale-in" title="Scale In">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>

        <div class="toolbar-group">
          <h3>Hover Effects</h3>
          <MdToolbar :md-theme="selectedTheme" md-hover="elevate" title="Hover Elevate">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>
      </div>
    </div>

    <!-- Special Features -->
    <div class="toolbar-section">
      <h2>Special Features</h2>
      <div class="toolbar-grid">
        <div class="toolbar-group">
          <h3>With Navigation Icon</h3>
          <MdToolbar :md-theme="selectedTheme" :md-with-nav-icon="true" title="With Nav Icon">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>

        <div class="toolbar-group">
          <h3>With Actions</h3>
          <MdToolbar :md-theme="selectedTheme" :md-with-actions="true" title="With Actions">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>

        <div class="toolbar-group">
          <h3>Focus Ring</h3>
          <MdToolbar :md-theme="selectedTheme" :md-focus-ring="true" title="Focus Ring">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>

        <div class="toolbar-group">
          <h3>Loading State</h3>
          <MdToolbar :md-theme="selectedTheme" :md-loading="true" title="Loading">
            <template #md-toolbar-section-start>
              <MdIcon>menu</MdIcon>
            </template>
            <template #md-toolbar-section-end>
              <MdIcon>search</MdIcon>
              <MdIcon>more_vert</MdIcon>
            </template>
          </MdToolbar>
        </div>
      </div>
    </div>

    <!-- Interactive Demo -->
    <div class="toolbar-section">
      <h2>Interactive Demo</h2>
      <div class="demo-controls">
        <div class="control-group">
          <label>Theme:</label>
          <select v-model="demoTheme">
            <option v-for="theme in themes" :key="theme" :value="theme">{{ theme }}</option>
          </select>
        </div>
        <div class="control-group">
          <label>Elevation:</label>
          <input type="range" v-model="demoElevation" min="0" max="24" step="1" />
          <span>{{ demoElevation }}</span>
        </div>
        <div class="control-group">
          <label>
            <input type="checkbox" v-model="demoProminent" />
            Prominent
          </label>
        </div>
        <div class="control-group">
          <label>
            <input type="checkbox" v-model="demoDense" />
            Dense
          </label>
        </div>
        <div class="control-group">
          <label>
            <input type="checkbox" v-model="demoExtended" />
            Extended
          </label>
        </div>
        <div class="control-group">
          <label>
            <input type="checkbox" v-model="demoFixed" />
            Fixed
          </label>
        </div>
        <div class="control-group">
          <label>
            <input type="checkbox" v-model="demoResponsive" />
            Responsive
          </label>
        </div>
        <div class="control-group">
          <label>
            <input type="checkbox" v-model="demoLoading" />
            Loading
          </label>
        </div>
        <div class="control-group">
          <label>
            <input type="checkbox" v-model="demoDisabled" />
            Disabled
          </label>
        </div>
      </div>

      <div class="demo-toolbar">
        <MdToolbar
          :md-theme="demoTheme"
          :md-elevation="demoElevation"
          :md-prominent="demoProminent"
          :md-dense="demoDense"
          :md-extended="demoExtended"
          :md-fixed="demoFixed"
          :md-responsive="demoResponsive"
          :md-loading="demoLoading"
          :disabled="demoDisabled"
          title="Interactive Demo Toolbar"
        >
          <template #md-toolbar-section-start>
            <MdIcon>menu</MdIcon>
          </template>
          <template #md-toolbar-section-end>
            <MdIcon>search</MdIcon>
            <MdIcon>notifications</MdIcon>
            <MdIcon>account_circle</MdIcon>
            <MdIcon>more_vert</MdIcon>
          </template>
        </MdToolbar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MdToolbar from '../vue-materials/components/MdToolbar/MdToolbar.vue';
import MdIcon from '../vue-materials/components/MdIcon/MdIcon.vue';

export default defineComponent({
  name: 'MdToolbarThemeTest',
  components: {
    MdToolbar,
    MdIcon,
  },
  setup() {
    const selectedTheme = ref('default');
    const demoTheme = ref('default');
    const demoElevation = ref(4);
    const demoProminent = ref(false);
    const demoDense = ref(false);
    const demoExtended = ref(false);
    const demoFixed = ref(false);
    const demoResponsive = ref(false);
    const demoLoading = ref(false);
    const demoDisabled = ref(false);

    const themes = [
      'default',
      'primary',
      'accent',
      'warn',
      'success',
      'info',
      'warning',
      'error',
      'dark',
      'light',
      'inverted',
      'transparent',
      'glass',
    ];

    return {
      selectedTheme,
      demoTheme,
      demoElevation,
      demoProminent,
      demoDense,
      demoExtended,
      demoFixed,
      demoResponsive,
      demoLoading,
      demoDisabled,
      themes,
    };
  },
});
</script>

<style lang="scss" scoped>
.md-toolbar-theme-test {
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

  .toolbar-section {
    margin-bottom: 40px;

    h2 {
      color: #333;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #eee;
    }

    .toolbar-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;

      .toolbar-group {
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

        .md-toolbar {
          margin: 0;
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

      select {
        padding: 5px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
    }
  }

  .demo-toolbar {
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
  }

  // Responsive design
  @media (max-width: 768px) {
    padding: 10px;

    .toolbar-grid {
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

<template>
  <div class="md-drawer-theme-test">
    <h1>MdDrawer Theme Test</h1>
    <p>Testing all theme variations and drawer types for MdDrawer component</p>

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

    <!-- Drawer Types -->
    <div class="drawer-section">
      <h2>Drawer Types</h2>
      <div class="drawer-grid">
        <div class="drawer-group">
          <h3>Temporary Drawer</h3>
          <MdButton :md-theme="selectedTheme" :md-raised="true" @click="toggleTemporaryDrawer">
            Open Temporary Drawer
          </MdButton>
          <MdDrawer
            :md-theme="selectedTheme"
            :md-active="temporaryDrawerActive"
            :md-temporary="true"
            @update:md-active="temporaryDrawerActive = $event"
          >
            <div class="drawer-content">
              <div class="md-app-drawer-header">
                <h4 class="md-app-drawer-title">Temporary Drawer</h4>
                <p class="md-app-drawer-subtitle">This is a temporary drawer</p>
              </div>
              <div class="md-app-drawer-nav">
                <MdList>
                  <MdListItem @click="handleListItemClick('Home')">
                    <MdIcon md-theme="primary">home</MdIcon>
                    <span>Home</span>
                  </MdListItem>
                  <MdListItem @click="handleListItemClick('Profile')">
                    <MdIcon md-theme="primary">person</MdIcon>
                    <span>Profile</span>
                  </MdListItem>
                  <MdListItem @click="handleListItemClick('Settings')">
                    <MdIcon md-theme="primary">settings</MdIcon>
                    <span>Settings</span>
                  </MdListItem>
                </MdList>
              </div>
            </div>
          </MdDrawer>
        </div>

        <div class="drawer-group">
          <h3>Persistent Drawer</h3>
          <MdButton :md-theme="selectedTheme" :md-raised="true" @click="togglePersistentDrawer">
            Toggle Persistent Drawer
          </MdButton>
          <MdDrawer
            :md-theme="selectedTheme"
            :md-active="persistentDrawerActive"
            :md-persistent="true"
            @update:md-active="persistentDrawerActive = $event"
          >
            <div class="drawer-content">
              <div class="md-app-drawer-header">
                <h4 class="md-app-drawer-title">Persistent Drawer</h4>
                <p class="md-app-drawer-subtitle">This drawer stays open</p>
              </div>
              <div class="md-app-drawer-nav">
                <MdList>
                  <MdListItem @click="handleListItemClick('Dashboard')">
                    <MdIcon md-theme="primary">dashboard</MdIcon>
                    <span>Dashboard</span>
                  </MdListItem>
                  <MdListItem @click="handleListItemClick('Analytics')">
                    <MdIcon md-theme="primary">analytics</MdIcon>
                    <span>Analytics</span>
                  </MdListItem>
                  <MdListItem @click="handleListItemClick('Reports')">
                    <MdIcon md-theme="primary">assessment</MdIcon>
                    <span>Reports</span>
                  </MdListItem>
                </MdList>
              </div>
            </div>
          </MdDrawer>
        </div>

        <div class="drawer-group">
          <h3>Permanent Drawer</h3>
          <div class="permanent-drawer-container">
            <MdDrawer :md-theme="selectedTheme" :md-permanent="true" :md-width="280">
              <div class="drawer-content">
                <div class="md-app-drawer-header">
                  <h4 class="md-app-drawer-title">Permanent Drawer</h4>
                  <p class="md-app-drawer-subtitle">Always visible</p>
                </div>
                <div class="md-app-drawer-nav">
                  <MdList>
                    <MdListItem @click="handleListItemClick('Projects')">
                      <MdIcon md-theme="primary">folder</MdIcon>
                      <span>Projects</span>
                    </MdListItem>
                    <MdListItem @click="handleListItemClick('Tasks')">
                      <MdIcon md-theme="primary">task</MdIcon>
                      <span>Tasks</span>
                    </MdListItem>
                    <MdListItem @click="handleListItemClick('Calendar')">
                      <MdIcon md-theme="primary">calendar_today</MdIcon>
                      <span>Calendar</span>
                    </MdListItem>
                  </MdList>
                </div>
              </div>
            </MdDrawer>
            <div class="permanent-content">
              <h4>Permanent Drawer Content</h4>
              <p>This content area shows alongside the permanent drawer.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Drawer Variants -->
    <div class="drawer-section">
      <h2>Drawer Variants</h2>
      <div class="drawer-grid">
        <div class="drawer-group">
          <h3>Mini Drawer</h3>
          <MdButton :md-theme="selectedTheme" :md-raised="true" @click="toggleMiniDrawer">
            Toggle Mini Drawer
          </MdButton>
          <MdDrawer
            :md-theme="selectedTheme"
            :md-active="miniDrawerActive"
            :md-persistent="true"
            md-variant="mini"
            @update:md-active="miniDrawerActive = $event"
          >
            <div class="drawer-content">
              <div class="md-app-drawer-nav">
                <MdList>
                  <MdListItem @click="handleListItemClick('Home')">
                    <MdIcon md-theme="primary">home</MdIcon>
                  </MdListItem>
                  <MdListItem @click="handleListItemClick('Search')">
                    <MdIcon md-theme="primary">search</MdIcon>
                  </MdListItem>
                  <MdListItem @click="handleListItemClick('Settings')">
                    <MdIcon md-theme="primary">settings</MdIcon>
                  </MdListItem>
                </MdList>
              </div>
            </div>
          </MdDrawer>
        </div>

        <div class="drawer-group">
          <h3>Floating Drawer</h3>
          <MdButton :md-theme="selectedTheme" :md-raised="true" @click="toggleFloatingDrawer">
            Open Floating Drawer
          </MdButton>
          <MdDrawer
            :md-theme="selectedTheme"
            :md-active="floatingDrawerActive"
            :md-temporary="true"
            md-variant="floating"
            @update:md-active="floatingDrawerActive = $event"
          >
            <div class="drawer-content">
              <div class="md-app-drawer-header">
                <h4 class="md-app-drawer-title">Floating Drawer</h4>
                <p class="md-app-drawer-subtitle">With rounded corners</p>
              </div>
              <div class="md-app-drawer-nav">
                <MdList>
                  <MdListItem @click="handleListItemClick('Notifications')">
                    <MdIcon md-theme="primary">notifications</MdIcon>
                    <span>Notifications</span>
                  </MdListItem>
                  <MdListItem @click="handleListItemClick('Messages')">
                    <MdIcon md-theme="primary">message</MdIcon>
                    <span>Messages</span>
                  </MdListItem>
                </MdList>
              </div>
            </div>
          </MdDrawer>
        </div>

        <div class="drawer-group">
          <h3>Right Drawer</h3>
          <MdButton :md-theme="selectedTheme" :md-raised="true" @click="toggleRightDrawer">
            Open Right Drawer
          </MdButton>
          <MdDrawer
            :md-theme="selectedTheme"
            :md-active="rightDrawerActive"
            :md-temporary="true"
            :md-right="true"
            @update:md-active="rightDrawerActive = $event"
          >
            <div class="drawer-content">
              <div class="md-app-drawer-header">
                <h4 class="md-app-drawer-title">Right Drawer</h4>
                <p class="md-app-drawer-subtitle">Opens from the right</p>
              </div>
              <div class="md-app-drawer-nav">
                <MdList>
                  <MdListItem @click="handleListItemClick('Help')">
                    <MdIcon md-theme="primary">help</MdIcon>
                    <span>Help</span>
                  </MdListItem>
                  <MdListItem @click="handleListItemClick('About')">
                    <MdIcon md-theme="primary">info</MdIcon>
                    <span>About</span>
                  </MdListItem>
                </MdList>
              </div>
            </div>
          </MdDrawer>
        </div>
      </div>
    </div>

    <!-- Overlay Types -->
    <div class="drawer-section">
      <h2>Overlay Types</h2>
      <div class="drawer-grid">
        <div class="drawer-group">
          <h3>Light Overlay</h3>
          <MdButton :md-theme="selectedTheme" :md-raised="true" @click="toggleLightOverlay">
            Open with Light Overlay
          </MdButton>
          <MdDrawer
            :md-theme="selectedTheme"
            :md-active="lightOverlayActive"
            :md-temporary="true"
            md-overlay-type="light"
            @update:md-active="lightOverlayActive = $event"
          >
            <div class="drawer-content">
              <div class="md-app-drawer-header">
                <h4 class="md-app-drawer-title">Light Overlay</h4>
                <p class="md-app-drawer-subtitle">Subtle background</p>
              </div>
            </div>
          </MdDrawer>
        </div>

        <div class="drawer-group">
          <h3>Dark Overlay</h3>
          <MdButton :md-theme="selectedTheme" :md-raised="true" @click="toggleDarkOverlay">
            Open with Dark Overlay
          </MdButton>
          <MdDrawer
            :md-theme="selectedTheme"
            :md-active="darkOverlayActive"
            :md-temporary="true"
            md-overlay-type="dark"
            @update:md-active="darkOverlayActive = $event"
          >
            <div class="drawer-content">
              <div class="md-app-drawer-header">
                <h4 class="md-app-drawer-title">Dark Overlay</h4>
                <p class="md-app-drawer-subtitle">Strong background</p>
              </div>
            </div>
          </MdDrawer>
        </div>

        <div class="drawer-group">
          <h3>Blur Overlay</h3>
          <MdButton :md-theme="selectedTheme" :md-raised="true" @click="toggleBlurOverlay">
            Open with Blur Overlay
          </MdButton>
          <MdDrawer
            :md-theme="selectedTheme"
            :md-active="blurOverlayActive"
            :md-temporary="true"
            md-overlay-type="blur"
            @update:md-active="blurOverlayActive = $event"
          >
            <div class="drawer-content">
              <div class="md-app-drawer-header">
                <h4 class="md-app-drawer-title">Blur Overlay</h4>
                <p class="md-app-drawer-subtitle">Background blur effect</p>
              </div>
            </div>
          </MdDrawer>
        </div>
      </div>
    </div>

    <!-- All Themes Demo -->
    <div class="drawer-section">
      <h2>All Themes Comparison</h2>
      <div class="theme-comparison">
        <div v-for="theme in themes" :key="theme" class="theme-column">
          <h3>{{ theme }}</h3>
          <MdButton :md-theme="theme" @click="openThemeDrawer(theme)">
            Open {{ theme }} Drawer
          </MdButton>
          <MdDrawer
            :md-theme="theme"
            :md-active="themeDrawerActive === theme"
            :md-temporary="true"
            @update:md-active="closeThemeDrawer"
          >
            <div class="drawer-content">
              <div class="md-app-drawer-header">
                <h4 class="md-app-drawer-title">{{ theme }} Theme</h4>
                <p class="md-app-drawer-subtitle">Theme demonstration</p>
              </div>
              <div class="md-app-drawer-nav">
                <MdList>
                  <MdListItem>
                    <MdIcon :md-theme="theme">star</MdIcon>
                    <span>Sample Item</span>
                  </MdListItem>
                </MdList>
              </div>
            </div>
          </MdDrawer>
        </div>
      </div>
    </div>

    <!-- Interactive Demo -->
    <div class="drawer-section">
      <h2>Interactive Demo</h2>
      <div class="interactive-demo">
        <div class="demo-controls">
          <div class="control-group">
            <label>Drawer Type:</label>
            <select v-model="demoDrawerType">
              <option value="temporary">Temporary</option>
              <option value="persistent">Persistent</option>
              <option value="permanent">Permanent</option>
            </select>
          </div>

          <div class="control-group">
            <label>Variant:</label>
            <select v-model="demoVariant">
              <option value="standard">Standard</option>
              <option value="mini">Mini</option>
              <option value="floating">Floating</option>
              <option value="clipped">Clipped</option>
            </select>
          </div>

          <div class="control-group">
            <label>Overlay Type:</label>
            <select v-model="demoOverlayType">
              <option value="standard">Standard</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="blur">Blur</option>
            </select>
          </div>

          <div class="control-group">
            <label>Width:</label>
            <input type="range" v-model="demoWidth" min="200" max="400" step="20" />
            <span>{{ demoWidth }}px</span>
          </div>

          <div class="control-group">
            <label>
              <input type="checkbox" v-model="demoRight" />
              Right Side
            </label>
          </div>

          <div class="control-group">
            <label>
              <input type="checkbox" v-model="demoAnimate" />
              Animate
            </label>
          </div>
        </div>

        <div class="demo-button">
          <MdButton :md-theme="selectedTheme" :md-raised="true" @click="toggleDemoDrawer">
            {{ demoDrawerActive ? 'Close' : 'Open' }} Demo Drawer
          </MdButton>
        </div>

        <MdDrawer
          :md-theme="selectedTheme"
          :md-active="demoDrawerActive"
          :md-temporary="demoDrawerType === 'temporary'"
          :md-persistent="demoDrawerType === 'persistent'"
          :md-permanent="demoDrawerType === 'permanent'"
          :md-right="demoRight"
          :md-width="demoWidth"
          :md-variant="demoVariant"
          :md-overlay-type="demoOverlayType"
          :md-animate="demoAnimate"
          @update:md-active="demoDrawerActive = $event"
        >
          <div class="drawer-content">
            <div class="md-app-drawer-header">
              <h4 class="md-app-drawer-title">Interactive Demo</h4>
              <p class="md-app-drawer-subtitle">
                Type: {{ demoDrawerType }} | Variant: {{ demoVariant }} | Width: {{ demoWidth }}px |
                {{ demoRight ? 'Right' : 'Left' }}
              </p>
            </div>
            <div class="md-app-drawer-nav">
              <MdList>
                <MdListItem @click="handleListItemClick('Item 1')">
                  <MdIcon md-theme="primary">favorite</MdIcon>
                  <span>Item 1</span>
                </MdListItem>
                <MdListItem @click="handleListItemClick('Item 2')">
                  <MdIcon md-theme="primary">star</MdIcon>
                  <span>Item 2</span>
                </MdListItem>
                <MdListItem @click="handleListItemClick('Item 3')">
                  <MdIcon md-theme="primary">thumb_up</MdIcon>
                  <span>Item 3</span>
                </MdListItem>
              </MdList>
            </div>
            <div class="md-app-drawer-footer">
              <p>Footer content</p>
            </div>
          </div>
        </MdDrawer>
      </div>
    </div>

    <!-- Click Counter -->
    <div class="click-counter">
      <h3>Click Counter: {{ clickCount }}</h3>
      <MdButton :md-theme="selectedTheme" :md-raised="true" @click="resetCounter">
        Reset Counter
      </MdButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MdDrawer from '../vue-materials/components/MdDrawer/MdDrawer.vue';
import MdButton from '../vue-materials/components/MdButton/MdButton.vue';
import MdIcon from '../vue-materials/components/MdIcon/MdIcon.vue';
import MdList from '../vue-materials/components/MdList/MdList.vue';
import MdListItem from '../vue-materials/components/MdList/MdListItem.vue';

export default defineComponent({
  name: 'MdDrawerThemeTest',
  components: {
    MdDrawer,
    MdButton,
    MdIcon,
    MdList,
    MdListItem,
  },
  setup() {
    const selectedTheme = ref('default');
    const clickCount = ref(0);

    // Drawer states
    const temporaryDrawerActive = ref(false);
    const persistentDrawerActive = ref(false);
    const miniDrawerActive = ref(false);
    const floatingDrawerActive = ref(false);
    const rightDrawerActive = ref(false);
    const lightOverlayActive = ref(false);
    const darkOverlayActive = ref(false);
    const blurOverlayActive = ref(false);
    const themeDrawerActive = ref('');
    const demoDrawerActive = ref(false);

    // Demo controls
    const demoDrawerType = ref('temporary');
    const demoVariant = ref('standard');
    const demoOverlayType = ref('standard');
    const demoWidth = ref(256);
    const demoRight = ref(false);
    const demoAnimate = ref(true);

    const themes = ['default', 'primary', 'accent', 'warn', 'success', 'info', 'dark', 'light'];

    const toggleTemporaryDrawer = () => {
      temporaryDrawerActive.value = !temporaryDrawerActive.value;
    };

    const togglePersistentDrawer = () => {
      persistentDrawerActive.value = !persistentDrawerActive.value;
    };

    const toggleMiniDrawer = () => {
      miniDrawerActive.value = !miniDrawerActive.value;
    };

    const toggleFloatingDrawer = () => {
      floatingDrawerActive.value = !floatingDrawerActive.value;
    };

    const toggleRightDrawer = () => {
      rightDrawerActive.value = !rightDrawerActive.value;
    };

    const toggleLightOverlay = () => {
      lightOverlayActive.value = !lightOverlayActive.value;
    };

    const toggleDarkOverlay = () => {
      darkOverlayActive.value = !darkOverlayActive.value;
    };

    const toggleBlurOverlay = () => {
      blurOverlayActive.value = !blurOverlayActive.value;
    };

    const toggleDemoDrawer = () => {
      demoDrawerActive.value = !demoDrawerActive.value;
    };

    const openThemeDrawer = (theme: string) => {
      themeDrawerActive.value = theme;
    };

    const closeThemeDrawer = () => {
      themeDrawerActive.value = '';
    };

    const handleListItemClick = (item: string) => {
      clickCount.value++;
      console.log('List item clicked:', item);
    };

    const resetCounter = () => {
      clickCount.value = 0;
    };

    return {
      selectedTheme,
      clickCount,
      themes,
      temporaryDrawerActive,
      persistentDrawerActive,
      miniDrawerActive,
      floatingDrawerActive,
      rightDrawerActive,
      lightOverlayActive,
      darkOverlayActive,
      blurOverlayActive,
      themeDrawerActive,
      demoDrawerActive,
      demoDrawerType,
      demoVariant,
      demoOverlayType,
      demoWidth,
      demoRight,
      demoAnimate,
      toggleTemporaryDrawer,
      togglePersistentDrawer,
      toggleMiniDrawer,
      toggleFloatingDrawer,
      toggleRightDrawer,
      toggleLightOverlay,
      toggleDarkOverlay,
      toggleBlurOverlay,
      toggleDemoDrawer,
      openThemeDrawer,
      closeThemeDrawer,
      handleListItemClick,
      resetCounter,
    };
  },
});
</script>

<style lang="scss" scoped>
.md-drawer-theme-test {
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
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;

    h2 {
      margin-bottom: 15px;
      color: #333;
    }

    .theme-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .theme-btn {
        padding: 8px 16px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: white;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background: #e0e0e0;
        }

        &.active {
          background: #1976d2;
          color: white;
          border-color: #1976d2;
        }
      }
    }
  }

  .drawer-section {
    margin-bottom: 40px;

    h2 {
      color: #333;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e0e0e0;
    }

    .drawer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;

      .drawer-group {
        h3 {
          color: #555;
          margin-bottom: 15px;
          font-size: 16px;
        }

        .permanent-drawer-container {
          display: flex;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          min-height: 300px;

          .permanent-content {
            flex: 1;
            padding: 20px;
            background: #f9f9f9;
          }
        }
      }
    }

    .theme-comparison {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;

      .theme-column {
        h3 {
          color: #555;
          margin-bottom: 15px;
          text-align: center;
          font-size: 14px;
          text-transform: capitalize;
        }

        .md-button {
          width: 100%;
          margin-bottom: 10px;
        }
      }
    }

    .interactive-demo {
      padding: 20px;
      background: #f9f9f9;
      border-radius: 8px;

      .demo-controls {
        margin-bottom: 20px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 5px;

          label {
            font-size: 14px;
            font-weight: 500;
            color: #555;
          }

          select,
          input[type='range'] {
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
          }

          input[type='checkbox'] {
            margin-right: 8px;
          }

          span {
            font-size: 12px;
            color: #666;
          }
        }
      }

      .demo-button {
        text-align: center;
        margin: 20px 0;
      }
    }
  }

  .click-counter {
    text-align: center;
    padding: 20px;
    background: #e3f2fd;
    border-radius: 8px;
    margin-top: 40px;

    h3 {
      color: #1976d2;
      margin-bottom: 15px;
    }
  }
}

// Responsive design
@media (max-width: 768px) {
  .md-drawer-theme-test {
    padding: 15px;

    .drawer-section .drawer-grid {
      grid-template-columns: 1fr;
    }

    .drawer-section .theme-comparison {
      grid-template-columns: repeat(2, 1fr);
    }

    .theme-selector .theme-buttons {
      justify-content: center;
    }
  }
}

@media (max-width: 480px) {
  .md-drawer-theme-test {
    .drawer-section .theme-comparison {
      grid-template-columns: 1fr;
    }

    .drawer-section .interactive-demo .demo-controls {
      grid-template-columns: 1fr;
    }
  }
}
</style>

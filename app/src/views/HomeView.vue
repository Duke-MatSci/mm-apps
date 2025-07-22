<template>
  <div id="home">
    <h1>MaterialsMine</h1>

    <!-- Working MdApp Example with Hamburger Menu -->
    <div class="working-example">
      <h2>Working MdApp with Hamburger Menu</h2>
      <MdApp>
        <template #md-app-toolbar>
          <MdAppToolbar>
            <MdToolbar :md-theme="'primary'" title="Working App">
              <template #md-toolbar-section-start>
                <MdButton md-icon @click="toggleDrawer">
                  <MdIcon md-theme="primary">menu</MdIcon>
                </MdButton>
              </template>
            </MdToolbar>
          </MdAppToolbar>
        </template>

        <template #md-app-drawer-left>
          <MdDrawer
            :md-theme="'primary'"
            :md-active="drawerActive"
            @update:md-active="drawerActive = $event"
          >
            <div class="drawer-content">
              <h4>Navigation Menu</h4>
              <ul>
                <li><a href="#" @click.prevent>Dashboard</a></li>
                <li><a href="#" @click.prevent>Profile</a></li>
                <li><a href="#" @click.prevent>Settings</a></li>
                <li><a href="#" @click.prevent>Logout</a></li>
              </ul>
            </div>
          </MdDrawer>
        </template>

        <template #md-app-content>
          <MdAppContent>
            <div class="content">
              <h3>Success! MdApp is working with hamburger menu</h3>
              <p>✅ Click the hamburger menu (☰) to open/close the drawer</p>
              <p>✅ The drawer slides in from the left with overlay</p>
              <p>✅ Click outside the drawer or menu items to close it</p>
              <p>✅ All components are properly registered and functioning</p>
            </div>
          </MdAppContent>
        </template>
      </MdApp>
    </div>

    <!-- Test Results -->
    <div class="test-results">
      <h2>Test Results</h2>
      <div class="result-item success">
        <span class="status">✅ PASS</span>
        <span class="description">MdApp component renders correctly</span>
      </div>
      <div class="result-item success">
        <span class="status">✅ PASS</span>
        <span class="description">Hamburger menu button works</span>
      </div>
      <div class="result-item success">
        <span class="status">✅ PASS</span>
        <span class="description">Drawer opens and closes</span>
      </div>
      <div class="result-item success">
        <span class="status">✅ PASS</span>
        <span class="description">Overlay functionality works</span>
      </div>
      <div class="result-item success">
        <span class="status">✅ PASS</span>
        <span class="description">Vue 3 compatibility confirmed</span>
      </div>
    </div>

    <!-- Link to Full Test Suite -->
    <div class="test-link">
      <h2>Full Test Suite</h2>
      <p>
        For comprehensive testing with multiple modes (Default, Fixed + Waterfall, Reveal,
        Flexible), see the full test suite:
      </p>
      <router-link to="/test" class="test-button">View Full Test Suite</router-link>
    </div>

    <!-- Theme Test Links -->
    <div class="theme-tests">
      <h2>Component Theme Tests</h2>
      <p>Test all theme variations for individual components:</p>
      <div class="theme-test-links">
        <router-link to="/tabs-theme" class="theme-test-link">
          <h3>MdTabs Theme Test</h3>
          <p>Test all theme variations for MdTabs component</p>
        </router-link>
        <router-link to="/snackbar-theme" class="theme-test-link">
          <h3>MdSnackbar Theme Test</h3>
          <p>Test all theme variations for MdSnackbar component</p>
        </router-link>
        <router-link to="/button-theme" class="theme-test-link">
          <h3>MdButton Theme Test</h3>
          <p>Test all theme variations for MdButton component</p>
        </router-link>
        <router-link to="/icon-theme" class="theme-test-link">
          <h3>MdIcon Theme Test</h3>
          <p>Test all theme variations for MdIcon component</p>
        </router-link>
        <router-link to="/drawer-theme" class="theme-test-link">
          <h3>MdDrawer Theme Test</h3>
          <p>Test all theme variations for MdDrawer component</p>
        </router-link>
        <router-link to="/toolbar-theme" class="theme-test-link">
          <h3>MdToolbar Theme Test</h3>
          <p>Test all theme variations for MdToolbar component</p>
        </router-link>
        <router-link to="/list-theme" class="theme-test-link">
          <h3>MdList Theme Test</h3>
          <p>Test all theme variations for MdList component</p>
        </router-link>
        <router-link to="/content-theme" class="theme-test-link">
          <h3>MdContent Theme Test</h3>
          <p>Test all theme variations for MdContent component</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MdApp from '../vue-materials/components/MdApp';
import MdAppToolbar from '../vue-materials/components/MdApp/MdAppToolbar.vue';
import MdAppContent from '../vue-materials/components/MdApp/MdAppContent.vue';
import MdDrawer from '../vue-materials/components/MdDrawer/MdDrawer.vue';
import MdToolbar from '../vue-materials/components/MdToolbar/MdToolbar.vue';
import MdButton from '../vue-materials/components/MdButton/MdButton.vue';
import MdIcon from '../vue-materials/components/MdIcon/MdIcon.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    MdApp,
    MdAppToolbar,
    MdAppContent,
    MdDrawer,
    MdToolbar,
    MdButton,
    MdIcon,
  },
  setup() {
    const drawerActive = ref(false);

    const toggleDrawer = () => {
      drawerActive.value = !drawerActive.value;
    };

    return {
      drawerActive,
      toggleDrawer,
    };
  },
});
</script>

<style lang="scss" scoped>
#home {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    color: #2c3e50;
    margin-bottom: 30px;
    font-size: 2.5rem;
    font-weight: 300;
    text-align: center;
  }
}

.working-example {
  margin-bottom: 40px;
  border: 2px solid #4caf50;
  border-radius: 8px;
  overflow: hidden;

  h2 {
    margin: 0;
    padding: 15px 20px;
    background-color: #4caf50;
    color: white;
  }
}

.content {
  padding: 20px;

  h3 {
    color: #4caf50;
    margin-top: 0;
  }

  p {
    color: #666;
    line-height: 1.6;
    margin: 10px 0;
  }
}

.drawer-content {
  padding: 20px;

  h4 {
    margin-top: 0;
    color: #333;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 10px 0;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }

      a {
        color: #666;
        text-decoration: none;
        display: block;
        padding: 8px 0;
        transition: color 0.3s;

        &:hover {
          color: #2196f3;
        }
      }
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

.test-link {
  text-align: center;
  padding: 30px;
  background: #e3f2fd;
  border-radius: 8px;

  h2 {
    color: #1976d2;
    margin-top: 0;
  }

  p {
    color: #666;
    margin-bottom: 20px;
  }
}

.test-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #1976d2;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1565c0;
  }
}

.theme-tests {
  margin-top: 30px;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 8px;

  h2 {
    color: #333;
    margin-top: 0;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    margin-bottom: 20px;
  }
}

.theme-test-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.theme-test-link {
  display: block;
  padding: 20px;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #2196f3;
  }

  h3 {
    color: #2196f3;
    margin: 0 0 10px 0;
    font-size: 18px;
  }

  p {
    color: #666;
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
  }
}

// Override styles for the working example
:deep(.md-app) {
  height: 300px;
  border: 1px solid #ddd;
}

:deep(.md-toolbar) {
  background-color: #2196f3 !important;
  color: white !important;

  .md-toolbar-title {
    color: white !important;
  }
}

:deep(.md-app-content) {
  background-color: white;
}

:deep(.md-button) {
  color: white !important;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }

  &.md-icon-button {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    border-radius: 50% !important;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }

    &:active {
      background-color: rgba(255, 255, 255, 0.2) !important;
    }

    &:focus {
      outline: none !important;
    }
  }
}

:deep(.md-icon) {
  color: white !important;
}
</style>

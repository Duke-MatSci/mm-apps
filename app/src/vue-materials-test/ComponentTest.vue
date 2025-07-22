<template>
  <div class="component-test">
    <h2>Vue Material Components Test</h2>

    <!-- Default Example -->
    <div class="test-section">
      <h3>Default Example</h3>
      <MdApp>
        <template #md-app-toolbar>
          <MdAppToolbar>
            <MdToolbar :md-theme="'primary'" title="Default App">
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
              <h4>Navigation</h4>
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
            <div class="test-content">
              <h4>Default App Content</h4>
              <p>This is a basic MdApp with hamburger menu and temporary drawer.</p>
              <div class="scroll-content">
                <p v-for="i in 20" :key="i">
                  Scroll content line {{ i }} - Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit.
                </p>
              </div>
            </div>
          </MdAppContent>
        </template>
      </MdApp>
    </div>

    <!-- Fixed + Waterfall Example -->
    <div class="test-section">
      <h3>Fixed + Waterfall Example</h3>
      <MdApp md-mode="fixed" md-waterfall>
        <template #md-app-toolbar>
          <MdAppToolbar>
            <MdToolbar :md-theme="'accent'" title="Fixed + Waterfall">
              <template #md-toolbar-section-start>
                <MdButton md-icon @click="toggleDrawer2">
                  <MdIcon md-theme="primary">menu</MdIcon>
                </MdButton>
              </template>
            </MdToolbar>
          </MdAppToolbar>
        </template>

        <template #md-app-drawer-left>
          <MdDrawer
            :md-theme="'accent'"
            :md-active="drawerActive2"
            @update:md-active="drawerActive2 = $event"
          >
            <div class="drawer-content">
              <h4>Fixed Navigation</h4>
              <ul>
                <li><a href="#" @click.prevent>Home</a></li>
                <li><a href="#" @click.prevent>About</a></li>
                <li><a href="#" @click.prevent>Contact</a></li>
                <li><a href="#" @click.prevent>Help</a></li>
              </ul>
            </div>
          </MdDrawer>
        </template>

        <template #md-app-content>
          <MdAppContent>
            <div class="test-content">
              <h4>Fixed + Waterfall Content</h4>
              <p>
                This MdApp uses fixed mode with waterfall effect. Scroll to see the toolbar
                elevation change.
              </p>
              <div class="scroll-content">
                <p v-for="i in 30" :key="i">
                  Scroll content line {{ i }} - Sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </p>
              </div>
            </div>
          </MdAppContent>
        </template>
      </MdApp>
    </div>

    <!-- Reveal Example -->
    <div class="test-section">
      <h3>Reveal Example</h3>
      <MdApp md-mode="reveal">
        <template #md-app-toolbar>
          <MdAppToolbar>
            <MdToolbar :md-theme="'success'" title="Reveal Mode">
              <template #md-toolbar-section-start>
                <MdButton md-icon @click="toggleDrawer3">
                  <MdIcon md-theme="primary">menu</MdIcon>
                </MdButton>
              </template>
            </MdToolbar>
          </MdAppToolbar>
        </template>

        <template #md-app-drawer-left>
          <MdDrawer
            :md-theme="'success'"
            :md-active="drawerActive3"
            @update:md-active="drawerActive3 = $event"
          >
            <div class="drawer-content">
              <h4>Reveal Navigation</h4>
              <ul>
                <li><a href="#" @click.prevent>Projects</a></li>
                <li><a href="#" @click.prevent>Tasks</a></li>
                <li><a href="#" @click.prevent>Calendar</a></li>
                <li><a href="#" @click.prevent>Reports</a></li>
              </ul>
            </div>
          </MdDrawer>
        </template>

        <template #md-app-content>
          <MdAppContent>
            <div class="test-content">
              <h4>Reveal Mode Content</h4>
              <p>
                This MdApp uses reveal mode. The toolbar will hide/show based on scroll direction.
              </p>
              <div class="scroll-content">
                <p v-for="i in 25" :key="i">
                  Scroll content line {{ i }} - Ut enim ad minim veniam, quis nostrud exercitation.
                </p>
              </div>
            </div>
          </MdAppContent>
        </template>
      </MdApp>
    </div>

    <!-- Flexible Example -->
    <div class="test-section">
      <h3>Flexible Example</h3>
      <MdApp md-mode="flexible">
        <template #md-app-toolbar>
          <MdAppToolbar>
            <MdToolbar :md-theme="'info'" title="Flexible Mode">
              <template #md-toolbar-section-start>
                <MdButton md-icon @click="toggleDrawer4">
                  <MdIcon md-theme="primary">menu</MdIcon>
                </MdButton>
              </template>
            </MdToolbar>
          </MdAppToolbar>
        </template>

        <template #md-app-drawer-left>
          <MdDrawer
            :md-theme="'info'"
            :md-active="drawerActive4"
            @update:md-active="drawerActive4 = $event"
          >
            <div class="drawer-content">
              <h4>Flexible Navigation</h4>
              <ul>
                <li><a href="#" @click.prevent>Analytics</a></li>
                <li><a href="#" @click.prevent>Users</a></li>
                <li><a href="#" @click.prevent>Products</a></li>
                <li><a href="#" @click.prevent>Orders</a></li>
              </ul>
            </div>
          </MdDrawer>
        </template>

        <template #md-app-content>
          <MdAppContent>
            <div class="test-content">
              <h4>Flexible Mode Content</h4>
              <p>
                This MdApp uses flexible mode. The toolbar will expand and contract as you scroll.
              </p>
              <div class="scroll-content">
                <p v-for="i in 35" :key="i">
                  Scroll content line {{ i }} - Duis aute irure dolor in reprehenderit in voluptate.
                </p>
              </div>
            </div>
          </MdAppContent>
        </template>
      </MdApp>
    </div>

    <!-- Permanent Drawer Example -->
    <div class="test-section">
      <h3>Permanent Drawer Example</h3>
      <MdApp>
        <template #md-app-toolbar>
          <MdAppToolbar>
            <MdToolbar :md-theme="'dark'" title="Permanent Drawer" />
          </MdAppToolbar>
        </template>

        <template #md-app-drawer-left>
          <MdDrawer :md-theme="'dark'" :md-permanent="true">
            <div class="drawer-content">
              <h4>Permanent Navigation</h4>
              <ul>
                <li><a href="#" @click.prevent>Dashboard</a></li>
                <li><a href="#" @click.prevent>Users</a></li>
                <li><a href="#" @click.prevent>Settings</a></li>
                <li><a href="#" @click.prevent>Reports</a></li>
              </ul>
            </div>
          </MdDrawer>
        </template>

        <template #md-app-content>
          <MdAppContent>
            <div class="test-content">
              <h4>Permanent Drawer Content</h4>
              <p>This MdApp has a permanent left drawer that's always visible.</p>
              <div class="scroll-content">
                <p v-for="i in 15" :key="i">
                  Scroll content line {{ i }} - The drawer is always visible on the left.
                </p>
              </div>
            </div>
          </MdAppContent>
        </template>
      </MdApp>
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
  name: 'ComponentTest',
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
    const drawerActive2 = ref(false);
    const drawerActive3 = ref(false);
    const drawerActive4 = ref(false);

    const toggleDrawer = () => {
      drawerActive.value = !drawerActive.value;
    };

    const toggleDrawer2 = () => {
      drawerActive2.value = !drawerActive2.value;
    };

    const toggleDrawer3 = () => {
      drawerActive3.value = !drawerActive3.value;
    };

    const toggleDrawer4 = () => {
      drawerActive4.value = !drawerActive4.value;
    };

    return {
      drawerActive,
      drawerActive2,
      drawerActive3,
      drawerActive4,
      toggleDrawer,
      toggleDrawer2,
      toggleDrawer3,
      toggleDrawer4,
    };
  },
});
</script>

<style lang="scss" scoped>
.component-test {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.test-section {
  margin-bottom: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;

  h3 {
    margin: 0;
    padding: 15px 20px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
  }
}

.test-content {
  padding: 20px;

  h4 {
    margin-top: 0;
    color: #333;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
}

.scroll-content {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #eee;
  padding: 15px;
  margin-top: 15px;
  background-color: #fafafa;
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

// Override some styles for testing
:deep(.md-app) {
  height: 400px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

:deep(.md-toolbar) {
  background-color: #2196f3 !important;
  color: white !important;

  .md-toolbar-title {
    color: white !important;
  }
}

:deep(.md-app-drawer) {
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
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

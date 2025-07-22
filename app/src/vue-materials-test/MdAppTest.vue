<template>
  <div class="md-app-test">
    <h1>MdApp Test</h1>

    <div class="test-section">
      <h2>Basic App Layout</h2>
      <md-app md-mode="fixed">
        <md-app-toolbar class="md-primary">
          <h1 class="md-title">Basic App</h1>
        </md-app-toolbar>

        <md-app-drawer md-permanent="clipped">
          <md-toolbar class="md-transparent">
            <span>Navigation</span>
          </md-toolbar>

          <md-list>
            <md-list-item>
              <md-icon>home</md-icon>
              <span class="md-list-item-text">Home</span>
            </md-list-item>
            <md-list-item>
              <md-icon>info</md-icon>
              <span class="md-list-item-text">About</span>
            </md-list-item>
          </md-list>
        </md-app-drawer>

        <md-app-content>
          <p>This is a basic app layout with a fixed toolbar and permanent clipped drawer.</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </md-app-content>
      </md-app>
    </div>

    <div class="test-section">
      <h2>Reveal Mode</h2>
      <md-app md-mode="reveal" md-waterfall>
        <md-app-toolbar class="md-accent">
          <h1 class="md-title">Reveal Mode</h1>
        </md-app-toolbar>

        <md-app-drawer md-permanent="clipped">
          <md-toolbar class="md-transparent">
            <span>Navigation</span>
          </md-toolbar>

          <md-list>
            <md-list-item>
              <md-icon>home</md-icon>
              <span class="md-list-item-text">Home</span>
            </md-list-item>
            <md-list-item>
              <md-icon>info</md-icon>
              <span class="md-list-item-text">About</span>
            </md-list-item>
          </md-list>
        </md-app-drawer>

        <md-app-content>
          <p>
            This is a reveal mode app with waterfall effect. Scroll down to see the toolbar reveal.
          </p>
          <div v-for="i in 20" :key="i" class="content-block">
            <h3>Content Block {{ i }}</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </md-app-content>
      </md-app>
    </div>

    <div class="test-section">
      <h2>Flexible Mode</h2>
      <md-app md-mode="flexible">
        <md-app-toolbar class="md-primary">
          <md-toolbar-row>
            <h1 class="md-title">Flexible Mode</h1>
          </md-toolbar-row>
          <md-toolbar-row>
            <span>Subtitle</span>
          </md-toolbar-row>
        </md-app-toolbar>

        <md-app-drawer md-permanent="clipped">
          <md-toolbar class="md-transparent">
            <span>Navigation</span>
          </md-toolbar>

          <md-list>
            <md-list-item>
              <md-icon>home</md-icon>
              <span class="md-list-item-text">Home</span>
            </md-list-item>
            <md-list-item>
              <md-icon>info</md-icon>
              <span class="md-list-item-text">About</span>
            </md-list-item>
          </md-list>
        </md-app-drawer>

        <md-app-content>
          <p>This is a flexible mode app. The toolbar will shrink as you scroll.</p>
          <div v-for="i in 15" :key="i" class="content-block">
            <h3>Content Block {{ i }}</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </md-app-content>
      </md-app>
    </div>

    <div class="test-section">
      <h2>Overlap Mode</h2>
      <md-app md-mode="overlap">
        <md-app-toolbar class="md-accent">
          <md-toolbar-row>
            <h1 class="md-title">Overlap Mode</h1>
          </md-toolbar-row>
          <md-toolbar-row>
            <span>Subtitle</span>
          </md-toolbar-row>
        </md-app-toolbar>

        <md-app-drawer md-permanent="clipped">
          <md-toolbar class="md-transparent">
            <span>Navigation</span>
          </md-toolbar>

          <md-list>
            <md-list-item>
              <md-icon>home</md-icon>
              <span class="md-list-item-text">Home</span>
            </md-list-item>
            <md-list-item>
              <md-icon>info</md-icon>
              <span class="md-list-item-text">About</span>
            </md-list-item>
          </md-list>
        </md-app-drawer>

        <md-app-content>
          <p>This is an overlap mode app. The content overlaps with the toolbar.</p>
          <div v-for="i in 10" :key="i" class="content-block">
            <h3>Content Block {{ i }}</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </md-app-content>
      </md-app>
    </div>

    <div class="test-section">
      <h2>Right Drawer</h2>
      <md-app md-mode="fixed">
        <md-app-toolbar class="md-primary">
          <h1 class="md-title">Right Drawer</h1>
        </md-app-toolbar>

        <md-app-drawer md-permanent="clipped" md-right>
          <md-toolbar class="md-transparent">
            <span>Right Navigation</span>
          </md-toolbar>

          <md-list>
            <md-list-item>
              <md-icon>settings</md-icon>
              <span class="md-list-item-text">Settings</span>
            </md-list-item>
            <md-list-item>
              <md-icon>help</md-icon>
              <span class="md-list-item-text">Help</span>
            </md-list-item>
          </md-list>
        </md-app-drawer>

        <md-app-content>
          <p>This app has a right-side drawer instead of a left-side drawer.</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </md-app-content>
      </md-app>
    </div>

    <div class="test-section">
      <h2>Temporary Drawer</h2>
      <md-app md-mode="fixed">
        <md-app-toolbar class="md-accent">
          <md-button class="md-icon-button" @click="toggleDrawer">
            <md-icon>menu</md-icon>
          </md-button>
          <h1 class="md-title">Temporary Drawer</h1>
        </md-app-toolbar>

        <md-app-drawer :md-active="drawerActive">
          <md-toolbar class="md-transparent">
            <span>Navigation</span>
          </md-toolbar>

          <md-list>
            <md-list-item @click="drawerActive = false">
              <md-icon>home</md-icon>
              <span class="md-list-item-text">Home</span>
            </md-list-item>
            <md-list-item @click="drawerActive = false">
              <md-icon>info</md-icon>
              <span class="md-list-item-text">About</span>
            </md-list-item>
          </md-list>
        </md-app-drawer>

        <md-app-content>
          <p>This app has a temporary drawer that can be opened and closed.</p>
          <md-button @click="toggleDrawer" class="md-raised">
            {{ drawerActive ? 'Close' : 'Open' }} Drawer
          </md-button>
        </md-app-content>
      </md-app>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MdApp from '../vue-materials/components/MdApp/MdApp.vue';
import MdAppToolbar from '../vue-materials/components/MdApp/MdAppToolbar.vue';
import MdAppContent from '../vue-materials/components/MdApp/MdAppContent.vue';
import MdAppDrawer from '../vue-materials/components/MdApp/MdAppDrawer.vue';
import MdToolbar from '../vue-materials/components/MdToolbar/MdToolbar.vue';
import MdButton from '../vue-materials/components/MdButton/MdButton.vue';
import MdIcon from '../vue-materials/components/MdIcon/MdIcon.vue';
import MdList from '../vue-materials/components/MdList/MdList.vue';
import MdListItem from '../vue-materials/components/MdList/MdListItem.vue';

export default defineComponent({
  name: 'MdAppTest',
  components: {
    MdApp,
    MdAppToolbar,
    MdAppContent,
    MdAppDrawer,
    MdToolbar,
    MdButton,
    MdIcon,
    MdList,
    MdListItem,
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
.md-app-test {
  .test-section {
    margin: 40px 0;

    h2 {
      margin-bottom: 20px;
      color: #333;
    }

    .md-app {
      height: 400px;
      border: 1px solid #ccc;
      border-radius: 4px;
      overflow: hidden;
    }

    .content-block {
      margin: 20px 0;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 4px;

      h3 {
        margin-top: 0;
        color: #333;
      }
    }
  }
}
</style>

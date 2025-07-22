<template>
  <div class="md-snackbar-theme-test">
    <h1>MdSnackbar Theme Test</h1>

    <div class="test-section">
      <h2>Basic Snackbar</h2>
      <md-button @click="showBasicSnackbar = true" class="md-raised">
        Show Basic Snackbar
      </md-button>
      <md-snackbar v-model:md-active="showBasicSnackbar">
        This is a basic snackbar message
      </md-snackbar>
    </div>

    <div class="test-section">
      <h2>Snackbar with Action</h2>
      <md-button @click="showActionSnackbar = true" class="md-raised">
        Show Snackbar with Action
      </md-button>
      <md-snackbar v-model:md-active="showActionSnackbar">
        This is a snackbar with an action
        <md-button @click="showActionSnackbar = false" class="md-accent"> UNDO </md-button>
      </md-snackbar>
    </div>

    <div class="test-section">
      <h2>Persistent Snackbar</h2>
      <md-button @click="showPersistentSnackbar = true" class="md-raised">
        Show Persistent Snackbar
      </md-button>
      <md-snackbar v-model:md-active="showPersistentSnackbar" :md-persistent="true">
        This is a persistent snackbar that won't auto-dismiss
        <md-button @click="showPersistentSnackbar = false" class="md-accent"> DISMISS </md-button>
      </md-snackbar>
    </div>

    <div class="test-section">
      <h2>Left Positioned Snackbar</h2>
      <md-button @click="showLeftSnackbar = true" class="md-raised">
        Show Left Positioned Snackbar
      </md-button>
      <md-snackbar v-model:md-active="showLeftSnackbar" md-position="left">
        This is a left-positioned snackbar
      </md-snackbar>
    </div>

    <div class="test-section">
      <h2>Custom Duration Snackbar</h2>
      <md-button @click="showCustomDurationSnackbar = true" class="md-raised">
        Show 2 Second Snackbar
      </md-button>
      <md-snackbar v-model:md-active="showCustomDurationSnackbar" :md-duration="2000">
        This snackbar will dismiss in 2 seconds
      </md-snackbar>
    </div>

    <div class="test-section">
      <h2>Theme Variations</h2>
      <div class="theme-buttons">
        <md-button @click="showThemeSnackbar = true" class="md-raised md-primary">
          Primary Theme
        </md-button>
        <md-button @click="showThemeSnackbar = true" class="md-raised md-accent">
          Accent Theme
        </md-button>
        <md-button @click="showThemeSnackbar = true" class="md-raised md-warn">
          Warn Theme
        </md-button>
      </div>
      <md-snackbar v-model:md-active="showThemeSnackbar">
        This snackbar should inherit theme colors
      </md-snackbar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MdSnackbar from '../vue-materials/components/MdSnackbar/MdSnackbar.vue';
import MdButton from '../vue-materials/components/MdButton/MdButton.vue';

export default defineComponent({
  name: 'MdSnackbarThemeTest',
  components: {
    MdSnackbar,
    MdButton,
  },
  setup() {
    const showBasicSnackbar = ref(false);
    const showActionSnackbar = ref(false);
    const showPersistentSnackbar = ref(false);
    const showLeftSnackbar = ref(false);
    const showCustomDurationSnackbar = ref(false);
    const showThemeSnackbar = ref(false);

    return {
      showBasicSnackbar,
      showActionSnackbar,
      showPersistentSnackbar,
      showLeftSnackbar,
      showCustomDurationSnackbar,
      showThemeSnackbar,
    };
  },
});
</script>

<style lang="scss" scoped>
.md-snackbar-theme-test {
  padding: 20px;

  .test-section {
    margin: 30px 0;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;

    h2 {
      margin-top: 0;
      margin-bottom: 16px;
    }

    .md-button {
      margin: 8px;
    }

    .theme-buttons {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
  }
}
</style>

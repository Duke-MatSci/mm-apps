<template>
  <div class="md-icon-theme-test">
    <h1>MdIcon Theme Test</h1>
    <p>Testing all theme variations and icon types for MdIcon component</p>

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

    <!-- Icon Sizes -->
    <div class="icon-section">
      <h2>Icon Sizes</h2>
      <div class="icon-grid">
        <div class="icon-group">
          <h3>Numeric Sizes</h3>
          <div class="icon-row">
            <MdIcon :md-theme="selectedTheme" :md-size="12">star</MdIcon>
            <MdIcon :md-theme="selectedTheme" :md-size="16">star</MdIcon>
            <MdIcon :md-theme="selectedTheme" :md-size="20">star</MdIcon>
            <MdIcon :md-theme="selectedTheme" :md-size="24">star</MdIcon>
            <MdIcon :md-theme="selectedTheme" :md-size="32">star</MdIcon>
            <MdIcon :md-theme="selectedTheme" :md-size="40">star</MdIcon>
            <MdIcon :md-theme="selectedTheme" :md-size="48">star</MdIcon>
            <MdIcon :md-theme="selectedTheme" :md-size="64">star</MdIcon>
          </div>
        </div>

        <div class="icon-group">
          <h3>Named Sizes</h3>
          <div class="icon-row">
            <MdIcon :md-theme="selectedTheme" md-size="small">star</MdIcon>
            <MdIcon :md-theme="selectedTheme" md-size="medium">star</MdIcon>
            <MdIcon :md-theme="selectedTheme" md-size="large">star</MdIcon>
            <MdIcon :md-theme="selectedTheme" md-size="xlarge">star</MdIcon>
          </div>
        </div>
      </div>
    </div>

    <!-- Icon Types -->
    <div class="icon-section">
      <h2>Icon Types</h2>
      <div class="icon-grid">
        <div class="icon-group">
          <h3>Default (Filled)</h3>
          <MdIcon :md-theme="selectedTheme" md-type="default">favorite</MdIcon>
        </div>

        <div class="icon-group">
          <h3>Outlined</h3>
          <MdIcon :md-theme="selectedTheme" md-type="outlined">favorite_border</MdIcon>
        </div>

        <div class="icon-group">
          <h3>Round</h3>
          <MdIcon :md-theme="selectedTheme" md-type="round">favorite</MdIcon>
        </div>

        <div class="icon-group">
          <h3>Sharp</h3>
          <MdIcon :md-theme="selectedTheme" md-type="sharp">favorite</MdIcon>
        </div>

        <div class="icon-group">
          <h3>Two Tone</h3>
          <MdIcon :md-theme="selectedTheme" md-type="two-tone">favorite</MdIcon>
        </div>
      </div>
    </div>

    <!-- Icon States -->
    <div class="icon-section">
      <h2>Icon States</h2>
      <div class="icon-grid">
        <div class="icon-group">
          <h3>Spinning</h3>
          <MdIcon :md-theme="selectedTheme" md-state="spinning">refresh</MdIcon>
        </div>

        <div class="icon-group">
          <h3>Pulsing</h3>
          <MdIcon :md-theme="selectedTheme" md-state="pulsing">notifications</MdIcon>
        </div>

        <div class="icon-group">
          <h3>Bouncing</h3>
          <MdIcon :md-theme="selectedTheme" md-state="bouncing">mood</MdIcon>
        </div>

        <div class="icon-group">
          <h3>Disabled</h3>
          <MdIcon :md-theme="selectedTheme" :disabled="true">block</MdIcon>
        </div>
      </div>
    </div>

    <!-- Icon Variants -->
    <div class="icon-section">
      <h2>Icon Variants</h2>
      <div class="icon-grid">
        <div class="icon-group">
          <h3>With Background</h3>
          <MdIcon :md-theme="selectedTheme" md-variant="with-bg">home</MdIcon>
        </div>

        <div class="icon-group">
          <h3>With Border</h3>
          <MdIcon :md-theme="selectedTheme" md-variant="with-border">settings</MdIcon>
        </div>

        <div class="icon-group">
          <h3>With Shadow</h3>
          <MdIcon :md-theme="selectedTheme" md-variant="with-shadow">cloud</MdIcon>
        </div>

        <div class="icon-group">
          <h3>With Tooltip</h3>
          <MdIcon
            :md-theme="selectedTheme"
            md-variant="with-tooltip"
            md-tooltip="This is a tooltip"
          >
            help
          </MdIcon>
        </div>

        <div class="icon-group">
          <h3>With Badge</h3>
          <MdIcon :md-theme="selectedTheme" md-variant="with-badge" :md-badge="3">
            notifications
          </MdIcon>
        </div>
      </div>
    </div>

    <!-- Icon Positioning -->
    <div class="icon-section">
      <h2>Icon Positioning</h2>
      <div class="icon-grid">
        <div class="icon-group">
          <h3>Left</h3>
          <div class="text-example">
            <MdIcon :md-theme="selectedTheme" md-position="left">arrow_back</MdIcon>
            <span>Text with left icon</span>
          </div>
        </div>

        <div class="icon-group">
          <h3>Right</h3>
          <div class="text-example">
            <span>Text with right icon</span>
            <MdIcon :md-theme="selectedTheme" md-position="right">arrow_forward</MdIcon>
          </div>
        </div>

        <div class="icon-group">
          <h3>Center</h3>
          <div class="text-example">
            <MdIcon :md-theme="selectedTheme" md-position="center">center_focus_strong</MdIcon>
          </div>
        </div>
      </div>
    </div>

    <!-- Icon Groups -->
    <div class="icon-section">
      <h2>Icon Groups</h2>
      <div class="icon-grid">
        <div class="icon-group">
          <h3>Social Media</h3>
          <div class="md-icon-group">
            <MdIcon :md-theme="selectedTheme">facebook</MdIcon>
            <MdIcon :md-theme="selectedTheme">twitter</MdIcon>
            <MdIcon :md-theme="selectedTheme">instagram</MdIcon>
            <MdIcon :md-theme="selectedTheme">linkedin</MdIcon>
          </div>
        </div>

        <div class="icon-group">
          <h3>Actions</h3>
          <div class="md-icon-group">
            <MdIcon :md-theme="selectedTheme">edit</MdIcon>
            <MdIcon :md-theme="selectedTheme">delete</MdIcon>
            <MdIcon :md-theme="selectedTheme">share</MdIcon>
            <MdIcon :md-theme="selectedTheme">download</MdIcon>
          </div>
        </div>
      </div>
    </div>

    <!-- All Themes Demo -->
    <div class="icon-section">
      <h2>All Themes Comparison</h2>
      <div class="theme-comparison">
        <div v-for="theme in themes" :key="theme" class="theme-column">
          <h3>{{ theme }}</h3>
          <MdIcon :md-theme="theme">star</MdIcon>
          <MdIcon :md-theme="theme" md-size="large">favorite</MdIcon>
          <MdIcon :md-theme="theme" md-variant="with-bg">home</MdIcon>
          <MdIcon :md-theme="theme" md-state="spinning">refresh</MdIcon>
        </div>
      </div>
    </div>

    <!-- Interactive Demo -->
    <div class="icon-section">
      <h2>Interactive Demo</h2>
      <div class="interactive-demo">
        <div class="demo-controls">
          <div class="control-group">
            <label>Size:</label>
            <select v-model="demoSize">
              <option value="16">16px</option>
              <option value="24">24px</option>
              <option value="32">32px</option>
              <option value="48">48px</option>
            </select>
          </div>

          <div class="control-group">
            <label>Type:</label>
            <select v-model="demoType">
              <option value="default">Default</option>
              <option value="outlined">Outlined</option>
              <option value="round">Round</option>
              <option value="sharp">Sharp</option>
              <option value="two-tone">Two Tone</option>
            </select>
          </div>

          <div class="control-group">
            <label>State:</label>
            <select v-model="demoState">
              <option value="">None</option>
              <option value="spinning">Spinning</option>
              <option value="pulsing">Pulsing</option>
              <option value="bouncing">Bouncing</option>
            </select>
          </div>

          <div class="control-group">
            <label>Variant:</label>
            <select v-model="demoVariant">
              <option value="">None</option>
              <option value="with-bg">With Background</option>
              <option value="with-border">With Border</option>
              <option value="with-shadow">With Shadow</option>
            </select>
          </div>

          <div class="control-group">
            <label>
              <input type="checkbox" v-model="demoDisabled" />
              Disabled
            </label>
          </div>
        </div>

        <div class="demo-icon">
          <MdIcon
            :md-theme="selectedTheme"
            :md-size="demoSize"
            :md-type="demoType"
            :md-state="demoState"
            :md-variant="demoVariant"
            :disabled="demoDisabled"
          >
            {{ demoIcon }}
          </MdIcon>
        </div>

        <div class="icon-selector">
          <label>Icon:</label>
          <select v-model="demoIcon">
            <option value="star">Star</option>
            <option value="favorite">Favorite</option>
            <option value="home">Home</option>
            <option value="settings">Settings</option>
            <option value="notifications">Notifications</option>
            <option value="refresh">Refresh</option>
            <option value="mood">Mood</option>
            <option value="cloud">Cloud</option>
            <option value="help">Help</option>
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
            <option value="share">Share</option>
            <option value="download">Download</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Common Icons -->
    <div class="icon-section">
      <h2>Common Icons</h2>
      <div class="common-icons">
        <div class="icon-category">
          <h3>Navigation</h3>
          <div class="icon-row">
            <MdIcon :md-theme="selectedTheme">home</MdIcon>
            <MdIcon :md-theme="selectedTheme">menu</MdIcon>
            <MdIcon :md-theme="selectedTheme">arrow_back</MdIcon>
            <MdIcon :md-theme="selectedTheme">arrow_forward</MdIcon>
            <MdIcon :md-theme="selectedTheme">close</MdIcon>
            <MdIcon :md-theme="selectedTheme">search</MdIcon>
          </div>
        </div>

        <div class="icon-category">
          <h3>Actions</h3>
          <div class="icon-row">
            <MdIcon :md-theme="selectedTheme">add</MdIcon>
            <MdIcon :md-theme="selectedTheme">edit</MdIcon>
            <MdIcon :md-theme="selectedTheme">delete</MdIcon>
            <MdIcon :md-theme="selectedTheme">save</MdIcon>
            <MdIcon :md-theme="selectedTheme">download</MdIcon>
            <MdIcon :md-theme="selectedTheme">upload</MdIcon>
          </div>
        </div>

        <div class="icon-category">
          <h3>Communication</h3>
          <div class="icon-row">
            <MdIcon :md-theme="selectedTheme">email</MdIcon>
            <MdIcon :md-theme="selectedTheme">phone</MdIcon>
            <MdIcon :md-theme="selectedTheme">message</MdIcon>
            <MdIcon :md-theme="selectedTheme">notifications</MdIcon>
            <MdIcon :md-theme="selectedTheme">share</MdIcon>
            <MdIcon :md-theme="selectedTheme">link</MdIcon>
          </div>
        </div>

        <div class="icon-category">
          <h3>Status</h3>
          <div class="icon-row">
            <MdIcon :md-theme="selectedTheme">check</MdIcon>
            <MdIcon :md-theme="selectedTheme">error</MdIcon>
            <MdIcon :md-theme="selectedTheme">warning</MdIcon>
            <MdIcon :md-theme="selectedTheme">info</MdIcon>
            <MdIcon :md-theme="selectedTheme">help</MdIcon>
            <MdIcon :md-theme="selectedTheme">block</MdIcon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MdIcon from '../vue-materials/components/MdIcon/MdIcon.vue';

export default defineComponent({
  name: 'MdIconThemeTest',
  components: {
    MdIcon,
  },
  setup() {
    const selectedTheme = ref('default');
    const demoSize = ref(24);
    const demoType = ref('default');
    const demoState = ref('');
    const demoVariant = ref('');
    const demoDisabled = ref(false);
    const demoIcon = ref('star');

    const themes = ['default', 'primary', 'accent', 'warn', 'success', 'info', 'dark', 'light'];

    return {
      selectedTheme,
      themes,
      demoSize,
      demoType,
      demoState,
      demoVariant,
      demoDisabled,
      demoIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
.md-icon-theme-test {
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

  .icon-section {
    margin-bottom: 40px;

    h2 {
      color: #333;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e0e0e0;
    }

    .icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;

      .icon-group {
        h3 {
          color: #555;
          margin-bottom: 15px;
          font-size: 16px;
        }

        .icon-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .text-example {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #666;
        }

        .md-icon-group {
          display: flex;
          gap: 8px;
        }
      }
    }

    .theme-comparison {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 20px;

      .theme-column {
        h3 {
          color: #555;
          margin-bottom: 15px;
          text-align: center;
          font-size: 14px;
          text-transform: capitalize;
        }

        .md-icon {
          display: block;
          margin: 8px auto;
          text-align: center;
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

          select {
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
          }

          input[type='checkbox'] {
            margin-right: 8px;
          }
        }
      }

      .demo-icon {
        text-align: center;
        margin: 20px 0;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .icon-selector {
        text-align: center;

        label {
          margin-right: 10px;
          font-weight: 500;
        }

        select {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }
      }
    }

    .common-icons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;

      .icon-category {
        h3 {
          color: #555;
          margin-bottom: 15px;
          font-size: 16px;
        }

        .icon-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
      }
    }
  }
}

// Responsive design
@media (max-width: 768px) {
  .md-icon-theme-test {
    padding: 15px;

    .icon-section .icon-grid {
      grid-template-columns: 1fr;
    }

    .icon-section .theme-comparison {
      grid-template-columns: repeat(2, 1fr);
    }

    .icon-section .common-icons {
      grid-template-columns: 1fr;
    }

    .theme-selector .theme-buttons {
      justify-content: center;
    }
  }
}

@media (max-width: 480px) {
  .md-icon-theme-test {
    .icon-section .theme-comparison {
      grid-template-columns: 1fr;
    }

    .icon-section .interactive-demo .demo-controls {
      grid-template-columns: 1fr;
    }
  }
}
</style>

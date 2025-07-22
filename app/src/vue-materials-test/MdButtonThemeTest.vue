<template>
  <div class="md-button-theme-test">
    <h1>MdButton Theme Test</h1>
    <p>Testing all theme variations and button types for MdButton component</p>

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

    <!-- Button Types -->
    <div class="button-section">
      <h2>Button Types</h2>
      <div class="button-grid">
        <div class="button-group">
          <h3>Flat Buttons</h3>
          <MdButton :md-theme="selectedTheme" @click="handleClick"> Flat Button </MdButton>
          <MdButton :md-theme="selectedTheme" :md-loading="true" @click="handleClick">
            Loading Button
          </MdButton>
          <MdButton :md-theme="selectedTheme" :disabled="true" @click="handleClick">
            Disabled Button
          </MdButton>
        </div>

        <div class="button-group">
          <h3>Raised Buttons</h3>
          <MdButton :md-theme="selectedTheme" :md-raised="true" @click="handleClick">
            Raised Button
          </MdButton>
          <MdButton
            :md-theme="selectedTheme"
            :md-raised="true"
            :md-loading="true"
            @click="handleClick"
          >
            Loading Raised
          </MdButton>
          <MdButton
            :md-theme="selectedTheme"
            :md-raised="true"
            :disabled="true"
            @click="handleClick"
          >
            Disabled Raised
          </MdButton>
        </div>

        <div class="button-group">
          <h3>Outlined Buttons</h3>
          <MdButton :md-theme="selectedTheme" :md-outlined="true" @click="handleClick">
            Outlined Button
          </MdButton>
          <MdButton
            :md-theme="selectedTheme"
            :md-outlined="true"
            :md-loading="true"
            @click="handleClick"
          >
            Loading Outlined
          </MdButton>
          <MdButton
            :md-theme="selectedTheme"
            :md-outlined="true"
            :disabled="true"
            @click="handleClick"
          >
            Disabled Outlined
          </MdButton>
        </div>
      </div>
    </div>

    <!-- Button Sizes -->
    <div class="button-section">
      <h2>Button Sizes</h2>
      <div class="button-grid">
        <div class="button-group">
          <h3>Small</h3>
          <MdButton :md-theme="selectedTheme" :md-size="'small'" @click="handleClick">
            Small Button
          </MdButton>
          <MdButton
            :md-theme="selectedTheme"
            :md-size="'small'"
            :md-raised="true"
            @click="handleClick"
          >
            Small Raised
          </MdButton>
          <MdButton
            :md-theme="selectedTheme"
            :md-size="'small'"
            :md-outlined="true"
            @click="handleClick"
          >
            Small Outlined
          </MdButton>
        </div>

        <div class="button-group">
          <h3>Normal (Default)</h3>
          <MdButton :md-theme="selectedTheme" @click="handleClick"> Normal Button </MdButton>
          <MdButton :md-theme="selectedTheme" :md-raised="true" @click="handleClick">
            Normal Raised
          </MdButton>
          <MdButton :md-theme="selectedTheme" :md-outlined="true" @click="handleClick">
            Normal Outlined
          </MdButton>
        </div>

        <div class="button-group">
          <h3>Large</h3>
          <MdButton :md-theme="selectedTheme" :md-size="'large'" @click="handleClick">
            Large Button
          </MdButton>
          <MdButton
            :md-theme="selectedTheme"
            :md-size="'large'"
            :md-raised="true"
            @click="handleClick"
          >
            Large Raised
          </MdButton>
          <MdButton
            :md-theme="selectedTheme"
            :md-size="'large'"
            :md-outlined="true"
            @click="handleClick"
          >
            Large Outlined
          </MdButton>
        </div>
      </div>
    </div>

    <!-- FAB Buttons -->
    <div class="button-section">
      <h2>Floating Action Buttons (FAB)</h2>
      <div class="button-grid">
        <div class="button-group">
          <h3>Regular FAB</h3>
          <MdButton :md-theme="selectedTheme" :md-fab="true" @click="handleClick"> + </MdButton>
          <MdButton
            :md-theme="selectedTheme"
            :md-fab="true"
            :md-loading="true"
            @click="handleClick"
          >
            +
          </MdButton>
          <MdButton :md-theme="selectedTheme" :md-fab="true" :disabled="true" @click="handleClick">
            +
          </MdButton>
        </div>

        <div class="button-group">
          <h3>Mini FAB</h3>
          <MdButton :md-theme="selectedTheme" :md-mini-fab="true" @click="handleClick">
            +
          </MdButton>
          <MdButton
            :md-theme="selectedTheme"
            :md-mini-fab="true"
            :md-loading="true"
            @click="handleClick"
          >
            +
          </MdButton>
          <MdButton
            :md-theme="selectedTheme"
            :md-mini-fab="true"
            :disabled="true"
            @click="handleClick"
          >
            +
          </MdButton>
        </div>
      </div>
    </div>

    <!-- Icon Buttons -->
    <div class="button-section">
      <h2>Icon Buttons</h2>
      <div class="button-grid">
        <div class="button-group">
          <h3>Icon Buttons</h3>
          <MdButton :md-theme="selectedTheme" :md-icon="true" @click="handleClick">
            <span class="md-icon">★</span>
          </MdButton>
          <MdButton
            :md-theme="selectedTheme"
            :md-icon="true"
            :md-loading="true"
            @click="handleClick"
          >
            <span class="md-icon">★</span>
          </MdButton>
          <MdButton :md-theme="selectedTheme" :md-icon="true" :disabled="true" @click="handleClick">
            <span class="md-icon">★</span>
          </MdButton>
        </div>

        <div class="button-group">
          <h3>Buttons with Icons</h3>
          <MdButton :md-theme="selectedTheme" @click="handleClick">
            <span class="md-icon">★</span>
            Button with Icon
          </MdButton>
          <MdButton :md-theme="selectedTheme" :md-raised="true" @click="handleClick">
            <span class="md-icon">★</span>
            Raised with Icon
          </MdButton>
          <MdButton :md-theme="selectedTheme" :md-outlined="true" @click="handleClick">
            <span class="md-icon">★</span>
            Outlined with Icon
          </MdButton>
        </div>
      </div>
    </div>

    <!-- All Themes Demo -->
    <div class="button-section">
      <h2>All Themes Comparison</h2>
      <div class="theme-comparison">
        <div v-for="theme in themes" :key="theme" class="theme-column">
          <h3>{{ theme }}</h3>
          <MdButton :md-theme="theme" @click="handleClick"> Flat </MdButton>
          <MdButton :md-theme="theme" :md-raised="true" @click="handleClick"> Raised </MdButton>
          <MdButton :md-theme="theme" :md-outlined="true" @click="handleClick"> Outlined </MdButton>
          <MdButton :md-theme="theme" :md-fab="true" @click="handleClick"> + </MdButton>
          <MdButton :md-theme="theme" :md-icon="true" @click="handleClick">
            <span class="md-icon">★</span>
          </MdButton>
        </div>
      </div>
    </div>

    <!-- Interactive Demo -->
    <div class="button-section">
      <h2>Interactive Demo</h2>
      <div class="interactive-demo">
        <div class="demo-controls">
          <label>
            <input type="checkbox" v-model="demoRaised" />
            Raised
          </label>
          <label>
            <input type="checkbox" v-model="demoOutlined" />
            Outlined
          </label>
          <label>
            <input type="checkbox" v-model="demoLoading" />
            Loading
          </label>
          <label>
            <input type="checkbox" v-model="demoDisabled" />
            Disabled
          </label>
        </div>
        <div class="demo-button">
          <MdButton
            :md-theme="selectedTheme"
            :md-raised="demoRaised"
            :md-outlined="demoOutlined"
            :md-loading="demoLoading"
            :disabled="demoDisabled"
            @click="handleClick"
          >
            Interactive Button
          </MdButton>
        </div>
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
import MdButton from '../vue-materials/components/MdButton/MdButton.vue';

export default defineComponent({
  name: 'MdButtonThemeTest',
  components: {
    MdButton,
  },
  setup() {
    const selectedTheme = ref('default');
    const clickCount = ref(0);
    const demoRaised = ref(false);
    const demoOutlined = ref(false);
    const demoLoading = ref(false);
    const demoDisabled = ref(false);

    const themes = ['default', 'primary', 'accent', 'warn', 'success', 'info', 'dark', 'light'];

    const handleClick = () => {
      clickCount.value++;
      console.log('Button clicked! Count:', clickCount.value);
    };

    const resetCounter = () => {
      clickCount.value = 0;
    };

    return {
      selectedTheme,
      clickCount,
      themes,
      demoRaised,
      demoOutlined,
      demoLoading,
      demoDisabled,
      handleClick,
      resetCounter,
    };
  },
});
</script>

<style lang="scss" scoped>
.md-button-theme-test {
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

  .button-section {
    margin-bottom: 40px;

    h2 {
      color: #333;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e0e0e0;
    }

    .button-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;

      .button-group {
        h3 {
          color: #555;
          margin-bottom: 15px;
          font-size: 16px;
        }

        .md-button {
          margin: 8px;
          display: inline-block;
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
          margin: 8px;
          display: block;
          width: 100%;
        }
      }
    }

    .interactive-demo {
      padding: 20px;
      background: #f9f9f9;
      border-radius: 8px;

      .demo-controls {
        margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 15px;

        label {
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          font-size: 14px;

          input[type='checkbox'] {
            margin: 0;
          }
        }
      }

      .demo-button {
        text-align: center;
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

  .md-icon {
    font-size: 18px;
    line-height: 1;
  }
}

// Responsive design
@media (max-width: 768px) {
  .md-button-theme-test {
    padding: 15px;

    .button-section .button-grid {
      grid-template-columns: 1fr;
    }

    .button-section .theme-comparison {
      grid-template-columns: repeat(2, 1fr);
    }

    .theme-selector .theme-buttons {
      justify-content: center;
    }
  }
}

@media (max-width: 480px) {
  .md-button-theme-test {
    .button-section .theme-comparison {
      grid-template-columns: 1fr;
    }

    .interactive-demo .demo-controls {
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
</style>

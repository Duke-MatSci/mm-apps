<template>
  <div class="md-list-theme-test">
    <h1>MdList Theme Test</h1>
    <p>Testing all theme variations and list types for MdList component</p>

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

    <!-- List Variants -->
    <div class="list-section">
      <h2>List Variants</h2>
      <div class="list-grid">
        <div class="list-group">
          <h3>Standard List</h3>
          <MdList :md-theme="selectedTheme">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
          </MdList>
        </div>

        <div class="list-group">
          <h3>Dense List</h3>
          <MdList :md-theme="selectedTheme" :md-dense="true">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
          </MdList>
        </div>

        <div class="list-group">
          <h3>Compact List</h3>
          <MdList :md-theme="selectedTheme" :md-compact="true">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
          </MdList>
        </div>

        <div class="list-group">
          <h3>Spacious List</h3>
          <MdList :md-theme="selectedTheme" :md-spacious="true">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
          </MdList>
        </div>
      </div>
    </div>

    <!-- Line Variants -->
    <div class="list-section">
      <h2>Line Variants</h2>
      <div class="list-grid">
        <div class="list-group">
          <h3>Single Line</h3>
          <MdList :md-theme="selectedTheme" :md-single-line="true">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
          </MdList>
        </div>

        <div class="list-group">
          <h3>Two Line</h3>
          <MdList :md-theme="selectedTheme" :md-two-line="true">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <div>
                <div class="primary-text">{{ item.title }}</div>
                <div class="secondary-text">{{ item.subtitle }}</div>
              </div>
            </MdListItem>
          </MdList>
        </div>

        <div class="list-group">
          <h3>Three Line</h3>
          <MdList :md-theme="selectedTheme" :md-three-line="true">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <div>
                <div class="primary-text">{{ item.title }}</div>
                <div class="secondary-text">{{ item.subtitle }}</div>
                <div class="tertiary-text">{{ item.description }}</div>
              </div>
            </MdListItem>
          </MdList>
        </div>
      </div>
    </div>

    <!-- List Types -->
    <div class="list-section">
      <h2>List Types</h2>
      <div class="list-grid">
        <div class="list-group">
          <h3>Inset List</h3>
          <MdList :md-theme="selectedTheme" :md-inset="true">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
          </MdList>
        </div>

        <div class="list-group">
          <h3>Outlined List</h3>
          <MdList :md-theme="selectedTheme" :md-outlined="true">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
          </MdList>
        </div>

        <div class="list-group">
          <h3>Elevated List</h3>
          <MdList :md-theme="selectedTheme" :md-elevated="true">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
          </MdList>
        </div>

        <div class="list-group">
          <h3>Flat List</h3>
          <MdList :md-theme="selectedTheme" :md-flat="true">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
          </MdList>
        </div>
      </div>
    </div>

    <!-- Interactive Features -->
    <div class="list-section">
      <h2>Interactive Features</h2>
      <div class="list-grid">
        <div class="list-group">
          <h3>Interactive List</h3>
          <MdList :md-theme="selectedTheme" :md-interactive="true">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
          </MdList>
        </div>

        <div class="list-group">
          <h3>Selectable List</h3>
          <MdList :md-theme="selectedTheme" :md-selectable="true">
            <MdListItem
              v-for="item in sampleItems"
              :key="item.id"
              :md-selected="selectedItems.includes(item.id)"
              @click="toggleSelection(item.id)"
            >
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
          </MdList>
        </div>

        <div class="list-group">
          <h3>Hover Effects</h3>
          <MdList :md-theme="selectedTheme" md-hover="elevate">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
          </MdList>
        </div>

        <div class="list-group">
          <h3>Focus Ring</h3>
          <MdList :md-theme="selectedTheme" :md-focus-ring="true">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
          </MdList>
        </div>
      </div>
    </div>

    <!-- Animation Variations -->
    <div class="list-section">
      <h2>Animation Variations</h2>
      <div class="list-grid">
        <div class="list-group">
          <h3>Fade In Animation</h3>
          <MdList :md-theme="selectedTheme" md-animate="fade-in">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
          </MdList>
        </div>

        <div class="list-group">
          <h3>Slide In Animation</h3>
          <MdList :md-theme="selectedTheme" md-animate="slide-in">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
          </MdList>
        </div>

        <div class="list-group">
          <h3>Scale In Animation</h3>
          <MdList :md-theme="selectedTheme" md-animate="scale-in">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
          </MdList>
        </div>

        <div class="list-group">
          <h3>Loading State</h3>
          <MdList :md-theme="selectedTheme" :md-loading="true">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
          </MdList>
        </div>
      </div>
    </div>

    <!-- Expansion Features -->
    <div class="list-section">
      <h2>Expansion Features</h2>
      <div class="list-grid">
        <div class="list-group">
          <h3>Expandable List</h3>
          <MdList :md-theme="selectedTheme" :md-expandable="true">
            <MdListItem
              v-for="item in expandableItems"
              :key="item.id"
              :md-expandable="true"
              :md-expanded="expandedItems.includes(item.id)"
              @click="handleItemClick(item)"
              @expand="expandItem(item.id)"
              @collapse="collapseItem(item.id)"
            >
              <MdIcon>{{ item.icon }}</MdIcon>
              <div>
                <div class="primary-text">{{ item.title }}</div>
                <div class="secondary-text">{{ item.subtitle }}</div>
              </div>
            </MdListItem>
          </MdList>
        </div>

        <div class="list-group">
          <h3>Accordion List</h3>
          <MdList :md-theme="selectedTheme" :md-accordion="true">
            <MdListItem
              v-for="item in expandableItems"
              :key="item.id"
              :md-expandable="true"
              :md-expanded="accordionExpanded === item.id"
              @click="handleItemClick(item)"
              @expand="expandAccordion(item.id)"
              @collapse="collapseAccordion()"
            >
              <MdIcon>{{ item.icon }}</MdIcon>
              <div>
                <div class="primary-text">{{ item.title }}</div>
                <div class="secondary-text">{{ item.subtitle }}</div>
              </div>
            </MdListItem>
          </MdList>
        </div>

        <div class="list-group">
          <h3>With Expansion Content</h3>
          <MdList :md-theme="selectedTheme" :md-expandable="true">
            <div v-for="item in expandableItems" :key="item.id">
              <MdListItem
                :md-expandable="true"
                :md-expanded="expandedItems.includes(item.id)"
                @click="handleItemClick(item)"
                @expand="expandItem(item.id)"
                @collapse="collapseItem(item.id)"
              >
                <MdIcon>{{ item.icon }}</MdIcon>
                <div>
                  <div class="primary-text">{{ item.title }}</div>
                  <div class="secondary-text">{{ item.subtitle }}</div>
                </div>
              </MdListItem>
              <MdListExpansion :md-expanded="expandedItems.includes(item.id)">
                <div class="expansion-content">
                  <h4>{{ item.title }} Details</h4>
                  <p>{{ item.description }}</p>
                  <div class="expansion-actions">
                    <MdButton :md-theme="selectedTheme" size="small">Edit</MdButton>
                    <MdButton :md-theme="selectedTheme" size="small" variant="outlined"
                      >Delete</MdButton
                    >
                  </div>
                </div>
              </MdListExpansion>
            </div>
          </MdList>
        </div>
      </div>
    </div>

    <!-- Special States -->
    <div class="list-section">
      <h2>Special States</h2>
      <div class="list-grid">
        <div class="list-group">
          <h3>Responsive List</h3>
          <MdList :md-theme="selectedTheme" :md-responsive="true">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
          </MdList>
        </div>

        <div class="list-group">
          <h3>Disabled List</h3>
          <MdList :md-theme="selectedTheme" :disabled="true">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
          </MdList>
        </div>

        <div class="list-group">
          <h3>Mixed States</h3>
          <MdList :md-theme="selectedTheme">
            <MdListItem v-for="item in sampleItems" :key="item.id" @click="handleItemClick(item)">
              <MdIcon>{{ item.icon }}</MdIcon>
              <span>{{ item.title }}</span>
            </MdListItem>
            <MdListItem :md-disabled="true">
              <MdIcon>block</MdIcon>
              <span>Disabled Item</span>
            </MdListItem>
            <MdListItem :md-selected="true">
              <MdIcon>check_circle</MdIcon>
              <span>Selected Item</span>
            </MdListItem>
          </MdList>
        </div>
      </div>
    </div>

    <!-- Interactive Demo -->
    <div class="list-section">
      <h2>Interactive Demo</h2>
      <div class="demo-controls">
        <div class="control-group">
          <label>Theme:</label>
          <select v-model="demoTheme">
            <option v-for="theme in themes" :key="theme" :value="theme">{{ theme }}</option>
          </select>
        </div>
        <div class="control-group">
          <label>
            <input type="checkbox" v-model="demoDense" />
            Dense
          </label>
        </div>
        <div class="control-group">
          <label>
            <input type="checkbox" v-model="demoCompact" />
            Compact
          </label>
        </div>
        <div class="control-group">
          <label>
            <input type="checkbox" v-model="demoSpacious" />
            Spacious
          </label>
        </div>
        <div class="control-group">
          <label>
            <input type="checkbox" v-model="demoInset" />
            Inset
          </label>
        </div>
        <div class="control-group">
          <label>
            <input type="checkbox" v-model="demoOutlined" />
            Outlined
          </label>
        </div>
        <div class="control-group">
          <label>
            <input type="checkbox" v-model="demoElevated" />
            Elevated
          </label>
        </div>
        <div class="control-group">
          <label>
            <input type="checkbox" v-model="demoInteractive" />
            Interactive
          </label>
        </div>
        <div class="control-group">
          <label>
            <input type="checkbox" v-model="demoSelectable" />
            Selectable
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

      <div class="demo-list">
        <MdList
          :md-theme="demoTheme"
          :md-dense="demoDense"
          :md-compact="demoCompact"
          :md-spacious="demoSpacious"
          :md-inset="demoInset"
          :md-outlined="demoOutlined"
          :md-elevated="demoElevated"
          :md-interactive="demoInteractive"
          :md-selectable="demoSelectable"
          :md-responsive="demoResponsive"
          :md-loading="demoLoading"
          :disabled="demoDisabled"
        >
          <MdListItem
            v-for="item in sampleItems"
            :key="item.id"
            :md-selected="demoSelectable && selectedItems.includes(item.id)"
            @click="demoSelectable ? toggleSelection(item.id) : handleItemClick(item)"
          >
            <MdIcon>{{ item.icon }}</MdIcon>
            <div>
              <div class="primary-text">{{ item.title }}</div>
              <div class="secondary-text">{{ item.subtitle }}</div>
            </div>
          </MdListItem>
        </MdList>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MdList from '../vue-materials/components/MdList/MdList.vue';
import MdListItem from '../vue-materials/components/MdList/MdListItem.vue';
import MdListExpansion from '../vue-materials/components/MdList/MdListExpansion.vue';
import MdIcon from '../vue-materials/components/MdIcon/MdIcon.vue';
import MdButton from '../vue-materials/components/MdButton/MdButton.vue';

export default defineComponent({
  name: 'MdListThemeTest',
  components: {
    MdList,
    MdListItem,
    MdListExpansion,
    MdIcon,
    MdButton,
  },
  setup() {
    const selectedTheme = ref('default');
    const demoTheme = ref('default');
    const demoDense = ref(false);
    const demoCompact = ref(false);
    const demoSpacious = ref(false);
    const demoInset = ref(false);
    const demoOutlined = ref(false);
    const demoElevated = ref(false);
    const demoInteractive = ref(false);
    const demoSelectable = ref(false);
    const demoResponsive = ref(false);
    const demoLoading = ref(false);
    const demoDisabled = ref(false);
    const selectedItems = ref<string[]>([]);
    const expandedItems = ref<string[]>([]);
    const accordionExpanded = ref<string | null>(null);

    const expandableItems = [
      {
        id: 'exp1',
        icon: 'folder',
        title: 'Documents',
        subtitle: 'Personal files',
        description: 'Contains all your personal documents and files.',
      },
      {
        id: 'exp2',
        icon: 'image',
        title: 'Photos',
        subtitle: 'Image gallery',
        description: 'Your photo collection and image files.',
      },
      {
        id: 'exp3',
        icon: 'music_note',
        title: 'Music',
        subtitle: 'Audio files',
        description: 'Your music library and audio files.',
      },
    ];

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

    const sampleItems = [
      {
        id: '1',
        icon: 'home',
        title: 'Home',
        subtitle: 'Main dashboard',
        description: 'Access your main dashboard and overview',
      },
      {
        id: '2',
        icon: 'person',
        title: 'Profile',
        subtitle: 'User settings',
        description: 'Manage your account and preferences',
      },
      {
        id: '3',
        icon: 'settings',
        title: 'Settings',
        subtitle: 'Application settings',
        description: 'Configure application options',
      },
      {
        id: '4',
        icon: 'notifications',
        title: 'Notifications',
        subtitle: 'System alerts',
        description: 'View and manage notifications',
      },
      {
        id: '5',
        icon: 'help',
        title: 'Help',
        subtitle: 'Support center',
        description: 'Get help and documentation',
      },
    ];

    const handleItemClick = (item: any) => {
      console.log('Item clicked:', item);
    };

    const toggleSelection = (itemId: string) => {
      const index = selectedItems.value.indexOf(itemId);
      if (index > -1) {
        selectedItems.value.splice(index, 1);
      } else {
        selectedItems.value.push(itemId);
      }
    };

    const expandItem = (itemId: string) => {
      if (!expandedItems.value.includes(itemId)) {
        expandedItems.value.push(itemId);
      }
    };

    const collapseItem = (itemId: string) => {
      const index = expandedItems.value.indexOf(itemId);
      if (index > -1) {
        expandedItems.value.splice(index, 1);
      }
    };

    const expandAccordion = (itemId: string) => {
      accordionExpanded.value = itemId;
    };

    const collapseAccordion = () => {
      accordionExpanded.value = null;
    };

    return {
      selectedTheme,
      demoTheme,
      demoDense,
      demoCompact,
      demoSpacious,
      demoInset,
      demoOutlined,
      demoElevated,
      demoInteractive,
      demoSelectable,
      demoResponsive,
      demoLoading,
      demoDisabled,
      selectedItems,
      expandedItems,
      accordionExpanded,
      expandableItems,
      themes,
      sampleItems,
      handleItemClick,
      expandItem,
      collapseItem,
      expandAccordion,
      collapseAccordion,
      toggleSelection,
    };
  },
});
</script>

<style lang="scss" scoped>
.md-list-theme-test {
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

  .list-section {
    margin-bottom: 40px;

    h2 {
      color: #333;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #eee;
    }

    .list-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;

      .list-group {
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

        .md-list {
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

      select {
        padding: 5px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
    }
  }

  .demo-list {
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
  }

  .primary-text {
    font-weight: 500;
    color: inherit;
  }

  .secondary-text {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    margin-top: 2px;
  }

  .tertiary-text {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 2px;
  }

  .expansion-content {
    h4 {
      margin: 0 0 10px 0;
      color: #333;
      font-size: 16px;
    }

    p {
      margin: 0 0 15px 0;
      color: #666;
      line-height: 1.5;
    }

    .expansion-actions {
      display: flex;
      gap: 10px;
    }
  }

  // Responsive design
  @media (max-width: 768px) {
    padding: 10px;

    .list-grid {
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

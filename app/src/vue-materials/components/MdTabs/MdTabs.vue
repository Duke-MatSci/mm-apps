<template>
  <div class="md-tabs" :class="[tabsClasses, mdActiveTheme]">
    <div class="md-tabs-navigation" :class="navigationClasses" ref="navigation">
      <a
        v-for="tab in tabs"
        :key="tab.id"
        :href="tab.href || '#'"
        class="md-button md-tab-nav-button"
        :class="[
          mdActiveTheme,
          {
            'router-link-exact-active router-link-active md-active': props.mdSyncRoute
              ? activeTabFromRoute === tab.id
              : activeTab === tab.id,
            'md-icon-label': tab.icon && tab.label,
          },
        ]"
        :aria-current="
          (props.mdSyncRoute ? activeTabFromRoute === tab.id : activeTab === tab.id)
            ? 'page'
            : undefined
        "
        @click="setActiveTab(tab.id)"
      >
        <div class="md-ripple">
          <div class="md-button-content">
            <template v-if="tab.icon">
              <md-icon
                class="md-tab-icon"
                v-if="isAssetIcon(tab.icon)"
                :md-src="tab.icon"
              ></md-icon>
              <md-icon class="md-tab-icon" v-else>{{ tab.icon }}</md-icon>
              <span class="md-tab-label">{{ tab.label }}</span>
            </template>
            <template v-else>
              {{ tab.label }}
            </template>
          </div>
        </div>
      </a>
      <span
        class="md-tabs-indicator"
        :style="indicatorStyles"
        :class="indicatorClass"
        ref="indicator"
      ></span>
    </div>

    <div ref="tabsContainer" class="md-tabs-container" :style="containerStyles">
      <slot />
    </div>
    <md-content
      ref="tabsContent"
      class="md-tabs-content"
      :style="contentStyles"
      v-show="hasContent"
    >
    </md-content>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, provide, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MdButton from '../MdButton/MdButton.vue';
import MdContent from '../MdContent/MdContent.vue';
import MdIcon from '../MdIcon/MdIcon.vue';

interface Props {
  mdAlignment?: 'left' | 'right' | 'centered' | 'fixed';
  mdElevation?: number | string;
  mdSyncRoute?: boolean;
  mdDynamicHeight?: boolean;
  mdActiveTab?: string | number;
  mdIsRtl?: boolean;
  mdTheme?: string;
}

const props = withDefaults(defineProps<Props>(), {
  mdAlignment: 'left',
  mdElevation: 0,
  mdSyncRoute: false,
  mdDynamicHeight: false,
  mdActiveTab: undefined,
  mdIsRtl: false,
  mdTheme: 'default',
});

const emit = defineEmits<{
  'md-changed': [value: string | number];
}>();

// Inject theme from parent component
const mdActiveTheme = inject(
  'mdActiveTheme',
  computed(() => `md-theme-${props.mdTheme}`)
);

// Get current route for sync functionality
const route = useRoute();
const router = useRouter();

// Reactive data
const activeTab = ref<string | number | null>(props.mdActiveTab || null);
const tabs = ref<
  Array<{
    id: string | number;
    label: string;
    icon?: string;
    disabled?: boolean;
    hasContent: boolean;
    href?: string;
  }>
>([]);
const indicatorStyles = ref<Record<string, string>>({});
const indicatorClass = ref<string | null>(null);
const noTransition = ref(true);
const containerStyles = ref({
  display: 'none',
});
const contentStyles = ref({
  height: '0px',
});
const hasContent = ref(false);

const navigation = ref<HTMLElement>();
const indicator = ref<HTMLElement>();
const tabsContent = ref<any>();
const tabsContainer = ref<HTMLElement>();

// Create a unique ID for this tabs instance
const tabsId = ref('tabs-' + Math.random().toString(36).substr(2, 9));

// Store tabs context globally
const tabsContext = {
  addTab: (tab: any) => {
    tabs.value.push(tab);
  },
  removeTab: (id: string | number) => {
    const index = tabs.value.findIndex((tab) => tab.id === id);
    if (index > -1) {
      tabs.value.splice(index, 1);
    }
  },
  updateTab: (id: string | number, updates: any) => {
    const tab = tabs.value.find((tab) => tab.id === id);
    if (tab) {
      Object.assign(tab, updates);
    }
  },
};

// Provide tabs context to child components
provide('MdTabs', tabsContext);

// Also provide the tabs ID
provide('MdTabsId', tabsId.value);

const tabsClasses = computed(() => {
  return {
    ['md-alignment-' + props.mdAlignment]: true,
    'md-dynamic-height': props.mdDynamicHeight,
    'md-no-transition': noTransition.value,
  };
});

const navigationClasses = computed(() => {
  return 'md-elevation-' + props.mdElevation;
});

// Determine active tab based on route when mdSyncRoute is enabled
const activeTabFromRoute = computed(() => {
  if (!props.mdSyncRoute) return null;

  const currentPath = route.path;
  const matchingTab = tabs.value.find((tab) => {
    if (tab.href === currentPath) return true;
    // Handle exact matching for routes with exact: true
    const tabRoute = tab.href;
    if (tabRoute && currentPath === tabRoute) return true;
    return false;
  });

  return matchingTab ? matchingTab.id : null;
});

// Utility functions
const isAssetIcon = (icon: string) => {
  return icon && (icon.includes('.') || icon.includes('/'));
};

const setActiveTab = (tabId: string | number) => {
  if (!props.mdSyncRoute) {
    activeTab.value = tabId;
    emit('md-changed', tabId);
  } else {
    // When mdSyncRoute is enabled, find the tab and navigate to its href
    const tab = tabs.value.find((t) => t.id === tabId);
    if (tab && tab.href && tab.href !== '#') {
      // Use router to navigate
      router.push(tab.href);
    }
  }
};

const setIndicatorStyles = () => {
  if (!navigation.value || !indicator.value) return;

  const activeButton = navigation.value.querySelector(
    '.md-tab-nav-button.md-active'
  ) as HTMLElement;
  if (!activeButton) return;

  const buttonRect = activeButton.getBoundingClientRect();
  const navRect = navigation.value.getBoundingClientRect();

  indicatorStyles.value = {
    left: `${buttonRect.left - navRect.left}px`,
    width: `${buttonRect.width}px`,
  };
};

const setHasContent = () => {
  hasContent.value = tabs.value.length > 0;
};

// Watchers
watch(
  () => activeTab.value,
  () => {
    nextTick(() => {
      setIndicatorStyles();
    });
  }
);

watch(
  () => props.mdActiveTab,
  (tabId) => {
    activeTab.value = tabId || null;
  }
);

// Watch for route changes when mdSyncRoute is enabled
watch(
  () => route.path,
  () => {
    if (props.mdSyncRoute && activeTabFromRoute.value) {
      activeTab.value = activeTabFromRoute.value;
    }
  }
);

watch(
  () => tabs.value,
  () => {
    setHasContent();
    if (tabs.value.length > 0 && !activeTab.value) {
      activeTab.value = tabs.value[0].id;
    }
  },
  { deep: true }
);

// Lifecycle
onMounted(() => {
  activeTab.value = props.mdActiveTab || (tabs.value.length > 0 ? tabs.value[0].id : null);

  nextTick(() => {
    setIndicatorStyles();
    setHasContent();
    noTransition.value = false;
  });

  if (navigation.value) {
    navigation.value.addEventListener('transitionend', setIndicatorStyles);
  }
});

onBeforeUnmount(() => {
  if (navigation.value) {
    navigation.value.removeEventListener('transitionend', setIndicatorStyles);
  }
});

defineOptions({
  name: 'MdTabs',
  components: {
    MdButton,
    MdContent,
    MdIcon,
  },
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';
@import '../MdElevation/mixins.scss';
@import '../MdLayout/mixins.scss';
@import './theme.scss';

// Base styles for md-tabs
.md-tabs {
  display: flex;
  flex-direction: column;

  &.md-no-transition * {
    transition: none !important;
  }

  &.md-dynamic-height .md-tabs-content {
    transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: height;
  }

  &.md-transparent {
    .md-tabs-navigation,
    .md-tabs-content {
      background-color: transparent !important;
    }
  }

  &.md-dynamic-height .md-tabs-content {
    transition: height 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  &.md-alignment-left .md-tabs-navigation {
    justify-content: flex-start;
  }

  &.md-alignment-right .md-tabs-navigation {
    justify-content: flex-end;
  }

  &.md-alignment-centered .md-tabs-navigation {
    justify-content: center;
  }

  &.md-alignment-fixed .md-tabs-navigation {
    justify-content: center;

    .md-button {
      max-width: 264px;
      min-width: 160px;
      flex: 1;

      @media (max-width: 600px) {
        min-width: 72px;
      }
    }
  }

  .md-toolbar & {
    padding-left: 48px;

    @media (max-width: 600px) {
      margin: 0 -8px;
      padding-left: 0px;
    }
  }
}

.md-tabs-navigation {
  display: flex;
  position: relative;

  .md-button {
    max-width: 264px;
    min-width: 72px;
    height: 48px;
    margin: 0;
    cursor: pointer;
    border-radius: 0;
    font-size: 13px;
  }

  .md-button-content {
    position: static;
  }

  .md-icon-label {
    height: 72px;

    .md-button-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .md-tab-icon + .md-tab-label {
      margin-top: 10px;
    }
  }

  .md-ripple {
    padding: 0 24px;

    @media (max-width: 600px) {
      padding: 0 12px;
    }
  }
}

.md-tabs-indicator {
  height: 2px;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateZ(0);
  will-change: left, right;

  &.md-tabs-indicator-left {
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1), right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &.md-tabs-indicator-right {
    transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1), left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.md-tabs-content {
  overflow: hidden;
  transition: none;
  will-change: height;
}

.md-tabs-container {
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  transform: translateZ(0);
  transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;
}

.md-tab {
  width: 100%;
  flex: 1 0 100%;
  padding: 16px;

  @media (max-width: 600px) {
    padding: 8px;
  }
}
</style>

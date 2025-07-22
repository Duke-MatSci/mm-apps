<template>
  <div class="md-tabs" :class="[tabsClasses, $mdActiveTheme]">
    <div class="md-tabs-navigation" :class="navigationClasses" ref="navigation">
      <md-button
        v-for="({ id, label, props, icon, disabled, data, events }, index) in orderedItems"
        :key="index"
        class="md-tab-nav-button"
        :class="{
          'md-active': !mdSyncRoute && isActiveTabId(id),
          'md-icon-label': icon && label,
        }"
        :disabled="disabled"
        v-bind="props"
        v-on="events"
        @click="setActiveTab(id)"
      >
        <slot name="md-tab" :tab="{ label, icon, data }" v-if="$slots['md-tab']"></slot>

        <template v-else>
          <template v-if="!icon">{{ label }}</template>
          <template v-else>
            <md-icon class="md-tab-icon" v-if="isAssetIcon(icon)" :md-src="icon"></md-icon>
            <md-icon class="md-tab-icon" v-else>{{ icon }}</md-icon>
            <span class="md-tab-label">{{ label }}</span>
          </template>
        </template>
      </md-button>
      <span
        class="md-tabs-indicator"
        :style="indicatorStyles"
        :class="indicatorClass"
        ref="indicator"
      ></span>
    </div>

    <md-content
      ref="tabsContent"
      class="md-tabs-content"
      :style="contentStyles"
      v-show="hasContent"
    >
      <div ref="tabsContainer" class="md-tabs-container" :style="containerStyles">
        <slot />
      </div>
    </md-content>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
  provide,
} from 'vue';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const raf = require('raf');
import MdComponent from '../../core/MdComponent';
import MdAssetIcon from '../../core/mixins/MdAssetIcon/MdAssetIcon';
import MdPropValidator from '../../core/utils/MdPropValidator';
import MdObserveElement from '../../core/utils/MdObserveElement';
import MdThrottling from '../../core/utils/MdThrottling';
import MdButton from '../MdButton/MdButton.vue';
import MdContent from '../MdContent/MdContent.vue';
import MdSwipeable from '../../core/mixins/MdSwipeable/MdSwipeable';

function areEqual(array1: any[], array2: any[]) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}

export default defineComponent({
  name: 'MdTabs',
  mixins: [MdAssetIcon, MdSwipeable],
  components: {
    MdButton,
    MdContent,
  },
  props: {
    mdAlignment: {
      type: String,
      default: 'left',
      ...MdPropValidator('md-alignment', ['left', 'right', 'centered', 'fixed']),
    },
    mdElevation: {
      type: [Number, String],
      default: 0,
    },
    mdSyncRoute: Boolean,
    mdDynamicHeight: Boolean,
    mdActiveTab: [String, Number],
    mdIsRtl: { type: Boolean, default: false },
  },
  emits: ['md-changed'],
  setup(props, { emit }) {
    const resizeObserver = ref<any>(null);
    const activeTab = ref<any>(null);
    const activeTabIndex = ref(0);
    const indicatorStyles = ref({});
    const indicatorClass = ref<string | null>(null);
    const noTransition = ref(true);
    const containerStyles = ref({});
    const contentStyles = ref({
      height: '0px',
    });
    const hasContent = ref(false);
    const MdTabs = ref({
      items: new Map(),
    });
    const activeButtonEl = ref<any>(null);
    const orderedIds = ref<(string | number)[]>([]);

    const navigation = ref<HTMLElement>();
    const indicator = ref<HTMLElement>();
    const tabsContent = ref<any>();
    const tabsContainer = ref<HTMLElement>();

    provide('MdTabs', MdTabs.value);

    const orderedItems = computed(() => {
      return orderedIds.value
        .map((tabId) => {
          const item = MdTabs.value.items.get(tabId);
          return item || null;
        })
        .filter((item) => item !== null && item !== undefined);
    });

    const tabsClasses = computed(() => {
      return {
        ['md-alignment-' + props.mdAlignment]: true,
        'md-no-transition': noTransition.value,
        'md-dynamic-height': props.mdDynamicHeight,
      };
    });

    const navigationClasses = computed(() => {
      return 'md-elevation-' + props.mdElevation;
    });

    const mdSwipeElement = computed(() => {
      return tabsContent.value?.$el;
    });

    const isActiveTabId = (id: any) => {
      // A tab ID could be NaN (this is a valid Number value), but NaN is not equal to itself
      return (Number.isNaN(id) && Number.isNaN(activeTab.value)) || id === activeTab.value;
    };

    const hasActiveTab = () => {
      // Warning: a tab ID could be 0 (a falsy value),
      // or it could be NaN (this is a valid Number value),
      // but not null nor undefined (MdTabs.props.id is required):
      // so we use `!=` and not `!==` for comparison
      return activeTab.value != null || props.mdActiveTab != null;
    };

    const setActiveTab = (tabId: any) => {
      if (!props.mdSyncRoute) {
        activeTab.value = tabId;
      }
    };

    const setActiveButtonElAndIndicatorStyles = () => {
      nextTick().then(() => {
        setIndicatorStyles();
        setActiveButtonEl();
      });
    };

    const tryKeepCurrentTab = () => {
      if (props.mdSyncRoute) {
        return;
      }

      const newIndexOfCurrentTabId = orderedIds.value.indexOf(activeTab.value);
      const canKeepCurrentTabId = newIndexOfCurrentTabId !== -1;

      const lastTabIndex = orderedIds.value.length - 1;
      const canKeepCurrentTabIndex =
        activeTabIndex.value >= 0 && activeTabIndex.value <= lastTabIndex;

      const hasAtLeastOneTab = lastTabIndex !== -1;

      if (canKeepCurrentTabId) {
        setActiveButtonElAndIndicatorStyles(); // Refresh the tab by its new location
      } else if (canKeepCurrentTabIndex) {
        setActiveTabByIndex(activeTabIndex.value);
      } else if (hasAtLeastOneTab) {
        setActiveTabByIndex(lastTabIndex);
      } else {
        activeTab.value = null;
      }
    };

    const setActiveButtonEl = () => {
      if (navigation.value) {
        activeButtonEl.value = navigation.value.querySelector('.md-tab-nav-button.md-active');
      }
    };

    const setActiveTabByIndex = (index: number) => {
      activeTab.value = orderedIds.value[index];
    };

    const ensureHasActiveTab = () => {
      if (!hasActiveTab()) {
        activeTab.value = orderedIds.value[0];
      }
    };

    const setHasContent = () => {
      hasContent.value = orderedItems.value.some((item: any) => item && item.hasContent);
    };

    let setIndicatorStyles = () => {
      raf(() => {
        nextTick().then(() => {
          if (activeButtonEl.value && indicator.value) {
            const buttonWidth = activeButtonEl.value.offsetWidth;
            const buttonLeft = activeButtonEl.value.offsetLeft;
            const indicatorLeft = indicator.value.offsetLeft;

            if (indicatorLeft < buttonLeft) {
              indicatorClass.value = 'md-tabs-indicator-right';
            } else {
              indicatorClass.value = 'md-tabs-indicator-left';
            }

            indicatorStyles.value = {
              left: `${buttonLeft}px`,
              right: `calc(100% - ${buttonWidth + buttonLeft}px)`,
            };
          } else {
            indicatorStyles.value = {
              left: '100%',
              right: '100%',
            };
          }
        });
      });
    };

    const calculateTabPos = () => {
      if (hasContent.value && tabsContainer.value) {
        const tabElements = ours(
          tabsContainer.value.querySelectorAll(`.md-tab:nth-child(${activeTabIndex.value + 1})`)
        );
        const tabElement = tabElements.length ? tabElements[0] : null;

        contentStyles.value = {
          height: tabElement ? `${(tabElement as HTMLElement).offsetHeight}px` : '0px',
        };
        containerStyles.value = {
          transform: `translate3D(${
            props.mdIsRtl ? activeTabIndex.value * 100 : -activeTabIndex.value * 100
          }%, 0, 0)`,
        };
      }
    };

    const callResizeFunctions = () => {
      setIndicatorStyles();
      calculateTabPos();
    };

    const setupObservers = () => {
      if (tabsContent.value?.$el) {
        const contentElement = tabsContent.value.$el.querySelector('.md-tabs-content');
        if (contentElement) {
          resizeObserver.value = MdObserveElement(
            contentElement,
            {
              childList: true,
              characterData: true,
              subtree: true,
            },
            () => {
              callResizeFunctions();
            }
          );
        }
      }

      window.addEventListener('resize', callResizeFunctions);
    };

    const recomputeOrderedIds = () => {
      if (tabsContainer.value) {
        const orderedIdsArray = ours(tabsContainer.value.querySelectorAll('.md-tab')).map(
          (tabElement: any) => tabElement.mdTabIdAsObject
        ) as (string | number)[];

        // Do not force VueJs to rerender the view and us to recompute everything if the change event was not about tabs
        if (!areEqual(orderedIds.value, orderedIdsArray)) {
          orderedIds.value = orderedIdsArray;
        }
      }
    };

    /**
     * querySelector/querySelectorAll return all descendant elements, even elements from nested md-tabs.
     * @return only the md-tab elements that are owned by this md-tabs
     */
    const ours = (tabElements: any) => {
      return Array.from(tabElements).filter(
        (tabElement: any) => tabElement.parentNode === tabsContainer.value
      );
    };

    watch(
      () => MdTabs.value,
      () => {
        recomputeOrderedIds();
        setHasContent();
        tryKeepCurrentTab();
      },
      { deep: true }
    );

    watch(
      () => activeTab.value,
      (tabId) => {
        emit('md-changed', tabId);
        setActiveButtonElAndIndicatorStyles();
      }
    );

    watch(
      () => props.mdActiveTab,
      (tabId) => {
        activeTab.value = tabId;
      }
    );

    watch(
      () => activeButtonEl.value,
      (activeButtonElement) => {
        activeTabIndex.value = activeButtonElement
          ? Array.from(activeButtonElement.parentNode.childNodes).indexOf(activeButtonElement)
          : -1;
      }
    );

    watch(
      () => activeTabIndex.value,
      () => {
        setIndicatorStyles();
        calculateTabPos();
      }
    );

    // Note: swiped property is handled by MdSwipeable mixin
    // watch(
    //   () => props.swiped,
    //   (value) => {
    //     const max = orderedIds.value.length;
    //     if (activeTabIndex.value < max && value === 'right') {
    //       setActiveTabByIndex(activeTabIndex.value + 1);
    //     } else if (activeTabIndex.value > 0 && value === 'left') {
    //       setActiveTabByIndex(activeTabIndex.value - 1);
    //     }
    //   }
    // );

    onMounted(() => {
      setIndicatorStyles = MdThrottling(setIndicatorStyles, 300);
      activeTab.value = props.mdActiveTab;

      setupObservers();

      nextTick()
        .then(() => {
          if (!props.mdSyncRoute) {
            recomputeOrderedIds();
            ensureHasActiveTab();
          }

          return nextTick();
        })
        .then(() => {
          window.setTimeout(() => {
            setActiveButtonEl();
            callResizeFunctions();
            noTransition.value = false;
            setupObservers();
          }, 100);
        });

      if (navigation.value) {
        navigation.value.addEventListener('transitionend', setIndicatorStyles);
      }
    });

    onBeforeUnmount(() => {
      if (resizeObserver.value) {
        resizeObserver.value.disconnect();
      }

      window.removeEventListener('resize', callResizeFunctions);
      if (navigation.value) {
        navigation.value.removeEventListener('transitionend', setIndicatorStyles);
      }
    });

    return {
      resizeObserver,
      activeTab,
      activeTabIndex,
      indicatorStyles,
      indicatorClass,
      noTransition,
      containerStyles,
      contentStyles,
      hasContent,
      MdTabs,
      activeButtonEl,
      orderedIds,
      navigation,
      indicator,
      tabsContent,
      tabsContainer,
      orderedItems,
      tabsClasses,
      navigationClasses,
      mdSwipeElement,
      isActiveTabId,
      hasActiveTab,
      setActiveTab,
      setActiveButtonElAndIndicatorStyles,
      tryKeepCurrentTab,
      setActiveButtonEl,
      setActiveTabByIndex,
      ensureHasActiveTab,
      setHasContent,
      setIndicatorStyles,
      calculateTabPos,
      callResizeFunctions,
      setupObservers,
      recomputeOrderedIds,
      ours,
    };
  },
});
</script>

<style lang="scss">
@import '../MdAnimation/variables';
@import '../MdElevation/mixins';
@import '../MdLayout/mixins';

.md-tabs {
  display: flex;
  flex-direction: column;

  &.md-no-transition * {
    transition: none !important;
  }

  &.md-dynamic-height .md-tabs-content {
    transition: height 0.3s $md-transition-default-timing;
    will-change: height;
  }

  &.md-transparent {
    .md-tabs-navigation,
    .md-tabs-content {
      background-color: transparent !important;
    }
  }

  &.md-dynamic-height .md-tabs-content {
    transition: height 0.35s $md-transition-stand-timing;
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

      @include md-layout-small {
        min-width: 72px;
      }
    }
  }

  .md-toolbar & {
    padding-left: 48px;

    @include md-layout-small {
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

    @include md-layout-small {
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
    transition: left 0.3s $md-transition-default-timing, right 0.35s $md-transition-default-timing;
  }

  &.md-tabs-indicator-right {
    transition: right 0.3s $md-transition-default-timing, left 0.35s $md-transition-default-timing;
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
  transition: transform 0.35s $md-transition-default-timing;
  will-change: transform;
}

.md-tab {
  width: 100%;
  flex: 1 0 100%;
  padding: 16px;

  @include md-layout-small {
    padding: 8px;
  }
}
</style>

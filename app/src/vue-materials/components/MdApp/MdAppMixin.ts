import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import MdPropValidator from '../../core/utils/MdPropValidator';

const mdAppModes = ['fixed', 'fixed-last', 'reveal', 'overlap', 'flexible'];

export interface MdAppOptions {
  mode: string | null;
  waterfall: boolean;
  flexible: boolean;
}

export interface MdAppToolbar {
  element: HTMLElement | null;
  titleElement: HTMLElement | null;
  height: string;
  initialHeight: number;
  top: number;
  titleSize: number;
  hasElevation: boolean;
  revealActive: boolean;
  fixedLastActive: boolean;
  fixedLastHeight: number;
  overlapOff: boolean;
}

export interface MdAppDrawer {
  initialWidth: number;
  active: boolean;
  mode: string;
  submode: string | null;
  width: number;
  right: boolean;
}

export interface MdAppContext {
  options: MdAppOptions;
  toolbar: MdAppToolbar;
  drawer: MdAppDrawer;
}

export function useMdAppMixin(props: {
  mdMode?: string;
  mdWaterfall?: boolean;
  mdScrollbar?: boolean;
}) {
  // Validate mdMode prop using MdPropValidator
  if (props.mdMode && !mdAppModes.includes(props.mdMode)) {
    const validator = MdPropValidator('md-mode', mdAppModes);
    validator.validator(props.mdMode);
  }

  // Reactive data
  const revealTimer = ref<number | null>(null);
  const revealLastPos = ref(0);
  const manualTick = ref(false);

  const MdApp = ref<MdAppContext>({
    options: {
      mode: props.mdMode || null,
      waterfall: props.mdWaterfall || false,
      flexible: false,
    },
    toolbar: {
      element: null,
      titleElement: null,
      height: '0px',
      initialHeight: 0,
      top: 0,
      titleSize: 20,
      hasElevation: true,
      revealActive: false,
      fixedLastActive: false,
      fixedLastHeight: 0,
      overlapOff: false,
    },
    drawer: {
      initialWidth: 0,
      active: false,
      mode: 'temporary',
      submode: null,
      width: 0,
      right: false,
    },
  });

  // Computed properties
  const isFixed = computed(() => {
    return props.mdMode && props.mdMode !== 'fixed';
  });

  const isDrawerMini = computed(() => {
    return MdApp.value.drawer.mode === 'persistent' && MdApp.value.drawer.submode === 'mini';
  });

  const contentPadding = computed(() => {
    const drawer = MdApp.value.drawer;

    if (drawer.active && drawer.mode === 'persistent' && drawer.submode === 'full') {
      return drawer.width;
    }

    return 0;
  });

  const contentStyles = computed(() => {
    return {
      [`padding-${MdApp.value.drawer.right ? 'right' : 'left'}`]: contentPadding.value,
    };
  });

  const containerStyles = computed(() => {
    const styles: Record<string, string> = {};

    if (isFixed.value) {
      styles['margin-top'] = MdApp.value.toolbar.initialHeight + 'px';
    }

    if (isDrawerMini.value) {
      styles[`padding-${MdApp.value.drawer.right ? 'right' : 'left'}`] = !MdApp.value.drawer.active
        ? MdApp.value.drawer.initialWidth + 'px'
        : '0px';
    }

    return styles;
  });

  const scrollerClasses = computed(() => {
    if (props.mdScrollbar !== false) {
      return 'md-scrollbar';
    }
    return '';
  });

  const appClasses = computed(() => {
    return {
      'md-waterfall': props.mdWaterfall,
      'md-flexible': props.mdMode === 'flexible',
      'md-fixed': props.mdMode === 'fixed',
      'md-fixed-last': props.mdMode === 'fixed-last',
      'md-reveal': props.mdMode === 'reveal',
      'md-overlap': props.mdMode === 'overlap',
      'md-drawer-active': MdApp.value.drawer.active,
    };
  });

  // Methods
  const setToolbarElevation = () => {
    MdApp.value.toolbar.hasElevation = !props.mdWaterfall;
  };

  const setToolbarTimer = (scrollTop: number) => {
    if (revealTimer.value) {
      window.clearTimeout(revealTimer.value);
    }

    revealTimer.value = window.setTimeout(() => {
      revealLastPos.value = scrollTop;
    }, 100);
  };

  const setToolbarMarginAndHeight = (margin: number, height: number) => {
    MdApp.value.toolbar.top = margin;
    MdApp.value.toolbar.height = height + 'px';
  };

  const getToolbarConstrants = ($event: Event) => {
    const target = $event.target as HTMLElement;
    const toolbarHeight = MdApp.value.toolbar.element?.offsetHeight || 0;
    const safeAmount = 10;
    const threshold = toolbarHeight + safeAmount;
    const scrollTop = target.scrollTop;

    if (!MdApp.value.toolbar.initialHeight) {
      MdApp.value.toolbar.initialHeight = toolbarHeight;
    }

    return {
      toolbarHeight,
      safeAmount,
      threshold,
      scrollTop,
      initialHeight: MdApp.value.toolbar.initialHeight,
    };
  };

  const handleWaterfallScroll = ($event: Event) => {
    const { threshold, scrollTop } = getToolbarConstrants($event);
    let elevationMark = 4;

    if (props.mdMode === 'reveal') {
      elevationMark = threshold;
    }

    MdApp.value.toolbar.hasElevation = scrollTop >= elevationMark;
  };

  const handleFlexibleMode = ($event: Event) => {
    const { scrollTop, initialHeight } = getToolbarConstrants($event);
    const toolbar = MdApp.value.toolbar.element;
    if (!toolbar) return;

    const firstRow = toolbar.querySelector('.md-toolbar-row:first-child') as HTMLElement;
    const firstRowHeight = firstRow?.offsetHeight || 0;
    const scrollAmount = initialHeight - scrollTop;
    const shouldKeepFlexible = scrollTop < initialHeight - firstRowHeight;

    if (firstRowHeight) {
      if (shouldKeepFlexible) {
        toolbar.style.height = scrollAmount + 'px';
      } else {
        toolbar.style.height = firstRowHeight + 'px';
      }
    }

    const titleElement = MdApp.value.toolbar.titleElement;
    if (titleElement) {
      const targetSize = 20;
      const initialSize = MdApp.value.toolbar.titleSize;

      if (shouldKeepFlexible) {
        const newSize =
          Math.max(0, 1 - (scrollTop - initialSize) / (scrollAmount + initialSize + 0.000001)) *
            (initialSize - targetSize) +
          targetSize;
        titleElement.style.fontSize = newSize + 'px';
      } else {
        titleElement.style.fontSize = '20px';
      }
    }

    const { threshold, toolbarHeight } = getToolbarConstrants($event);
    setToolbarMarginAndHeight(scrollTop - threshold, toolbarHeight);
  };

  const handleRevealMode = ($event: Event) => {
    const { toolbarHeight, safeAmount, threshold, scrollTop } = getToolbarConstrants($event);

    setToolbarTimer(scrollTop);
    setToolbarMarginAndHeight(scrollTop - threshold, toolbarHeight);

    if (scrollTop >= threshold) {
      MdApp.value.toolbar.revealActive = revealLastPos.value > scrollTop + safeAmount;
    } else {
      MdApp.value.toolbar.revealActive = true;
    }
  };

  const handleFixedLastMode = ($event: Event) => {
    const { scrollTop, toolbarHeight, safeAmount } = getToolbarConstrants($event);
    const toolbar = MdApp.value.toolbar.element;
    if (!toolbar) return;

    const firstRow = toolbar.querySelector('.md-toolbar-row:first-child') as HTMLElement;
    const firstRowHeight = firstRow?.offsetHeight || 0;

    setToolbarTimer(scrollTop);
    setToolbarMarginAndHeight(scrollTop - firstRowHeight, toolbarHeight);
    MdApp.value.toolbar.fixedLastHeight = firstRowHeight;

    if (scrollTop >= firstRowHeight) {
      MdApp.value.toolbar.fixedLastActive = revealLastPos.value > scrollTop + safeAmount;
    } else {
      MdApp.value.toolbar.fixedLastActive = true;
    }
  };

  const handleOverlapMode = ($event: Event) => {
    const { toolbarHeight, scrollTop, initialHeight } = getToolbarConstrants($event);
    const toolbar = MdApp.value.toolbar.element;
    if (!toolbar) return;

    const firstRow = toolbar.querySelector('.md-toolbar-row:first-child') as HTMLElement;
    const firstRowHeight = firstRow?.offsetHeight || 0;
    const newHeight =
      initialHeight -
      scrollTop -
      (scrollTop * 100) / (initialHeight - firstRowHeight - firstRowHeight / 1.5);

    if (firstRowHeight) {
      if (scrollTop < initialHeight - firstRowHeight && newHeight >= firstRowHeight) {
        MdApp.value.toolbar.overlapOff = false;
        toolbar.style.height = newHeight + 'px';
      } else {
        MdApp.value.toolbar.overlapOff = true;
        toolbar.style.height = firstRowHeight + 'px';
      }
    }

    setToolbarMarginAndHeight(scrollTop, toolbarHeight);
  };

  const handleModeScroll = ($event: Event) => {
    if (props.mdMode === 'reveal') {
      handleRevealMode($event);
    } else if (props.mdMode === 'fixed-last') {
      handleFixedLastMode($event);
    } else if (props.mdMode === 'overlap') {
      handleOverlapMode($event);
    } else if (props.mdMode === 'flexible') {
      handleFlexibleMode($event);
    }
  };

  const handleScroll = ($event: Event) => {
    if (MdApp.value.toolbar.element) {
      requestAnimationFrame(() => {
        if (props.mdWaterfall) {
          handleWaterfallScroll($event);
        }

        if (props.mdMode) {
          handleModeScroll($event);
        }
      });
    }
  };

  // Watchers
  watch(
    () => props.mdMode,
    (mode) => {
      // Validate mode when it changes
      if (mode && !mdAppModes.includes(mode)) {
        const validator = MdPropValidator('md-mode', mdAppModes);
        validator.validator(mode);
      }
      MdApp.value.options.mode = mode || null;
    }
  );

  watch(
    () => props.mdWaterfall,
    (waterfall) => {
      MdApp.value.options.waterfall = waterfall || false;
      setToolbarElevation();
    }
  );

  // Lifecycle hooks
  onMounted(() => {
    MdApp.value.options.mode = props.mdMode || null;
    MdApp.value.options.waterfall = props.mdWaterfall || false;
    setToolbarElevation();

    const fakeEvent = {
      target: {
        scrollTop: 0,
      },
    } as unknown as Event;

    if (props.mdMode === 'reveal') {
      MdApp.value.toolbar.revealActive = true;
      handleRevealMode(fakeEvent);
    }

    if (props.mdMode === 'flexible') {
      MdApp.value.toolbar.revealActive = true;
      handleFlexibleMode(fakeEvent);
    }

    if (props.mdMode === 'fixed-last') {
      MdApp.value.toolbar.fixedLastActive = true;
      handleFixedLastMode(fakeEvent);
    }

    if (props.mdMode === 'overlap') {
      handleOverlapMode(fakeEvent);
    }
  });

  onBeforeUnmount(() => {
    if (revealTimer.value) {
      window.clearTimeout(revealTimer.value);
    }
  });

  return {
    MdApp,
    isFixed,
    isDrawerMini,
    contentPadding,
    contentStyles,
    containerStyles,
    scrollerClasses,
    appClasses,
    handleScroll,
  };
}

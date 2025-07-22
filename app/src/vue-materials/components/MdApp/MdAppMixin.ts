import { ref, computed, watch, onMounted, provide } from 'vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import raf from 'raf';
import MdPropValidator from '../../core/utils/MdPropValidator';

const mdAppModes = ['fixed', 'fixed-last', 'reveal', 'overlap', 'flexible'];

export default function useMdAppMixin(props: any) {
  const revealTimer = ref(null as any);
  const revealLastPos = ref(0);
  const manualTick = ref(false);

  const MdApp = ref({
    options: {
      mode: null as string | null,
      waterfall: false,
      flexible: false,
    },
    toolbar: {
      element: null as HTMLElement | null,
      titleElement: null as HTMLElement | null,
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
      submode: null as string | null,
      width: 0,
      right: false,
    },
  });

  provide('MdApp', MdApp);

  const isFixed = computed(() => {
    return props.mdMode && props.mdMode !== 'fixed';
  });

  const isDrawerMini = computed(() => {
    return MdApp.value.drawer.mode === 'persistent' && MdApp.value.drawer.submode === 'mini';
  });

  const contentPadding = computed(() => {
    const drawer = MdApp.value.drawer;

    if (
      MdApp.value.drawer.active &&
      MdApp.value.drawer.mode === 'persistent' &&
      MdApp.value.drawer.submode === 'full'
    ) {
      return MdApp.value.drawer.width;
    }

    return 0;
  });

  const contentStyles = computed(() => {
    return {
      [`padding-${MdApp.value.drawer.right ? 'right' : 'left'}`]: contentPadding.value,
    };
  });

  const containerStyles = computed(() => {
    const styles: any = {};

    if (isFixed.value) {
      styles['margin-top'] = MdApp.value.toolbar.initialHeight + 'px';
    }

    if (isDrawerMini.value) {
      styles[`padding-${MdApp.value.drawer.right ? 'right' : 'left'}`] = !MdApp.value.drawer.active
        ? MdApp.value.drawer.initialWidth + 'px'
        : 0;
    }

    return styles;
  });

  const scrollerClasses = computed(() => {
    if (props.mdScrollbar) {
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

  const setToolbarElevation = () => {
    MdApp.value.toolbar.hasElevation = !props.mdWaterfall;
  };

  const setToolbarTimer = (scrollTop: number) => {
    window.clearTimeout(revealTimer.value);

    revealTimer.value = window.setTimeout(() => {
      revealLastPos.value = scrollTop;
    }, 100);
  };

  const setToolbarMarginAndHeight = (margin: number, height: number | string) => {
    MdApp.value.toolbar.top = margin;
    MdApp.value.toolbar.height = typeof height === 'number' ? height + 'px' : height;
  };

  const getToolbarConstrants = ($event: any) => {
    const toolbarHeight = MdApp.value.toolbar.element!.offsetHeight;
    const safeAmount = 10;
    const threshold = toolbarHeight + safeAmount;
    const scrollTop = $event.target.scrollTop;

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

  const handleWaterfallScroll = ($event: any) => {
    const { threshold, scrollTop } = getToolbarConstrants($event);
    let elevationMark = 4;

    if (props.mdMode === 'reveal') {
      elevationMark = threshold;
    }

    MdApp.value.toolbar.hasElevation = scrollTop >= elevationMark;
  };

  const handleFlexibleMode = ($event: any) => {
    const { scrollTop, initialHeight } = getToolbarConstrants($event);
    const toolbar = MdApp.value.toolbar.element!;
    const firstRow = toolbar.querySelector('.md-toolbar-row:first-child') as HTMLElement;
    const firstRowHeight = firstRow.offsetHeight;
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

  const handleRevealMode = ($event: any) => {
    const { toolbarHeight, safeAmount, threshold, scrollTop } = getToolbarConstrants($event);

    setToolbarTimer(scrollTop);
    setToolbarMarginAndHeight(scrollTop - threshold, toolbarHeight);

    if (scrollTop >= threshold) {
      MdApp.value.toolbar.revealActive = revealLastPos.value > scrollTop + safeAmount;
    } else {
      MdApp.value.toolbar.revealActive = true;
    }
  };

  const handleFixedLastMode = ($event: any) => {
    const { scrollTop, toolbarHeight, safeAmount } = getToolbarConstrants($event);
    const toolbar = MdApp.value.toolbar.element!;
    const firstRow = toolbar.querySelector('.md-toolbar-row:first-child') as HTMLElement;
    const firstRowHeight = firstRow.offsetHeight;

    setToolbarTimer(scrollTop);
    setToolbarMarginAndHeight(scrollTop - firstRowHeight, toolbarHeight);
    MdApp.value.toolbar.fixedLastHeight = firstRowHeight;

    if (scrollTop >= firstRowHeight) {
      MdApp.value.toolbar.fixedLastActive = revealLastPos.value > scrollTop + safeAmount;
    } else {
      MdApp.value.toolbar.fixedLastActive = true;
    }
  };

  const handleOverlapMode = ($event: any) => {
    const { toolbarHeight, scrollTop, initialHeight } = getToolbarConstrants($event);
    const toolbar = MdApp.value.toolbar.element!;
    const firstRow = toolbar.querySelector('.md-toolbar-row:first-child') as HTMLElement;
    const firstRowHeight = firstRow.offsetHeight;
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

  const handleModeScroll = ($event: any) => {
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

  const handleScroll = ($event: any) => {
    if (MdApp.value.toolbar.element) {
      raf(() => {
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
    (mode: string) => {
      MdApp.value.options.mode = mode;
    }
  );

  watch(
    () => props.mdWaterfall,
    (waterfall: boolean) => {
      MdApp.value.options.waterfall = waterfall;
      setToolbarElevation();
    }
  );

  // Lifecycle
  onMounted(() => {
    MdApp.value.options.mode = props.mdMode;
    MdApp.value.options.waterfall = props.mdWaterfall;
    setToolbarElevation();

    const fakeEvent = {
      target: {
        scrollTop: 0,
      },
    };

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
    setToolbarElevation,
    setToolbarTimer,
    setToolbarMarginAndHeight,
    getToolbarConstrants,
    handleWaterfallScroll,
    handleFlexibleMode,
    handleRevealMode,
    handleFixedLastMode,
    handleOverlapMode,
    handleModeScroll,
  };
}

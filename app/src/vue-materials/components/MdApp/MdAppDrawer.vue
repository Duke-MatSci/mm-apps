<template>
  <md-drawer
    class="md-app-drawer"
    :md-active="mdActive && initialized"
    v-bind="$attrs"
    :md-right="mdRight"
    ref="drawer"
  >
    <slot />
  </md-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  ref,
  nextTick,
  onMounted,
  onUpdated,
  onBeforeUnmount,
  computed,
  watch,
} from 'vue';

interface MdAppDrawer {
  initialWidth: number;
  active: boolean;
  mode: string;
  submode: string | null;
  width: number;
  right: boolean;
}

interface MdApp {
  drawer: MdAppDrawer;
}

export default defineComponent({
  name: 'MdAppDrawer',
  inject: {
    MdApp: {
      default: null,
    },
  },
  props: {
    mdRight: {
      type: Boolean,
      default: false,
    },
    mdActive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const mdApp = inject('MdApp') as MdApp;
    const drawerElement = ref({
      mdActive: null,
      mode: null,
      submode: null,
    });
    const initialized = ref(false);
    const drawer = ref(null);

    const visible = computed(() => {
      return drawerElement.value.mdActive || false;
    });

    const mode = computed(() => {
      return drawerElement.value.mode || 'temporary';
    });

    const submode = computed(() => {
      return drawerElement.value.submode;
    });

    const getDrawerWidth = (): number => {
      if (drawer.value) {
        const width = window.getComputedStyle(drawer.value).width;
        return parseInt(width, 10) || 0;
      }
      return 0;
    };

    const updateDrawerData = () => {
      if (mdApp) {
        mdApp.drawer.width = getDrawerWidth();
        mdApp.drawer.active = visible.value;
        mdApp.drawer.mode = mode.value;
        mdApp.drawer.submode = submode.value;
        mdApp.drawer.right = props.mdRight;
      }
    };

    const clearDrawerData = () => {
      if (mdApp) {
        mdApp.drawer.width = 0;
        mdApp.drawer.active = false;
        mdApp.drawer.mode = 'temporary';
        mdApp.drawer.submode = null;
        mdApp.drawer.initialWidth = 0;
      }
    };

    watch(visible, (visible) => {
      if (mdApp) {
        mdApp.drawer.width = getDrawerWidth();
        mdApp.drawer.active = visible;
      }
    });

    watch(mode, (mode) => {
      if (mdApp) {
        mdApp.drawer.mode = mode;
      }
    });

    watch(submode, (submode) => {
      if (mdApp) {
        mdApp.drawer.submode = submode;
      }
    });

    watch(
      () => props.mdRight,
      (right) => {
        if (mdApp) {
          mdApp.drawer.right = right;
        }
      }
    );

    onMounted(() => {
      nextTick().then(() => {
        if (mdApp && drawer.value) {
          mdApp.drawer.initialWidth = (drawer.value as HTMLElement).offsetWidth;
          drawerElement.value = drawer.value as any;
          updateDrawerData();
          initialized.value = true;
        }
      });
    });

    onUpdated(() => {
      drawerElement.value = drawer.value as any;
    });

    onBeforeUnmount(() => {
      clearDrawerData();
    });

    return {
      drawerElement,
      initialized,
      drawer,
      visible,
      mode,
      submode,
      getDrawerWidth,
      updateDrawerData,
      clearDrawerData,
    };
  },
});
</script>

<template>
  <div class="md-tooltip-container">
    <transition name="md-tooltip" v-if="shouldRender">
      <div class="md-tooltip" :class="[tooltipClasses, mdActiveTheme]" :style="tooltipStyles">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

// Props
interface Props {
  mdTheme?: string;
  mdActive?: boolean;
  mdDelay?: string | number;
  mdDirection?: 'top' | 'right' | 'bottom' | 'left';
}

const props = withDefaults(defineProps<Props>(), {
  mdTheme: 'default',
  mdActive: false,
  mdDelay: 0,
  mdDirection: 'bottom',
});

// Emits
const emit = defineEmits<{
  'update:mdActive': [value: boolean];
}>();

// Inject theme from parent component
const mdActiveTheme = inject(
  'mdActiveTheme',
  computed(() => `md-theme-${props.mdTheme}`)
);

// Reactive data
const shouldRender = ref(false);
const targetEl = ref<HTMLElement | null>(null);

// Computed
const tooltipClasses = computed(() => `md-tooltip-${props.mdDirection}`);

const tooltipStyles = computed(() => `transition-delay: ${props.mdDelay}ms`);

// Methods
const show = () => {
  shouldRender.value = true;
};

const hide = () => {
  shouldRender.value = false;
};

// Watchers
watch(
  () => props.mdActive,
  (newValue) => {
    shouldRender.value = newValue;
  }
);

watch(shouldRender, (newValue) => {
  emit('update:mdActive', newValue);
});

// Lifecycle hooks
onMounted(async () => {
  await nextTick();
  shouldRender.value = props.mdActive;

  // In Vue 3, we need to find the target element differently
  // This is a simplified approach
  const parentElement = document.querySelector('[data-tooltip-target]');
  if (parentElement) {
    targetEl.value = parentElement as HTMLElement;
    targetEl.value.addEventListener('mouseenter', show, false);
    targetEl.value.addEventListener('mouseleave', hide, false);
  }
});

onBeforeUnmount(() => {
  if (targetEl.value) {
    targetEl.value.removeEventListener('mouseenter', show);
    targetEl.value.removeEventListener('mouseleave', hide);
  }
});

// Define component name
defineOptions({
  name: 'MdTooltip',
});
</script>

<style lang="scss">
@import './theme.scss';

$md-tooltip-height: 22px;
$md-tooltip-height-mobile: 32px;

.md-tooltip {
  height: $md-tooltip-height;
  padding: 0 8px;
  position: fixed;
  z-index: 111;
  pointer-events: none;
  border-radius: 2px;
  transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: opacity, transform;
  will-change: opacity, transform, top, left !important;
  font-size: 10px;
  line-height: $md-tooltip-height;
  text-transform: none;
  white-space: nowrap;

  @media (max-width: 600px) {
    height: $md-tooltip-height-mobile;
    font-size: 14px;
    line-height: $md-tooltip-height-mobile;
  }

  &.md-tooltip-leave-active {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  &.md-tooltip-enter,
  &.md-tooltip-leave-active {
    opacity: 0;

    &.md-tooltip-top {
      transform: translate3d(0, 4px, 0) scale(0.95);
    }

    &.md-tooltip-right {
      transform: translate3d(-4px, 0, 0) scale(0.95);
    }

    &.md-tooltip-bottom {
      transform: translate3d(0, -4px, 0) scale(0.95);
    }

    &.md-tooltip-left {
      transform: translate3d(4px, 0, 0) scale(0.95);
    }
  }
}
</style>

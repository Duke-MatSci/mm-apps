<template>
  <component :is="defaultSlot" v-if="defaultSlot" />
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
  h,
} from 'vue';

export default defineComponent({
  name: 'MdPortal',
  props: {
    mdAttachToParent: { type: Boolean, default: false },
    mdTarget: {
      type: null,
      validator(value: any) {
        if (HTMLElement && value && value instanceof HTMLElement) {
          return true;
        }
        console.warn('The md-target-el prop is invalid. You should pass a valid HTMLElement.');
        return false;
      },
    },
  },
  emits: ['md-destroy', 'md-initial-parent'],
  setup(props, { emit, slots }) {
    const leaveTimeout = ref<number | null>(null);
    const originalParentEl = ref<HTMLElement | null>(null);
    const currentEl = ref<HTMLElement | null>(null);

    const defaultSlot = computed(() => {
      return slots.default && slots.default()[0];
    });

    const transitionName = computed(() => {
      const childrenComponent = defaultSlot.value;
      if (childrenComponent) {
        const transition = childrenComponent.props?.transition;
        if (transition) {
          return transition.name;
        } else {
          const transition = childrenComponent.props?.name;
          if (transition) {
            return transition;
          }
        }
      }
      return 'v';
    });

    const leaveClass = computed(() => {
      return transitionName.value + '-leave';
    });

    const leaveActiveClass = computed(() => {
      return transitionName.value + '-leave-active';
    });

    const leaveToClass = computed(() => {
      return transitionName.value + '-leave-to';
    });

    const getTransitionDuration = (el: HTMLElement) => {
      const duration = window.getComputedStyle(el).transitionDuration;
      const num = parseFloat(duration);
      const unitMatch = duration.match(/m?s/);
      let unit = '';
      if (unitMatch) {
        unit = unitMatch[0];
      }
      if (unit === 's') {
        return num * 1000;
      }
      if (unit === 'ms') {
        return num;
      }
      return 0;
    };

    const killGhostElement = (el: HTMLElement) => {
      if (el.parentNode) {
        changeParentEl(originalParentEl.value);
        el.parentNode.removeChild(el);
      }
    };

    const initDestroy = (manualCall = false) => {
      let el = currentEl.value;
      if (!el) return;

      if (manualCall && el.nodeType === Node.COMMENT_NODE) {
        el = el as any;
      }

      if (el && el.classList) {
        el.classList.add(leaveClass.value);
        el.classList.add(leaveActiveClass.value);

        nextTick().then(() => {
          if (el) {
            el.classList.add(leaveToClass.value);

            if (leaveTimeout.value) {
              clearTimeout(leaveTimeout.value);
            }
            leaveTimeout.value = window.setTimeout(() => {
              if (el) {
                destroyElement(el);
              }
            }, getTransitionDuration(el));
          }
        });
      }
    };

    const destroyElement = (el: HTMLElement) => {
      requestAnimationFrame(() => {
        el.classList.remove(leaveClass.value);
        el.classList.remove(leaveActiveClass.value);
        el.classList.remove(leaveToClass.value);
        emit('md-destroy');
        killGhostElement(el);
      });
    };

    const changeParentEl = (newTarget: HTMLElement | null) => {
      if (newTarget && currentEl.value) {
        newTarget.appendChild(currentEl.value);
      }
    };

    watch(
      () => props.mdTarget,
      (newTarget, oldTarget) => {
        changeParentEl(newTarget);
        if (oldTarget) {
          // Force update
        }
      }
    );

    onMounted(() => {
      if (!originalParentEl.value) {
        originalParentEl.value = currentEl.value?.parentNode as HTMLElement;
        emit('md-initial-parent', currentEl.value?.parentNode);
      }

      if (props.mdAttachToParent && currentEl.value?.parentNode?.parentNode) {
        changeParentEl(currentEl.value.parentNode.parentNode as HTMLElement);
      } else if (document) {
        changeParentEl(props.mdTarget || document.body);
      }
    });

    onBeforeUnmount(() => {
      if (currentEl.value?.classList) {
        initDestroy();
      } else if (currentEl.value) {
        killGhostElement(currentEl.value);
      }
    });

    return {
      defaultSlot,
      leaveTimeout,
      originalParentEl,
      currentEl,
      initDestroy,
      changeParentEl,
    };
  },
  render() {
    const defaultSlot = this.$slots.default;
    if (defaultSlot && defaultSlot()[0]) {
      return defaultSlot()[0];
    }
    return h('div');
  },
});
</script>

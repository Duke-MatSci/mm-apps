import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
  props: {
    mdSwipeable: Boolean,
    mdSwipeThreshold: {
      type: Number,
      default: 150,
    },
    mdSwipeRestraint: {
      type: Number,
      default: 100,
    },
    mdSwipeTime: {
      type: Number,
      default: 300,
    },
    mdSwipeElement: {
      type: [Object, String],
      default: null,
    },
  },
  setup(props) {
    const swipeStart = ref(false);
    const swipeStartTime = ref<Date | null>(null);
    const swiped = ref<string | null>(null);
    const touchPosition = ref({
      startX: 0,
      startY: 0,
    });

    const getSwipeElement = computed(() => {
      return (props.mdSwipeElement as EventTarget) || window;
    });

    const handleTouchStart = (event: TouchEvent) => {
      touchPosition.value.startX = event.touches[0].screenX;
      touchPosition.value.startY = event.touches[0].screenY;
      swipeStartTime.value = new Date();

      swipeStart.value = true;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (swipeStart.value) {
        const touchmoveX = event.touches[0].screenX;
        const touchmoveY = event.touches[0].screenY;

        const actualX = touchmoveX - touchPosition.value.startX;
        const actualY = touchmoveY - touchPosition.value.startY;

        const elapsedTime = new Date().getTime() - (swipeStartTime.value?.getTime() || 0);

        if (elapsedTime <= props.mdSwipeTime) {
          if (
            Math.abs(actualX) >= props.mdSwipeThreshold &&
            Math.abs(actualY) <= props.mdSwipeRestraint
          ) {
            swiped.value = actualX < 0 ? 'left' : 'right';
          } else if (
            Math.abs(actualY) >= props.mdSwipeThreshold &&
            Math.abs(actualX) <= props.mdSwipeRestraint
          ) {
            swiped.value = actualY < 0 ? 'up' : 'down';
          }
        }
      }
    };

    const handleTouchEnd = () => {
      touchPosition.value = {
        startX: 0,
        startY: 0,
      };
      swiped.value = null;
      swipeStart.value = false;
    };

    onMounted(() => {
      if (props.mdSwipeable) {
        getSwipeElement.value.addEventListener(
          'touchstart',
          handleTouchStart as EventListener,
          false
        );
        getSwipeElement.value.addEventListener('touchend', handleTouchEnd as EventListener, false);
        getSwipeElement.value.addEventListener(
          'touchmove',
          handleTouchMove as EventListener,
          false
        );
      }
    });

    onBeforeUnmount(() => {
      if (props.mdSwipeable) {
        getSwipeElement.value.removeEventListener(
          'touchstart',
          handleTouchStart as EventListener,
          false
        );
        getSwipeElement.value.removeEventListener(
          'touchend',
          handleTouchEnd as EventListener,
          false
        );
        getSwipeElement.value.removeEventListener(
          'touchmove',
          handleTouchMove as EventListener,
          false
        );
      }
    });

    return {
      swipeStart,
      swipeStartTime,
      swiped,
      touchPosition,
      getSwipeElement,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    };
  },
});

import { ref, computed, watch, onMounted } from 'vue';
import MdReactive from '../../utils/MdReactive';

let hasEvents = false;
let eventTarget: HTMLElement | null = null;
let supportsPassiveEvent: boolean | { passive: true } = false;
const MdFocused = MdReactive({
  currentElement: null as HTMLElement | null,
});

function checkPassiveEventSupport() {
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supportsPassiveEvent = { passive: true };
      },
    });
    window.addEventListener('ghost' as any, null as any, opts);
  } catch (e) {
    // Ignore error
  }
}

function setKeyboardInteraction({ keyCode, target }: KeyboardEvent) {
  MdFocused.currentElement = target as HTMLElement;
}

function setMouseAndTouchInteraction(event: Event) {
  MdFocused.currentElement = null;
}

function createKeyboardEvents() {
  if (eventTarget) {
    eventTarget.addEventListener('keyup', setKeyboardInteraction);
  }
}

function createPointerEvents() {
  if (eventTarget) {
    eventTarget.addEventListener('pointerup', setMouseAndTouchInteraction);
  }
}

function createMSPointerEvents() {
  if (eventTarget) {
    eventTarget.addEventListener('MSPointerUp', setMouseAndTouchInteraction);
  }
}

function createMouseAndTouchEvents() {
  if (eventTarget) {
    eventTarget.addEventListener('mouseup', setMouseAndTouchInteraction);

    if ('ontouchend' in window) {
      eventTarget.addEventListener('touchend', setMouseAndTouchInteraction, supportsPassiveEvent);
    }
  }
}

function bindEvents() {
  if (window.PointerEvent) {
    createPointerEvents();
  } else if ((window as any).MSPointerEvent) {
    createMSPointerEvents();
  } else {
    createMouseAndTouchEvents();
  }

  createKeyboardEvents();
}

function createEvents() {
  if (!hasEvents) {
    eventTarget = document.body;
    checkPassiveEventSupport();
    bindEvents();
    hasEvents = true;
  }
}

export function useMdFocused() {
  const mdHasFocus = ref(false);
  const focusedElement = computed(() => MdFocused.currentElement);

  watch(focusedElement, (el) => {
    // In Vue 3, we need to handle this differently since we don't have $el
    // This will be handled by the component using this composable
  });

  onMounted(() => {
    createEvents();
  });

  return {
    mdHasFocus,
    focusedElement,
  };
}

export default useMdFocused;

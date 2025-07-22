import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import MdReactive from '../../utils/MdReactive';

let hasEvents = false;
let eventTarget: EventTarget | null = null;
let supportsPassiveEvent: boolean | { passive: boolean } = false;
const MdFocused = MdReactive({
  currentElement: null,
});

function checkPassiveEventSupport() {
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supportsPassiveEvent = { passive: true };
      },
    });
    window.addEventListener(
      'ghost',
      () => {
        // Empty function for testing passive support
      },
      opts
    );
  } catch (e) {
    // Ignore error
  }
}

function setKeyboardInteraction(event: KeyboardEvent) {
  MdFocused.currentElement = event.target;
}

function setMouseAndTouchInteraction(event: Event) {
  MdFocused.currentElement = null;
}

function createKeyboardEvents() {
  if (eventTarget) {
    eventTarget.addEventListener('keyup', setKeyboardInteraction as EventListener);
  }
}

function createPointerEvents() {
  if (eventTarget) {
    eventTarget.addEventListener('pointerup', setMouseAndTouchInteraction as EventListener);
  }
}

function createMSPointerEvents() {
  if (eventTarget) {
    eventTarget.addEventListener('MSPointerUp', setMouseAndTouchInteraction as EventListener);
  }
}

function createMouseAndTouchEvents() {
  if (eventTarget) {
    eventTarget.addEventListener('mouseup', setMouseAndTouchInteraction as EventListener);

    if ('ontouchend' in window) {
      eventTarget.addEventListener(
        'touchend',
        setMouseAndTouchInteraction as EventListener,
        supportsPassiveEvent
      );
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

export default defineComponent({
  setup() {
    const mdHasFocus = ref(false);
    const $el = ref<HTMLElement | null>(null);

    const focusedElement = computed(() => {
      return MdFocused.currentElement;
    });

    watch(focusedElement, (el) => {
      mdHasFocus.value = el === $el.value;
    });

    onMounted(() => {
      createEvents();
    });

    return {
      mdHasFocus,
      focusedElement,
      el: $el,
    };
  },
});

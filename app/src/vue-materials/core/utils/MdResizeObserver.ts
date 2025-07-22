// eslint-disable-next-line @typescript-eslint/no-var-requires
const raf = require('raf');
import MdObserveEvent from './MdObserveEvent';

export default (el: EventTarget = window, observerFn: () => void) => {
  const observer = MdObserveEvent(
    el as Element,
    'resize',
    () => {
      raf(observerFn);
    },
    { passive: true }
  );

  return {
    destroy: observer.destroy,
  };
};

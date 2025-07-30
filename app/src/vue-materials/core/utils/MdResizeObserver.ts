import MdObserveEvent from './MdObserveEvent';

export default (el: EventTarget = window, observerFn: () => void) => {
  const observer = MdObserveEvent(
    el,
    'resize',
    () => {
      requestAnimationFrame(observerFn);
    },
    { passive: true }
  );

  return {
    destroy: observer.destroy,
  };
};

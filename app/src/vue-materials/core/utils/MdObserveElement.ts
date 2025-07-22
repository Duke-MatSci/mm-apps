export default (el: Element | null, config: MutationObserverInit, cb: MutationCallback) => {
  if ('MutationObserver' in window && el) {
    const observer = new window.MutationObserver(cb);

    observer.observe(el, config);

    return {
      disconnect: () => {
        observer.disconnect();
      },
    };
  }

  return null;
};

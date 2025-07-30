export default (el: Node, config: MutationObserverInit, cb: MutationCallback) => {
  if ('MutationObserver' in window) {
    const observer = new window.MutationObserver(cb);

    observer.observe(el, config);

    return {
      disconnect: () => {
        observer.disconnect();
      },
    };
  }
};

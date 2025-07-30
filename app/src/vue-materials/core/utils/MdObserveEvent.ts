export default (
  el: EventTarget,
  eventName: string,
  observerFn: EventListener,
  options?: boolean | AddEventListenerOptions
) => {
  function killObserver() {
    el.removeEventListener(eventName, observerFn);
  }

  //fix click event for ios devices: https://stackoverflow.com/questions/3705937/document-click-not-working-correctly-on-iphone-jquery/17490775
  if (
    eventName &&
    eventName.indexOf('click') >= 0 &&
    /iP/i.test(navigator.userAgent) &&
    (el as HTMLElement).style
  ) {
    (el as HTMLElement).style.cursor = 'pointer';
  }

  el.addEventListener(eventName, observerFn, options || false);

  return {
    destroy: killObserver,
  };
};

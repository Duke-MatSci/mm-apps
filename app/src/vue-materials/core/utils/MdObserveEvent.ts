export default (
  el: Element,
  eventName: string,
  observerFn: EventListener,
  options?: boolean | AddEventListenerOptions
) => {
  function killObserver() {
    el.removeEventListener(eventName, observerFn);
  }

  //fix click event for ios devices: https://stackoverflow.com/questions/3705937/document-click-not-working-correctly-on-iphone-jquery/17490775
  eventName &&
    eventName.indexOf('click') >= 0 &&
    /iP/i.test(navigator.userAgent) &&
    ((el as HTMLElement).style.cursor = 'pointer');
  //
  el.addEventListener(eventName, observerFn, options || false);

  return {
    destroy: killObserver,
  };
};

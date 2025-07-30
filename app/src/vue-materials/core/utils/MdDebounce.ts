export default function MdDebounce<T extends (...args: any[]) => any>(fn: T, time: number): T {
  let timeout: number | null = null;
  return function (this: any, ...args: any[]) {
    const functionCall = () => fn.apply(this, args);
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(functionCall, time);
  } as T;
}

export default (fn: (...args: any[]) => any, time: number) => {
  let timeout: number;
  return function (this: any, ...args: any[]) {
    const functionCall = () => fn.apply(this, args);
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

const getOption = (options: any, key: string) =>
  options ? (options[key] === false ? false : true) : true;

export default (fn: (...args: any[]) => any, time: number, option?: any) => {
  const leading = getOption(option, 'leading');
  const trailing = getOption(option, 'trailing');
  let timeout: number | null = null;
  let duplicated = false;

  return function (this: any, ...args: any[]) {
    const functionCall = () => fn.apply(this, args);

    if (timeout) {
      duplicated = true;
      return false;
    } else if (leading) {
      functionCall();
    }

    const setThrottling = () => {
      timeout = setTimeout(() => {
        timeout = null;

        if (duplicated && trailing) {
          duplicated = false;
          functionCall();
          setThrottling();
        }
      }, time);
    };

    setThrottling();
  };
};

interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

const getOption = (options: ThrottleOptions | undefined, key: keyof ThrottleOptions): boolean => {
  return options ? (options[key] === false ? false : true) : true;
};

export default function MdThrottling<T extends (...args: any[]) => any>(
  fn: T,
  time: number,
  option?: ThrottleOptions
): T {
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
      timeout = window.setTimeout(() => {
        timeout = null;

        if (duplicated && trailing) {
          duplicated = false;
          functionCall();
          setThrottling();
        }
      }, time);
    };

    setThrottling();
  } as T;
}

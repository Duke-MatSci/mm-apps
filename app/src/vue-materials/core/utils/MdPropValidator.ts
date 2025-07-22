export default (name: string, options: any[]) => {
  return {
    validator: (value: any) => {
      if (options.includes(value)) {
        return true;
      }

      console.warn(
        `The ${name} prop is invalid. Given value: ${value}. Available options: ${options.join(
          ', '
        )}.`
      );

      return false;
    },
  };
};

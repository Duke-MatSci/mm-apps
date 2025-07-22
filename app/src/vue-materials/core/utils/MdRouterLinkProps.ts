export default (context: any, props: any) => {
  const RouterLink =
    context.$options.components['RouterLink'] || context.$options.components['router-link'];
  return {
    ...props,
    ...RouterLink.options.props,
  };
};

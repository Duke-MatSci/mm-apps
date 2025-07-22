import MdTheme from './MdTheme';
import deepmerge from 'deepmerge';

export default function (newComponent: any) {
  const defaults = {
    props: {
      mdTheme: null,
    },
    computed: {
      $mdActiveTheme(this: any) {
        const { enabled, getThemeName, getAncestorTheme } = MdTheme;

        if (enabled && this.mdTheme !== false) {
          return getThemeName(this.mdTheme || getAncestorTheme(this));
        }

        return null;
      },
    },
  };

  return deepmerge(defaults, newComponent);
}

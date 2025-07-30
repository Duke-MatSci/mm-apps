import { computed, inject } from 'vue';
import { useMdTheme } from './MdTheme';

export interface MdComponentOptions {
  props?: Record<string, any>;
  computed?: Record<string, any>;
  methods?: Record<string, any>;
  [key: string]: any;
}

export function useMdComponent() {
  const { getThemeName, getAncestorTheme } = useMdTheme();

  const mdActiveTheme = computed(() => {
    // In Vue 3, we'll handle theme injection differently
    // This will be provided by parent components
    return inject('mdActiveTheme', null);
  });

  return {
    mdActiveTheme,
    getThemeName,
    getAncestorTheme,
  };
}

export default function createMdComponent(newComponent: MdComponentOptions) {
  const defaults = {
    props: {
      mdTheme: {
        type: [String, Boolean],
        default: null,
      },
    },
  };

  return {
    ...defaults,
    ...newComponent,
  };
}

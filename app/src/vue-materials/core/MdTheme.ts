import { ref, computed, watch, onMounted } from 'vue';

let msColor: HTMLElement | null = null;
let themeColor: HTMLElement | null = null;
let maskIcon: HTMLElement | null = null;

export function useMdTheme() {
  const prefix = ref('md-theme-');
  const theme = ref('default');
  const enabled = ref(true);
  const metaColors = ref(false);

  const themeTarget = computed(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement;
    }
    return null;
  });

  const fullThemeName = computed(() => {
    return getThemeName();
  });

  const getAncestorTheme = (component: any) => {
    if (component) {
      const currentTheme = component.mdTheme;
      const getParentThemeName = (parent: any): string | null => {
        if (parent) {
          const { mdTheme, $parent } = parent;

          if (mdTheme && mdTheme !== currentTheme) {
            return mdTheme;
          }

          return getParentThemeName($parent);
        }

        return theme.value;
      };

      return getParentThemeName(component.$parent);
    }

    return null;
  };

  const getThemeName = (themeName?: string) => {
    const themeValue = themeName || theme.value;
    return prefix.value + themeValue;
  };

  const setMicrosoftColors = (primaryColor: string) => {
    if (msColor) {
      msColor.setAttribute('content', primaryColor);
    }
  };

  const setThemeColors = (primaryColor: string) => {
    if (themeColor) {
      themeColor.setAttribute('content', primaryColor);
    }
  };

  const setMaskColors = (primaryColor: string) => {
    if (maskIcon) {
      maskIcon.setAttribute('color', primaryColor);
    }
  };

  const setHtmlMetaColors = (themeName?: string) => {
    let primaryColor = '#fff';

    if (themeName && typeof window !== 'undefined') {
      const computedStyle = window.getComputedStyle(document.documentElement);
      primaryColor = computedStyle.getPropertyValue(`--${themeName}-primary`);
    }

    if (primaryColor) {
      setMicrosoftColors(primaryColor);
      setThemeColors(primaryColor);
      setMaskColors(primaryColor);
    }
  };

  // Watchers
  watch(
    enabled,
    (isEnabled) => {
      const target = themeTarget.value;

      if (target) {
        if (isEnabled) {
          target.classList.add(fullThemeName.value);
          metaColors.value && setHtmlMetaColors(fullThemeName.value);
        } else {
          target.classList.remove(fullThemeName.value);
          metaColors.value && setHtmlMetaColors();
        }
      }
    },
    { immediate: true }
  );

  watch(theme, (newTheme, oldTheme) => {
    const target = themeTarget.value;

    if (target) {
      const newThemeName = getThemeName(newTheme);
      target.classList.remove(getThemeName(oldTheme));
      target.classList.add(newThemeName);

      if (metaColors.value) {
        setHtmlMetaColors(newThemeName);
      }
    }
  });

  watch(metaColors, (meta) => {
    if (meta) {
      setHtmlMetaColors(fullThemeName.value);
    } else {
      setHtmlMetaColors();
    }
  });

  onMounted(() => {
    if (typeof document !== 'undefined') {
      msColor = document.querySelector('[name="msapplication-TileColor"]');
      themeColor = document.querySelector('[name="theme-color"]');
      maskIcon = document.querySelector('[rel="mask-icon"]');

      if (enabled.value && metaColors.value) {
        window.addEventListener('load', () => {
          setHtmlMetaColors(fullThemeName.value);
        });
      }
    }
  });

  return {
    prefix,
    theme,
    enabled,
    metaColors,
    themeTarget,
    fullThemeName,
    getAncestorTheme,
    getThemeName,
    setHtmlMetaColors,
  };
}

// Create a global theme instance
const globalTheme = useMdTheme();

export default globalTheme;

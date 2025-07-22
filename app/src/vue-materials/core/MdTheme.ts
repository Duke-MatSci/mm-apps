import { reactive, watch } from 'vue';

let msColor: Element | null = null;
let themeColor: Element | null = null;
let maskIcon: Element | null = null;

const MdTheme = reactive({
  prefix: 'md-theme-',
  theme: 'default',
  enabled: true,
  metaColors: false,

  get themeTarget() {
    if (typeof window !== 'undefined') {
      return document.documentElement;
    }
    return false;
  },

  get fullThemeName() {
    return this.getThemeName();
  },

  getAncestorTheme(component: any) {
    if (component) {
      const currentTheme = component.mdTheme;
      // In Vue 3, we need to handle parent access differently
      // For now, return the current theme as fallback
      return currentTheme || this.theme;
    }

    return null;
  },

  getThemeName(theme?: string) {
    const themeName = theme || this.theme;
    return this.prefix + themeName;
  },

  setMicrosoftColors(primaryColor: string) {
    if (msColor) {
      msColor.setAttribute('content', primaryColor);
    }
  },

  setThemeColors(primaryColor: string) {
    if (themeColor) {
      themeColor.setAttribute('content', primaryColor);
    }
  },

  setMaskColors(primaryColor: string) {
    if (maskIcon) {
      maskIcon.setAttribute('color', primaryColor);
    }
  },

  setHtmlMetaColors(themeName?: string) {
    let primaryColor = '#fff';

    if (themeName && typeof window !== 'undefined') {
      const computedStyle = window.getComputedStyle(document.documentElement);
      primaryColor = computedStyle.getPropertyValue(`--${themeName}-primary`);
    }

    if (primaryColor) {
      this.setMicrosoftColors(primaryColor);
      this.setThemeColors(primaryColor);
      this.setMaskColors(primaryColor);
    }
  },

  updateTheme() {
    const { fullThemeName, themeTarget, enabled } = this;

    if (themeTarget) {
      if (enabled) {
        themeTarget.classList.add(fullThemeName);
        this.metaColors && this.setHtmlMetaColors(fullThemeName);
      } else {
        themeTarget.classList.remove(fullThemeName);
        this.metaColors && this.setHtmlMetaColors();
      }
    }
  },

  changeTheme(newTheme: string, oldTheme: string) {
    const { getThemeName, themeTarget } = this;

    newTheme = getThemeName(newTheme);

    if (themeTarget && themeTarget instanceof HTMLElement) {
      themeTarget.classList.remove(getThemeName(oldTheme));
      themeTarget.classList.add(newTheme);
    }

    if (this.metaColors) {
      this.setHtmlMetaColors(newTheme);
    }
  },

  init() {
    msColor = document.querySelector('[name="msapplication-TileColor"]');
    themeColor = document.querySelector('[name="theme-color"]');
    maskIcon = document.querySelector('[rel="mask-icon"]');

    if (this.enabled && this.metaColors) {
      window.addEventListener('load', () => {
        this.setHtmlMetaColors(this.fullThemeName);
      });
    }
  },
});

// Watch for changes
watch(
  () => MdTheme.enabled,
  (enabled) => {
    MdTheme.updateTheme();
  },
  { immediate: true }
);

watch(
  () => MdTheme.theme,
  (newTheme, oldTheme) => {
    MdTheme.changeTheme(newTheme, oldTheme);
  }
);

watch(
  () => MdTheme.metaColors,
  (meta) => {
    if (meta) {
      MdTheme.setHtmlMetaColors(MdTheme.fullThemeName);
    } else {
      MdTheme.setHtmlMetaColors();
    }
  }
);

// Initialize when mounted
if (typeof window !== 'undefined') {
  MdTheme.init();
}

export default MdTheme;

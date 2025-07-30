import './base/index.scss';
import { inject } from 'vue';
import MdReactive from './core/utils/MdReactive';
import { useMdTheme } from './core/MdTheme';

// Create the material instance
const createMaterial = () => {
  const material = MdReactive({
    ripple: true,
    theming: {},
    locale: {
      startYear: 1900,
      endYear: 2099,
      dateFormat: 'yyyy-MM-dd',
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      shorterDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      shortMonths: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ],
      shorterMonths: ['J', 'F', 'M', 'A', 'M', 'Ju', 'Ju', 'A', 'Se', 'O', 'N', 'D'],
      firstDayOfAWeek: 0,
      cancel: 'Cancel',
      confirm: 'Ok',
    },
    router: {
      linkActiveClass: 'router-link-active',
    },
  });

  // Get theme instance
  const theme = useMdTheme();

  // Define properties for theming
  Object.defineProperties(material.theming, {
    metaColors: {
      get: () => theme.metaColors.value,
      set(metaColors: boolean) {
        theme.metaColors.value = metaColors;
      },
    },
    theme: {
      get: () => theme.theme.value,
      set(themeName: string) {
        theme.theme.value = themeName;
      },
    },
    enabled: {
      get: () => theme.enabled.value,
      set(enabled: boolean) {
        theme.enabled.value = enabled;
      },
    },
  });

  return material;
};

// Global material instance
let globalMaterial: any = null;

// Vue 3 plugin installation
export default {
  install(app: any) {
    if (!globalMaterial) {
      globalMaterial = createMaterial();
    }

    // Provide material to the app
    app.provide('$material', globalMaterial);

    // Also provide it globally for backward compatibility
    app.config.globalProperties.$material = globalMaterial;
  },
};

// Composable for using material in components
export function useMaterial() {
  const material = inject('$material', globalMaterial);
  return material;
}

// Export the material instance for direct use
export const material = globalMaterial || createMaterial();

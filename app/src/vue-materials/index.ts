import { App } from 'vue';
import MdApp from './components/MdApp/MdApp.vue';
import MdAppToolbar from './components/MdApp/MdAppToolbar.vue';
import MdAppContent from './components/MdApp/MdAppContent.vue';
import MdAppDrawer from './components/MdApp/MdAppDrawer.vue';
import MdToolbar from './components/MdToolbar/MdToolbar.vue';
import MdButton from './components/MdButton/MdButton.vue';
import MdIcon from './components/MdIcon/MdIcon.vue';
import MdList from './components/MdList/MdList.vue';
import MdListItem from './components/MdList/MdListItem.vue';
import MdTabs from './components/MdTabs/MdTabs.vue';
import MdTab from './components/MdTabs/MdTab.vue';
import MdSnackbar from './components/MdSnackbar/MdSnackbar.vue';
import MdPortal from './components/MdPortal/MdPortal.vue';
import MdElevation from './components/MdElevation';
import MdLayout from './components/MdLayout';
import MdContent from './components/MdContent/MdContent.vue';
import MdSvgLoader from './components/MdSvgLoader/MdSvgLoader.vue';
import MdSteppers from './components/MdSteppers/MdSteppers.vue';
import MdStepper from './components/MdSteppers/MdStepper.vue';
import MdSteppersNavigation from './components/MdSteppers/MdSteppersNavigation.vue';

// Create plugin installation function
const VueMaterial = {
  install(app: any) {
    app.component(MdApp.name || 'MdApp', MdApp);
    app.component(MdAppToolbar.name || 'MdAppToolbar', MdAppToolbar);
    app.component(MdAppContent.name || 'MdAppContent', MdAppContent);
    app.component(MdAppDrawer.name || 'MdAppDrawer', MdAppDrawer);
    app.component(MdToolbar.name || 'MdToolbar', MdToolbar);
    app.component(MdButton.name || 'MdButton', MdButton);
    app.component(MdIcon.name || 'MdIcon', MdIcon);
    app.component(MdList.name || 'MdList', MdList);
    app.component(MdListItem.name || 'MdListItem', MdListItem);
    app.component(MdTabs.name || 'MdTabs', MdTabs);
    app.component(MdTab.name || 'MdTab', MdTab);
    app.component(MdSnackbar.name || 'MdSnackbar', MdSnackbar);
    app.component(MdPortal.name || 'MdPortal', MdPortal);
    app.component(MdContent.name || 'MdContent', MdContent);
    app.component(MdSteppers.name || 'MdSteppers', MdSteppers);
    app.component(MdStepper.name || 'MdStepper', MdStepper);
    app.component(MdSteppersNavigation.name || 'MdSteppersNavigation', MdSteppersNavigation);
    // MdElevation is a SCSS-only component, no Vue component to register
    // MdLayout is a SCSS-only component, no Vue component to register
    app.component(MdSvgLoader.name || 'MdSvgLoader', MdSvgLoader);
  },
};

export default VueMaterial;
export {
  MdApp,
  MdAppToolbar,
  MdAppContent,
  MdAppDrawer,
  MdToolbar,
  MdButton,
  MdIcon,
  MdList,
  MdListItem,
  MdTabs,
  MdTab,
  MdSnackbar,
  MdPortal,
  MdContent,
  MdSteppers,
  MdStepper,
  MdSteppersNavigation,
  MdElevation,
  MdLayout,
  MdSvgLoader,
};

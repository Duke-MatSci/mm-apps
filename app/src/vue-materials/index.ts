import { App } from 'vue';
import { computed } from 'vue';
import VueMaterial from './material';
import { useMdTheme } from './core/MdTheme';
import MdApp from './components/MdApp/MdApp.vue';
import MdAppToolbar from './components/MdApp/MdAppToolbar.vue';
import MdAppContent from './components/MdApp/MdAppContent.vue';
import MdAppDrawer from './components/MdApp/MdAppDrawer.vue';
import MdAppSideDrawer from './components/MdApp/MdAppSideDrawer.vue';
import MdAppInternalDrawer from './components/MdApp/MdAppInternalDrawer.vue';
import MdToolbar from './components/MdToolbar/MdToolbar.vue';
import MdButton from './components/MdButton/MdButton.vue';
import MdButtonContent from './components/MdButton/MdButtonContent.vue';
import MdIcon from './components/MdIcon/MdIcon.vue';
import MdList from './components/MdList/MdList.vue';
import MdListItem from './components/MdList/MdListItem/MdListItem.vue';
import MdListItemContent from './components/MdList/MdListItem/MdListItemContent.vue';
import MdListItemDefault from './components/MdList/MdListItem/MdListItemDefault.vue';
import MdListItemButton from './components/MdList/MdListItem/MdListItemButton.vue';
import MdListItemFakeButton from './components/MdList/MdListItem/MdListItemFakeButton.vue';
import MdListItemLink from './components/MdList/MdListItem/MdListItemLink.vue';
import MdListItemRouter from './components/MdList/MdListItem/MdListItemRouter.vue';
import MdListItemExpand from './components/MdList/MdListItem/MdListItemExpand.vue';
import MdTabs from './components/MdTabs/MdTabs.vue';
import MdTab from './components/MdTabs/MdTab.vue';
import MdSnackbar from './components/MdSnackbar/MdSnackbar.vue';
import MdSnackbarContent from './components/MdSnackbar/MdSnackbarContent.vue';
import MdPortal from './components/MdPortal/MdPortal.vue';
import MdContent from './components/MdContent/MdContent.vue';
import MdSteppers from './components/MdSteppers/MdSteppers.vue';
import MdStep from './components/MdSteppers/MdStep.vue';
import MdStepHeader from './components/MdSteppers/MdStepHeader.vue';

import MdDivider from './components/MdDivider/MdDivider.vue';
import MdCard from './components/MdCard/MdCard.vue';
import MdCardArea from './components/MdCard/MdCardArea/MdCardArea.vue';
import MdCardHeader from './components/MdCard/MdCardHeader/MdCardHeader.vue';
import MdCardHeaderText from './components/MdCard/MdCardHeader/MdCardHeaderText.vue';
import MdCardMedia from './components/MdCard/MdCardMedia/MdCardMedia.vue';
import MdCardMediaActions from './components/MdCard/MdCardMedia/MdCardMediaActions.vue';
import MdCardMediaCover from './components/MdCard/MdCardMedia/MdCardMediaCover.vue';
import MdCardContent from './components/MdCard/MdCardContent/MdCardContent.vue';
import MdCardExpand from './components/MdCard/MdCardExpand/MdCardExpand.vue';
import MdCardExpandTrigger from './components/MdCard/MdCardExpand/MdCardExpandTrigger.vue';
import MdCardExpandContent from './components/MdCard/MdCardExpand/MdCardExpandContent.vue';
import MdCardActions from './components/MdCard/MdCardActions/MdCardActions.vue';
import MdTooltip from './components/MdTooltip/MdTooltip.vue';
import MdDialog from './components/MdDialog/MdDialog.vue';
import MdDialogTitle from './components/MdDialog/MdDialogTitle.vue';
import MdDialogContent from './components/MdDialog/MdDialogContent.vue';
import MdDialogActions from './components/MdDialog/MdDialogActions.vue';
import MdDrawer from './components/MdDrawer/MdDrawer.vue';
import MdDrawerRightPrevious from './components/MdDrawer/MdDrawerRightPrevious.vue';
import MdAutocomplete from './components/MdAutocomplete/MdAutocomplete.vue';
import MdTagSwitcher from './components/MdTagSwitcher/MdTagSwitcher.vue';
import MdTable from './components/MdTable/MdTable.vue';
import MdTableToolbar from './components/MdTable/MdTableToolbar.vue';
import MdTableEmptyState from './components/MdTable/MdTableEmptyState.vue';
import MdTableRow from './components/MdTable/MdTableRow.vue';
import MdTableHead from './components/MdTable/MdTableHead.vue';
import MdTableCell from './components/MdTable/MdTableCell.vue';
import MdTablePagination from './components/MdTable/MdTablePagination.vue';
import MdTableContainer from './components/MdTable/MdTableContainer';
import MdTableHeadSelection from './components/MdTable/MdTableHeadSelection.vue';
import MdTableRowGhost from './components/MdTable/MdTableRowGhost.vue';
import MdTableThead from './components/MdTable/MdTableThead.vue';
import MdTableAlternateHeader from './components/MdTable/MdTableAlternateHeader.vue';
import MdTableCellSelection from './components/MdTable/MdTableCellSelection.vue';
import MdEmptyState from './components/MdEmptyState/MdEmptyState.vue';

// Create plugin installation function
const VueMaterialPlugin = {
  install(app: App) {
    // Prevent multiple installations
    if (app._context.provides['vue-material-installed']) {
      return;
    }

    // Mark as installed
    app.provide('vue-material-installed', true);

    // Install the material plugin first
    VueMaterial.install(app);

    // Provide theme context
    const theme = useMdTheme();
    app.provide(
      'mdActiveTheme',
      computed(() => `md-theme-${theme.theme.value}`)
    );

    // Register all components
    app.component(MdApp.name || 'MdApp', MdApp);
    app.component(MdAppToolbar.name || 'MdAppToolbar', MdAppToolbar);
    app.component(MdAppContent.name || 'MdAppContent', MdAppContent);
    app.component(MdAppDrawer.name || 'MdAppDrawer', MdAppDrawer);
    app.component(MdAppSideDrawer.name || 'MdAppSideDrawer', MdAppSideDrawer);
    app.component(MdAppInternalDrawer.name || 'MdAppInternalDrawer', MdAppInternalDrawer);
    app.component(MdToolbar.name || 'MdToolbar', MdToolbar);
    app.component(MdButton.name || 'MdButton', MdButton);
    app.component(MdButtonContent.name || 'MdButtonContent', MdButtonContent);
    app.component(MdIcon.name || 'MdIcon', MdIcon);
    app.component(MdList.name || 'MdList', MdList);
    app.component(MdListItem.name || 'MdListItem', MdListItem);
    app.component(MdListItemContent.name || 'MdListItemContent', MdListItemContent);
    app.component(MdListItemDefault.name || 'MdListItemDefault', MdListItemDefault);
    app.component(MdListItemButton.name || 'MdListItemButton', MdListItemButton);
    app.component(MdListItemFakeButton.name || 'MdListItemFakeButton', MdListItemFakeButton);
    app.component(MdListItemLink.name || 'MdListItemLink', MdListItemLink);
    app.component(MdListItemRouter.name || 'MdListItemRouter', MdListItemRouter);
    app.component(MdListItemExpand.name || 'MdListItemExpand', MdListItemExpand);
    app.component(MdTabs.name || 'MdTabs', MdTabs);
    app.component(MdTab.name || 'MdTab', MdTab);
    app.component(MdSnackbar.name || 'MdSnackbar', MdSnackbar);
    app.component(MdSnackbarContent.name || 'MdSnackbarContent', MdSnackbarContent);
    app.component(MdPortal.name || 'MdPortal', MdPortal);
    app.component(MdContent.name || 'MdContent', MdContent);
    app.component(MdSteppers.name || 'MdSteppers', MdSteppers);
    app.component(MdStep.name || 'MdStep', MdStep);
    app.component(MdStepHeader.name || 'MdStepHeader', MdStepHeader);
    app.component(MdDivider.name || 'MdDivider', MdDivider);
    app.component(MdCard.name || 'MdCard', MdCard);
    app.component(MdCardArea.name || 'MdCardArea', MdCardArea);
    app.component(MdCardHeader.name || 'MdCardHeader', MdCardHeader);
    app.component(MdCardHeaderText.name || 'MdCardHeaderText', MdCardHeaderText);
    app.component(MdCardMedia.name || 'MdCardMedia', MdCardMedia);
    app.component(MdCardMediaActions.name || 'MdCardMediaActions', MdCardMediaActions);
    app.component(MdCardMediaCover.name || 'MdCardMediaCover', MdCardMediaCover);
    app.component(MdCardContent.name || 'MdCardContent', MdCardContent);
    app.component(MdCardExpand.name || 'MdCardExpand', MdCardExpand);
    app.component(MdCardExpandTrigger.name || 'MdCardExpandTrigger', MdCardExpandTrigger);
    app.component(MdCardExpandContent.name || 'MdCardExpandContent', MdCardExpandContent);
    app.component(MdCardActions.name || 'MdCardActions', MdCardActions);
    app.component(MdTooltip.name || 'MdTooltip', MdTooltip);
    app.component(MdDialog.name || 'MdDialog', MdDialog);
    app.component(MdDialogTitle.name || 'MdDialogTitle', MdDialogTitle);
    app.component(MdDialogContent.name || 'MdDialogContent', MdDialogContent);
    app.component(MdDialogActions.name || 'MdDialogActions', MdDialogActions);
    app.component(MdDrawer.name || 'MdDrawer', MdDrawer);
    app.component(MdDrawerRightPrevious.name || 'MdDrawerRightPrevious', MdDrawerRightPrevious);
    app.component(MdAutocomplete.name || 'MdAutocomplete', MdAutocomplete);
    app.component(MdTagSwitcher.name || 'MdTagSwitcher', MdTagSwitcher);
    app.component(MdTable.name || 'MdTable', MdTable);
    app.component(MdTableToolbar.name || 'MdTableToolbar', MdTableToolbar);
    app.component(MdTableEmptyState.name || 'MdTableEmptyState', MdTableEmptyState);
    app.component(MdTableRow.name || 'MdTableRow', MdTableRow);
    app.component(MdTableHead.name || 'MdTableHead', MdTableHead);
    app.component(MdTableCell.name || 'MdTableCell', MdTableCell);
    app.component(MdTablePagination.name || 'MdTablePagination', MdTablePagination);
    app.component(MdTableContainer.name || 'MdTableContainer', MdTableContainer);
    app.component(MdTableHeadSelection.name || 'MdTableHeadSelection', MdTableHeadSelection);
    app.component(MdTableRowGhost.name || 'MdTableRowGhost', MdTableRowGhost);
    app.component(MdTableThead.name || 'MdTableThead', MdTableThead);
    app.component(MdTableAlternateHeader.name || 'MdTableAlternateHeader', MdTableAlternateHeader);
    app.component(MdTableCellSelection.name || 'MdTableCellSelection', MdTableCellSelection);
    app.component(MdEmptyState.name || 'MdEmptyState', MdEmptyState);
  },
};

export default VueMaterialPlugin;

export {
  MdApp,
  MdAppToolbar,
  MdAppContent,
  MdAppDrawer,
  MdAppSideDrawer,
  MdAppInternalDrawer,
  MdToolbar,
  MdButton,
  MdButtonContent,
  MdIcon,
  MdList,
  MdListItem,
  MdListItemContent,
  MdListItemDefault,
  MdListItemButton,
  MdListItemFakeButton,
  MdListItemLink,
  MdListItemRouter,
  MdListItemExpand,
  MdTabs,
  MdTab,
  MdSnackbar,
  MdSnackbarContent,
  MdPortal,
  MdContent,
  MdSteppers,
  MdStep,
  MdStepHeader,
  MdDivider,
  MdCard,
  MdCardArea,
  MdCardHeader,
  MdCardHeaderText,
  MdCardMedia,
  MdCardMediaActions,
  MdCardMediaCover,
  MdCardContent,
  MdCardExpand,
  MdCardExpandTrigger,
  MdCardExpandContent,
  MdCardActions,
  MdTooltip,
  MdDialog,
  MdDialogTitle,
  MdDialogContent,
  MdDialogActions,
  MdDrawer,
  MdDrawerRightPrevious,
  MdAutocomplete,
  MdTagSwitcher,
  MdTable,
  MdTableToolbar,
  MdTableEmptyState,
  MdTableRow,
  MdTableHead,
  MdTableCell,
  MdTablePagination,
  MdTableContainer,
  MdTableHeadSelection,
  MdTableRowGhost,
  MdTableThead,
  MdTableAlternateHeader,
  MdTableCellSelection,
  MdEmptyState,
};

// Export material utilities
export { useMaterial, material } from './material';

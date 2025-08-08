import { App } from 'vue';
import MdTable from './MdTableContainer';
import MdTableToolbar from './MdTableToolbar.vue';
import MdTableEmptyState from './MdTableEmptyState.vue';
import MdTableRow from './MdTableRow.vue';
import MdTableHead from './MdTableHead.vue';
import MdTableCell from './MdTableCell.vue';
import MdTablePagination from './MdTablePagination.vue';
import MdTableHeadSelection from './MdTableHeadSelection.vue';
import MdTableCellSelection from './MdTableCellSelection.vue';
import MdTableThead from './MdTableThead.vue';
import MdTableRowGhost from './MdTableRowGhost.vue';
import MdTableAlternateHeader from './MdTableAlternateHeader.vue';

export default (app: App) => {
  app.component('MdTable', MdTable);
  app.component(MdTableToolbar.name || 'MdTableToolbar', MdTableToolbar);
  app.component(MdTableEmptyState.name || 'MdTableEmptyState', MdTableEmptyState);
  app.component(MdTableRow.name || 'MdTableRow', MdTableRow);
  app.component(MdTableHead.name || 'MdTableHead', MdTableHead);
  app.component(MdTableCell.name || 'MdTableCell', MdTableCell);
  app.component(MdTablePagination.name || 'MdTablePagination', MdTablePagination);
  app.component(MdTableHeadSelection.name || 'MdTableHeadSelection', MdTableHeadSelection);
  app.component(MdTableCellSelection.name || 'MdTableCellSelection', MdTableCellSelection);
  app.component(MdTableThead.name || 'MdTableThead', MdTableThead);
  app.component(MdTableRowGhost.name || 'MdTableRowGhost', MdTableRowGhost);
  app.component(MdTableAlternateHeader.name || 'MdTableAlternateHeader', MdTableAlternateHeader);
};

export {
  MdTable,
  MdTableToolbar,
  MdTableEmptyState,
  MdTableRow,
  MdTableHead,
  MdTableCell,
  MdTablePagination,
  MdTableHeadSelection,
  MdTableCellSelection,
  MdTableThead,
  MdTableRowGhost,
  MdTableAlternateHeader,
};

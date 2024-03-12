import {BaseTableColumnModel} from "./base-table-column.model";
import {BaseTableActionModel} from "./base-table-action.model";

export class BaseTableModel {
    hasGridAction: boolean;
    selectable: boolean;
    autoSearch: boolean;
    hasSelection?: boolean;
    tableColumns: BaseTableColumnModel[];
    gridActions: BaseTableActionModel[];
}

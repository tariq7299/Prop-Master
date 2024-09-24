import * as React from "react";
import TableFilters from "./core/table-filters"
import TableBody from "./core/table-body";
import TablePagination from "./core/table-pagination";
import TableSorting from "./core/table-sorting";
import TablePageSize from "./core/table-page-size";
import ColumnsVisibility from "./core/columns-visibility";
import TableBulkActions from "./core/table-bulk-actions";
import ActionsOfSelections from "./core/actions-of-selection";
import ApiTablesModals from "./table-modals/api-tables-modals";
import { useTableBulkActions } from "./table-providers/bulk-actions-provider";
import { useTableColumns } from "./table-providers/table-columns-provider";
import { useTableCore } from "./table-providers/table-core-provider";



function ApiTablesComponent({ customElement }: any) {
    const { bulkActions } = useTableBulkActions()
    const { structureFilters } = useTableCore()
    const { selectedRows } = useTableColumns()

    return (
        <>
            {structureFilters && structureFilters?.length > 0 && (
                <TableFilters />
            )}
            <TableSorting />

            <div className="row g-3 mb-4 align-items-end justify-content-center justify-content-lg-between">
                <div className="col-xl-2 col-lg-5">
                </div>
                <div className="col-xl-5 col-lg-7">
                    <ul className="list-inline mb-0 p-0 d-flex justify-content-lg-end">

                        {/* BULK ACTIONS */}
                        {bulkActions?.length > 0 && (
                            <li className="list-inline-item me-0">
                                <TableBulkActions />
                            </li>
                        )}

                        {/* COLUMNS VISIBILITY */}
                        <li className="list-inline-item ps-2 me-0">
                            <ColumnsVisibility />
                        </li>

                        {/* TABLE PAGE SIZE */}
                        <li className="list-inline-item">
                            <TablePageSize />
                        </li>
                    </ul>
                </div>
            </div>

            {customElement && (<div className="py-2"> {customElement} </div>)}
            {selectedRows.length > 0 && (
                <p className="text-center text-sm text-muted mb-1">لقد قمت باختيار عدد <strong className="fw-bold text-dark mx-1">{selectedRows?.length}</strong> من الصفوف</p>
            )}
            <ActionsOfSelections />
            <TableBody />
            <TablePagination />

            <ApiTablesModals />
        </>
    )
}

export default ApiTablesComponent

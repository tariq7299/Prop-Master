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
import { Button } from "@/components/ui/button";
import { CirclePlus } from 'lucide-react';
import TableNewRowActions from "./core/table-new-row-actions";
import { PlusCircle } from 'lucide-react';


function ApiTablesComponent({ customElement, tableNewRowComponent }: any) {
    const { bulkActions } = useTableBulkActions()
    const { structureFilters } = useTableCore()
    const { selectedRows } = useTableColumns()

    return (

        <>
            {structureFilters && structureFilters?.length > 0 && (
                <TableFilters />
            )}
            <div className="pt-1">
                <TableSorting />

            </div>

            <div className="flex gap-2 py-4">

                <div className="me-auto space-x-3 flex">
                    {/* TABLE PAGE SIZE */}
                    <TablePageSize />
                    {/* COLUMNS VISIBILITY */}
                    <ColumnsVisibility />
                </div>

                {/* BULK ACTIONS */}
                {bulkActions?.length > 0 && (
                    <TableBulkActions />
                )}


                {/* NEW ROW ACTIONS */}
                {/* {tableNewRowComponent} */}
                <TableNewRowActions />




            </div>

            {customElement && (<div className="py-2"> {customElement} </div>)}

            {/* Row(s) selected */}
            <div className="flex flex-col justify-center items-center gap-3">
                {selectedRows?.length > 0 && (<p className="text-gray-400"><span className="font-bold text-foreground">{selectedRows?.length || 0} </span>row(s) selected</p>)}
                <ActionsOfSelections />
            </div>

            <TableBody />

            {/* TABLE Pagenation */}
            <TablePagination />


            <ApiTablesModals />
        </>
    )
}

export default ApiTablesComponent

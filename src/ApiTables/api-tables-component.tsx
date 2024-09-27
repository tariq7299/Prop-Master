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
import { PlusCircle } from 'lucide-react';


function ApiTablesComponent({ customElement }: any) {
    const { bulkActions } = useTableBulkActions()
    const { structureFilters } = useTableCore()
    const { selectedRows } = useTableColumns()

    return (
        <>
            {structureFilters && structureFilters?.length > 0 && (
                <TableFilters />
            )}

            {/* <TableSorting /> */}


            <div className="flex flex-row-reverse gap-2">

                {/* NEW ROW ACTIONS */}
                <Button size="sm" className=" gap-1 text-background bg-foreground"  ><CirclePlus className="h-4 w-4" /><span className="sr-only md:not-sr-only ">Add New Project</span></Button>

                {/* BULK ACTIONS */}
                {bulkActions?.length > 0 && (
                    <TableBulkActions />
                )}

                {/* COLUMNS VISIBILITY */}
                <ColumnsVisibility />

                {/* TABLE PAGE SIZE */}
                {/* <TablePageSize /> */}
            </div>

            {customElement && (<div className="py-2"> {customElement} </div>)
            }
            {
                selectedRows.length > 0 && (
                    <p className="text-center text-sm text-muted mb-1">لقد قمت باختيار عدد <strong className="fw-bold text-dark mx-1">{selectedRows?.length}</strong> من الصفوف</p>
                )
            }
            <ActionsOfSelections />
            <TableBody />
            {/* <TablePagination /> */}

            <ApiTablesModals />
        </>
    )
}

export default ApiTablesComponent

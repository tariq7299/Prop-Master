import * as React from "react"
import { useEffect } from "react"
import { HiArrowsUpDown } from 'react-icons/hi2';
import DataTable from 'react-data-table-component';
// import { Checkbox } from "../general-components/checkbox.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { TableLoader } from "../general-components/loaders.tsx";
import { useTableColumns } from "../table-providers/table-columns-provider.tsx";
import { useTableCore } from "../table-providers/table-core-provider.tsx";
import { useTableBulkActions } from "../table-providers/bulk-actions-provider.tsx";
import { useTableRowActions } from "../table-providers/row-actions-provider.tsx";
import ExpandedRow from "./expanded-row.tsx";
import { ArrowUpDown } from 'lucide-react'

function TableBody() {
    const { bulkActions } = useTableBulkActions()
    const { structureRowActions, actionsInRegularCells } = useTableRowActions()
    const { tableColumns, tableColumnsDispatcher, toggledClearRows } = useTableColumns()
    const { tableData, tableFetchingLoading, tableCoreDispatcher, pageSize, structureColumns, tableName } = useTableCore()

    function sortingTableHandler(column: any, sortDirection: any) {
        console.log("column", column)
        // if (column) {}
        console.log("sortDirection", sortDirection)
        Object.keys(column).length > 0 && tableCoreDispatcher({ type: 'SET_TABLE_SORTING', payload: { label: column?.name, direction: sortDirection, [column?.colIdentifier]: sortDirection } })
    }

    useEffect(() => {
        tableColumnsDispatcher({
            type: 'SET_TABLE_COLUMNS', payload: structureColumns?.filter((col: any) => col?.showable)
        })
        const tableVisibleCols = localStorage.getItem(`${tableName}_tb`)
        if (!tableVisibleCols) {
            tableColumnsDispatcher({
                type: 'SET_VISIBLE_COLUMNS', payload: structureColumns?.map((col: any) => col?.data_src)
            })
        } else if (tableVisibleCols) {
            tableColumnsDispatcher({
                type: 'SET_VISIBLE_COLUMNS', payload: JSON.parse(tableVisibleCols)
            })
        }
    }, [structureColumns])


    return (
        <>
            <div className="rdt-table-holder">
                <div className={`table-scrollable-holder text-nowrap ${tableData?.length <= 3 && actionsInRegularCells ? 'lg-height' : ''}`}>
                    <DataTable
                        columns={tableColumns}
                        data={tableData}
                        // expandableRows={true}
                        // expandableRowsComponent={ExpandedRow}
                        responsive
                        progressPending={tableFetchingLoading}
                        progressComponent={<TableLoader count={Number(pageSize)} />}
                        sortIcon={<ArrowUpDown className='h-4 w-4 ms-1 !text-foreground' />}
                        selectableRowsComponent={Checkbox}
                        sortServer
                        onSort={sortingTableHandler}
                        noDataComponent={(<div className="py-4 bg-background w-full text-foreground flex justify-center"> No resultes ! </div>)}
                        persistTableHead={true}
                        selectableRows={!tableFetchingLoading && (bulkActions.length > 0 || (structureRowActions?.filter((action: any) => action?.applicableAsBulkAction)?.length > 0)) ? true : false}
                        customStyles={
                            {
                                rows: {
                                    style: {
                                        color: "hsl(var(--foreground))",
                                        backgroundColor: "hsl(var(--background))",
                                        transition: "background-color 0.35s",
                                        '&:not(:last-of-type)': {
                                            borderBottomColor: "hsl(var(--input))",
                                        },
                                        '&:hover': {
                                            backgroundColor: 'hsl(var(--muted))',
                                        }
                                    }
                                },
                                cells: {
                                    style: {
                                        justifyContent: 'center',
                                    }
                                },
                                headCells: {
                                    style: {
                                        color: "hsl(var(--muted-foreground))",
                                        backgroundColor: "hsl(var(--background))",
                                        opacity: "1",
                                        justifyContent: 'center', padding: "1rem"
                                    }
                                },

                            }
                        }
                        onSelectedRowsChange={({ selectedRows }) => tableColumnsDispatcher({
                            type: 'SET_SELECTED_ROWS',
                            payload: selectedRows
                        })
                        }
                        clearSelectedRows={!toggledClearRows}
                    />
                </div>
            </div>
        </>
    )
}

export default TableBody

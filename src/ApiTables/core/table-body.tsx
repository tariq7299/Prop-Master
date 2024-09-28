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

function TableBody() {
    const { bulkActions } = useTableBulkActions()
    const { structureRowActions, actionsInRegularCells } = useTableRowActions()
    const { tableColumns, tableColumnsDispatcher, toggledClearRows } = useTableColumns()
    const { tableData, tableFetchingLoading, tableCoreDispatcher, pageSize, structureColumns, tableName } = useTableCore()

    function sortingTableHandler(column: any, sortDirection: any) {
        tableCoreDispatcher({ type: 'SET_TABLE_SORTING', payload: { label: column?.name, direction: sortDirection, [column?.colIdentifier]: sortDirection } })
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
                        // expandableRows={trsue}
                        // expandableRowsComponent={ExpandedRow}
                        responsive
                        progressPending={tableFetchingLoading}
                        progressComponent={<TableLoader count={Number(pageSize)} />}
                        sortIcon={<HiArrowsUpDown className='me-1' />}
                        selectableRowsComponent={Checkbox}
                        sortServer
                        onSort={sortingTableHandler}
                        noDataComponent={(<div className="py-4"> لا توجد نتائج. الرجاء توسيع نطاق البحث </div>)}
                        persistTableHead={true}
                        selectableRows={!tableFetchingLoading && (bulkActions.length > 0 || (structureRowActions?.filter((action: any) => action?.applicableAsBulkAction)?.length > 0)) ? true : false}
                        customStyles={
                            {
                                rows: {
                                    style: {

                                        transition: "background-color 0.35s",
                                        '&:hover': {
                                            backgroundColor: '#f3f4f6',
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

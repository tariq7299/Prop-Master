import * as React from "react";
import { useEffect } from "react"
import ApiTablesComponent from "./api-tables-component.tsx"
import useTableFetcher from "./hooks/use-table-fetcher.tsx"
// import useApp from "../hooks/useApp"
import { useTableCore } from "./table-providers/table-core-provider.tsx"
import { useTableBulkActions } from "./table-providers/bulk-actions-provider.tsx"
import { useTableRowActions } from "./table-providers/row-actions-provider.tsx"
// import useAuth from "../hooks/useAuth"

function ApiTablesController({ table, params, customElement }: any) {
    console.log("table", table)
    // const { appAuth } = useAuth()
    // const { accessibilitySettings } = useApp()
    const { bulkActionsDispatcher } = useTableBulkActions()
    const { appliedFilters, currentPage, tableSorting, pageSize, tableCoreDispatcher, tableName } = useTableCore()
    const { rowActionsDispatcher } = useTableRowActions()
    const { tableFetchingHandler } = useTableFetcher()


    function flattenMultiCellsActions(rowActions: any) {
        if (rowActions && Object.keys(rowActions)?.filter(key => key === 'general_actions')?.length > 0) {
            return Object.values(rowActions)?.map((object: any) => Object.values(object))?.reduce((acc, val) => {
                return acc?.concat(val)
            }, [])
        } else {
            return rowActions
        }
    }

    function checkActionsInRegularCells(rowActions: any) {
        return rowActions && Object.keys(rowActions)?.filter(key => key === 'general_actions')?.length > 0
    }

    useEffect(() => {
        tableCoreDispatcher({ type: 'GET_TABLE_COMPONENTS', payload: { ...table } })
        bulkActionsDispatcher({ type: 'GET_STRUCTURE_BULK_ACTIONS', payload: table?.bulkActions })
        rowActionsDispatcher({ type: 'GET_STRUCTURE_ROW_ACTIONS', payload: flattenMultiCellsActions(table?.rowActions) })
        if (checkActionsInRegularCells(table?.rowActions)) {
            rowActionsDispatcher({ type: 'CHECK_ACTIONS_IN_REGULAR_CELLS', payload: true })
        }
        tableCoreDispatcher({ type: 'CHANGE_PAGE_SIZE', payload: 10 })
    }, [table])



    // useEffect(() => {
    //     if (checkActionsInRegularCells(table?.rowActions)) {
    //         rowActionsDispatcher({ type: 'CHECK_ACTIONS_IN_REGULAR_CELLS', payload: true })
    //     }
    // }, [table])



    //     tableCoreDispatcher({ type: 'CHANGE_PAGE_SIZE', payload: accessibilitySettings?.tablePageSize || 10 })
    // }, [accessibilitySettings.tablePageSize])


    useEffect(() => {
        const controller = new AbortController();
        if (tableName) {
            tableFetchingHandler({
                tableName, currentPage, pageSize, appliedFilters, tableSorting, signal: controller.signal, params
            })
        }

        return () => {
            controller.abort()
        }
    }, [/*appAuth*/, tableName, currentPage, pageSize, appliedFilters, tableSorting])


    return <ApiTablesComponent customElement={customElement} />
}
export default ApiTablesController

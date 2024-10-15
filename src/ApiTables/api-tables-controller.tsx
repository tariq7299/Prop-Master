import * as React from "react";
import { useEffect } from "react"
import ApiTablesComponent from "./api-tables-component.tsx"
import useTableFetcher from "./hooks/use-table-fetcher.tsx"
// import useApp from "../hooks/useApp"
import { useTableCore } from "./table-providers/table-core-provider.tsx"
import { useTableBulkActions } from "./table-providers/bulk-actions-provider.tsx"
import { useTableRowActions } from "./table-providers/row-actions-provider.tsx"
import { useTableNewRowActions } from "./table-providers/new-row-actions-provider.tsx";
// import useAuth from "../hooks/useAuth"

function ApiTablesController({ table, params, customElement }: any) {
    // const { appAuth } = useAuth()
    // const { accessibilitySettings } = useApp()
    const { bulkActionsDispatcher } = useTableBulkActions()
    const { appliedFilters, currentPage, tableSorting, pageSize, tableCoreDispatcher, tableName } = useTableCore()
    const { rowActionsDispatcher } = useTableRowActions()
    const { tableFetchingHandler } = useTableFetcher()
    const { newRowActionsDispatcher } = useTableNewRowActions();

    function flattenMultiCellsActions(actions: any) {
        if (actions && Object.keys(actions)?.filter(key => key === 'general_actions')?.length > 0) {
            return Object.values(actions)?.map((object: any) => Object.values(object))?.reduce((acc, val) => {
                return acc?.concat(val)
            }, [])
        } else {
            return actions
        }
    }

    function checkActionsInRegularCells(rowActions: any) {
        return rowActions && Object.keys(rowActions)?.filter(key => key === 'general_actions')?.length > 0
    }

    useEffect(() => {
        bulkActionsDispatcher({ type: 'GET_STRUCTURE_BULK_ACTIONS', payload: table?.bulkActions })
        tableCoreDispatcher({ type: 'GET_TABLE_COMPONENTS', payload: { ...table } })
        // bulkActionsDispatcher({ type: 'GET_STRUCTURE_BULK_ACTIONS', payload: table?.bulkActions })
        rowActionsDispatcher({ type: 'GET_STRUCTURE_ROW_ACTIONS', payload: flattenMultiCellsActions(table?.rowActions) })
        newRowActionsDispatcher({ type: 'EXTRACT_NEW_ROW_ACTIONS', payload: flattenMultiCellsActions(table?.newRowActions) })
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


    const allFiltersValues = React.useMemo(() => {
        return Object.keys(appliedFilters).map((filter) => {
            return appliedFilters[filter]?.value
        }).join()
    }, [appliedFilters])


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

    }, [tableName, currentPage, pageSize, allFiltersValues, tableSorting])


    return <ApiTablesComponent customElement={customElement} />
}
export default ApiTablesController

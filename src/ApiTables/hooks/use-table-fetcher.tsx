import * as React from "react"
import { useTableColumns } from "../table-providers/table-columns-provider.tsx"
import { useTableCore } from "../table-providers/table-core-provider.tsx"
import { handleApiSuccess } from '@/helper/api/handleApiSuccess.ts'
import { handleApiError } from '@/helper/api/handleApiError.ts'
import axios from 'axios'
import tablesItems from "../../pages/projects/data/tableItems.ts"
import tablesPagenation from "../../pages/projects/data/tablesPagenation.ts"
import { axiosPrivate } from "@/helper/api/axiosInstances.ts"

function useTableFetcher() {
    // const { axiosPrivate } = useAuth()
    const { tableCoreDispatcher } = useTableCore()
    const { tableColumnsDispatcher, toggledClearRows } = useTableColumns()

    async function tableFetchingHandler({ tableName, signal, pageSize, currentPage, appliedFilters, tableSorting, params }: any) {

        tableCoreDispatcher({ type: 'SET_TABLE_LOADING', payload: true })
        tableColumnsDispatcher({ type: 'SET_SELECTED_ROWS', payload: [] })
        tableColumnsDispatcher({ type: 'SET_TOGGLED_CLEAR_ROW', payload: !toggledClearRows })
        try {
            const response = await axiosPrivate({
                method: 'POST',
                url: `/control-tables/query-table/${tableName}`,
                data: {
                    perPage: pageSize,
                    page: currentPage,
                    filters: appliedFilters,
                    sorts: tableSorting,
                    ...(params ? { params } : {}),
                },
                // signal
            })

            // Make Backend send success key from backend and remove the following line !
            const newData = { ...response?.data, success: true }


            handleApiSuccess(newData, false, '', () => {
                tableCoreDispatcher({ type: 'GET_TABLE_DATA', payload: response?.data?.items })
                tableCoreDispatcher({ type: 'GET_TABLE_PAGINATION', payload: response?.data?.pagination })
                tableCoreDispatcher({ type: 'GET_TABLE_BINDINGS', payload: response?.data?.bindings })
            })
        } catch (error) {
            // console.log("error", error)
            if (axios.isAxiosError(error) || (error instanceof Error)) {
                handleApiError(error);
                return error
            } else {
                console.error(error)
            }
        } finally {
            tableCoreDispatcher({ type: 'SET_TABLE_LOADING', payload: false })
        }
    }

    return { tableFetchingHandler }
}


export default useTableFetcher

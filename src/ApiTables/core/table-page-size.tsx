import * as React from "react"
import { useTableCore } from '../table-providers/table-core-provider.tsx'

function TablePageSize() {
    const { tableCoreDispatcher, pageSize } = useTableCore()

    function changePageSize(value: any) {
        tableCoreDispatcher({ type: 'CHANGE_PAGE_SIZE', payload: value })
        tableCoreDispatcher({ type: 'SET_CURRENT_PAGE', payload: 1 })
    }


    return (
        <>
            <select title="select" name="pageSize" className="form-control px-2 px-lg-3 text-sm" value={pageSize} onChange={(e) => {
                changePageSize(Number(e.target.value))
            }}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
        </>
    )
}

export default TablePageSize

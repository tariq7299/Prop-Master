import * as React from "react"
import { RiCloseCircleFill } from "react-icons/ri";
import { useTableCore } from "../table-providers/table-core-provider.tsx";

function TableSorting() {
    const { tableSorting, tableCoreDispatcher } = useTableCore()

    function resetTableSorting() {
        tableCoreDispatcher({ type: 'SET_TABLE_SORTING', payload: {} })
    }

    return (
        <>
            {Object.keys(tableSorting)?.length > 0 && (
                <ul className="list-inline p-0 mb-4">
                    <li className="list-inline-item text-sm fw-bold ms-2">الترتيب المطبق: </li>
                    <li className="list-inline-item mx-1 mb-1">
                        <div className="badge text-xxxs bg-dark fw-normal rounded-pill ps-3 pe-1 py-0">
                            <button
                                type="button"
                                className="btn btn-link shadow-0 p-0 text-white"
                                onClick={resetTableSorting}><RiCloseCircleFill className="ms-2 mb-1" />"</button>
                            <strong>{tableSorting?.label}: </strong> {tableSorting?.direction === 'asc' ? 'تصاعدي' : 'تنازلي'}
                        </div>
                    </li>
                </ul>
            )}
        </>
    )
}

export default TableSorting

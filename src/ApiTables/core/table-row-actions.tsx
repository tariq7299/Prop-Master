import * as React from "react"
import { useEffect, useMemo } from "react"
import { useTableRowActions } from "../table-providers/row-actions-provider.tsx"
import { useTableColumns } from "../table-providers/table-columns-provider.tsx"
import { useTableCore } from "../table-providers/table-core-provider.tsx"
import { ExternalRedirectRowActionElement, GeneralRowActionElement, RedirectRowActionElement, ToggleRowActionElement } from "../general-components/row-actions-elements.tsx"
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { objectToArrayValue, getIntersectedRowActions } from "../table-utils/utils.tsx"

function TableRowActions({ row, col }: any) {
    const { selectedRows } = useTableColumns()
    const { tableData } = useTableCore()
    const { actionsInRegularCells, rowActionsDispatcher } = useTableRowActions()

    const checkButtonsDirection = () => {
        return (tableData?.length <= 3 && !actionsInRegularCells) ? 'd-flex align-items-center' : 'row g-1 d-flex align-items-center flex-column'
    }

    const rowActions = useMemo(() => {
        if (actionsInRegularCells) {
            const filteredColActions = row?.actions[col?.name]
            return objectToArrayValue(filteredColActions)
        } else {
            return objectToArrayValue(row?.actions)
        }
    }, [row, actionsInRegularCells, col])



    useEffect(() => {
        if (selectedRows?.length > 0) {
            rowActionsDispatcher({ type: 'GET_SELECTED_ROW_ACTIONS', payload: objectToArrayValue(getIntersectedRowActions(selectedRows?.map((row: any) => row?.actions))) })
        } else {
            rowActionsDispatcher({ type: 'GET_SELECTED_ROW_ACTIONS', payload: [] })
        }
    }, [selectedRows])

    return (
        <>
            {rowActions?.filter(action => action)?.length > 0 ? (
                <div className={`${(col?.name !== 'general_actions' && actionsInRegularCells) ? 'spreaded-actions-holder' : ''}`}>
                    <div className="dropdown clickable p-0 mb-0">
                        <button
                            type='button'
                            className='btn btn-sm btn-list btn-opac-secondary dropdown-toggle fw-bold mb-1 no-caret ms-1 shadow-0 pt-2 w-100'
                            data-bs-toggle='dropdown'
                            aria-expanded='false'
                            data-bs-auto-close='outside'
                        >
                            ''
                            <PiDotsThreeOutlineVerticalBold size={14} />
                        </button>

                        <ul className="dropdown-menu animate text-end slideIn" style={{ minWidth: '1rem' }}>
                            <li className={`${checkButtonsDirection()} `}>
                                {rowActions?.filter(action => action)?.map((action) => (
                                    <div key={action?.action_key} className="px-1">
                                        {action?.action_type === "toggle" ? (
                                            <ToggleRowActionElement action={action} />
                                        ) : action?.action_type === 'redirect' ? (
                                            <RedirectRowActionElement action={action} />
                                        ) : action?.action_type === 'external_redirect' ? (
                                            <ExternalRedirectRowActionElement action={action} />
                                        ) : (
                                            <GeneralRowActionElement action={action} />
                                        )}
                                    </div>
                                ))}
                            </li>
                        </ul>
                    </div>
                </div>

            ) : (
                <span className="badge bg-secondary">غير مفعل</span>
            )}
        </>
    )
}

export default TableRowActions

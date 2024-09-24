
// import { Link } from "@inertiajs/react"
import * as React from "react"
import { Link } from "react-router-dom"
import { useTableRowActions } from "../table-providers/row-actions-provider.tsx"
import { useTableColumns } from "../table-providers/table-columns-provider.tsx"


// ... 🐼 Check if the bulk action needs a modal form
const requireModal = (action: any) => {
    return action?.need_confirmation || action?.action_type === 'custom_control'
}

export const ToggleRowActionElement = ({ action, isBulk = false }: any) => {
    const { rowActionsPostHandler, rowActionsDispatcher } = useTableRowActions()
    const { selectedIds } = useTableColumns()

    // ... 🐼 Bulk Action API Post Handler
    function fireRowAction(action: any) {
        if (requireModal(action)) {
            rowActionsDispatcher({ type: 'GET_CLICKED_ROW_ACTION', payload: { ...action, ...(isBulk && { isBulk: true }) } })
        } else {
            rowActionsPostHandler(action?.method, isBulk ? action?.bulk_actions_url?.web : action?.action.web, { selected_ids: selectedIds }, { ...action, ...(isBulk && { isBulk: true }) }
            )
        }
    }

    return (
        <div className={`form-check ${action?.toggle_current_value ? 'checked' : ''} form-switch d-flex align-items-center justify-content-center px-2`}>
            <input id={`exp_${action?.action?.web}`} type="checkbox" checked={action?.toggle_current_value} className="form-check-input shadow-0"
                onChange={() => { fireRowAction(action) }}
            />
            <label className="form-check-label text-sm" htmlFor={`exp_${action?.action?.web}`}>
                {action?.button?.label}
            </label>
        </div>
    )
}

export const RedirectRowActionElement = ({ action }: any) => {
    return (
        <Link to={action?.redirect_routes?.web} className={`btn btn-sm px-4 ${action?.button?.btnClasses?.join(' ') || 'btn-opac-primary'} w-100`}>
            {action?.button?.label}
        </Link>
    )
}

export const ExternalRedirectRowActionElement = ({ action }: any) => {
    return (
        <a href={action?.redirect_routes?.web} target='_blank' className={`btn btn-sm px-4 ${action?.button?.btnClasses?.join(' ') || 'btn-opac-primary'} w-100`}>
            {action?.button?.label}
        </a>
    )
}

export const GeneralRowActionElement = ({ action, isBulk = false }: any) => {
    const { rowActionsPostHandler, clickedRowAction, rowActionPostLoading, rowActionsDispatcher } = useTableRowActions()
    const { selectedIds } = useTableColumns()

    // ... 🐼 Bulk Action API Post Handler
    function fireRowAction(action: any) {
        if (requireModal(action)) {
            rowActionsDispatcher({ type: 'GET_CLICKED_ROW_ACTION', payload: { ...action, ...(isBulk && { isBulk: true }) } })

            if (action?.action_type === 'custom_control') {
                rowActionsPostHandler(action?.method, isBulk ? action?.bulk_actions_url?.web : action?.action.web, { selected_ids: selectedIds }, action
                )
            }

        } else {
            rowActionsPostHandler(action?.method, isBulk ? action?.bulk_actions_url?.web : action?.action.web, { selected_ids: selectedIds }, { ...action, ...(isBulk && { isBulk: true }) }
            )
        }
    }

    return (
        <button
            className={`btn btn-sm ${action?.button?.btnClasses?.join(' ') || 'btn-opac-primary'} w-100`}
            disabled={rowActionPostLoading}
            onClick={() => { fireRowAction(action) }}
        >
            {clickedRowAction?.action_key === action?.action_key ? 'برجاء الإنتظار...' : action?.button?.label}
        </button>
    )
}

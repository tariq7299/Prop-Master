
// import { Link } from "@inertiajs/react"
import * as React from "react"
import { Link } from "react-router-dom"
import { useTableRowActions } from "../table-providers/row-actions-provider.tsx"
import { useTableColumns } from "../table-providers/table-columns-provider.tsx"
import { Switch } from "@/components/ui/switch.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Button } from "@/components/custom/button.tsx"


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

        <div className="flex space-x-2 w-full items-center">
            <Switch id={`exp_${action?.action?.web}`} checked={action?.toggle_current_value} onCheckedChange={() => { fireRowAction(action) }} />
            <Label htmlFor={`exp_${action?.action?.web}`} className="cursor-pointer w-full flex-grow">{action?.button?.label}</Label>
        </div>
    )
}

export const RedirectRowActionElement = ({ action }: any) => {
    return (
        // <Link to={action?.redirect_routes?.web} className={` ${action?.button?.btnClasses?.join(' ') || ''} w-full`}>
        //     {action?.button?.label}
        // </Link>
        // Make onClick redirects users
        <Link to={action?.redirect_routes?.api} className="w-full">
            <Button variant="link" className="w-full">
                {action?.button?.label}
            </Button>
        </Link>

    )
}

export const ExternalRedirectRowActionElement = ({ action }: any) => {
    return (
        <a href={action?.redirect_routes?.web} target='_blank' className={` ${action?.button?.btnClasses?.join(' ') || ''} w-full`}>
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
    console.log("action?.button?.btnClasses?.join(' ')", action?.button?.btnClasses?.join(' '))

    return (
        <Button
            size="sm"
            // variant={`${action?.button?.btnClasses?.join(' ')} || default`}
            variant={`${action?.button?.btnClasses?.join(' ') || 'default'}`}
            className="w-full"
            disabled={rowActionPostLoading}
            onClick={() => { fireRowAction(action) }}
        >
            {clickedRowAction?.action_key === action?.action_key ? 'Loading...' : action?.button?.label}
        </Button>
    )
}

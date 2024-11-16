import * as React from "react"
import { useEffect, useMemo } from "react"
import { useTableRowActions } from "../table-providers/row-actions-provider.tsx"
import { useTableColumns } from "../table-providers/table-columns-provider.tsx"
import { useTableCore } from "../table-providers/table-core-provider.tsx"
import { ExternalRedirectRowActionElement, GeneralRowActionElement, RedirectRowActionElement, ToggleRowActionElement } from "../general-components/row-actions-elements.tsx"
import { objectToArrayValue, getIntersectedRowActions } from "../table-utils/utils.tsx"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react';
import { Button } from "@/components/custom/button.tsx"

function TableRowActions({ row, col }: any) {
    const { selectedRows } = useTableColumns();
    const { tableData } = useTableCore();
    const { actionsInRegularCells, rowActionsDispatcher } = useTableRowActions();

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
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="sm" variant='ghost' className='space-x-1'>
                                <EllipsisVertical className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-max flex-col justify-center' align='end' forceMount>
                            {rowActions?.filter(action => action)?.map((action) => (

                                <DropdownMenuItem key={action?.action_key} className="">
                                    {action?.action_type === "toggle" ? (
                                        <ToggleRowActionElement action={action} />
                                    ) : action?.action_type === 'redirect' ? (
                                        <RedirectRowActionElement action={action} />
                                    ) : action?.action_type === 'external_redirect' ? (
                                        <ExternalRedirectRowActionElement action={action} />
                                    ) : (
                                        // This for action_type="normal" and action_type="custom_control"
                                        // "cutom_controll" type is a normal looking button but when clicking on it it will show a custom view modal that frontend engineers will decide
                                        <GeneralRowActionElement action={action} />
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                </>

            ) : (
                <span className="bg-destructive">Not Active</span>
            )}
        </>
    )
}

export default TableRowActions

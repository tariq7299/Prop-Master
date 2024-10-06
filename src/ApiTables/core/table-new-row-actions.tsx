import * as React from 'react';
import { useTableNewRowActions } from '../table-providers/new-row-actions-provider';
import { Button } from '@/components/custom/button';
import { CirclePlus } from 'lucide-react';
import { useTableRowActions } from '../table-providers/row-actions-provider';
import { useTableColumns } from '../table-providers/table-columns-provider';

// Write the type of this array here
// type = NewRowActionsArray

export default function TableNewRowActions() {

    // ... 🐼 Check if the bulk action needs a modal form
    const requireModal = (action: any) => {
        return action?.need_confirmation || action?.action_type === 'custom_control'
    }

    // Add this wehn
    const { newRowActionsArray } = useTableNewRowActions();
    const { rowActionsPostHandler, rowActionsDispatcher, rowActionPostLoading, clickedRowAction } = useTableRowActions()
    const { selectedIds } = useTableColumns()

    // ... 🐼 Bulk Action API Post Handler
    function fireRowAction(action: any) {
        if (requireModal(action)) {

            rowActionsDispatcher({ type: 'GET_CLICKED_ROW_ACTION', payload: { ...action } })

            if (action?.action_type === 'custom_control') {
                rowActionsPostHandler(action?.method, action?.action.web, { selected_ids: selectedIds }, action
                )
            }

        } else {
            rowActionsPostHandler(action?.method, action?.action.web, { selected_ids: selectedIds }, { ...action }
            )
        }
    }

    return (
        <>
            {newRowActionsArray.length > 0 &&
                (
                    <>
                        {newRowActionsArray.map((newRowAction: any, index: any) => (
                            <Button
                                key={index}
                                size="sm"
                                className={` ${newRowAction?.button?.btnClasses?.join(' ') || ''} gap-1 text-background bg-foreground`}
                                disabled={rowActionPostLoading}
                                onClick={() => { fireRowAction(newRowAction) }}

                            ><CirclePlus className="h-4 w-4" /><span className="sr-only md:not-sr-only ">{clickedRowAction?.action_key === newRowAction?.action_key ? 'Loading...' : newRowAction?.button?.label}</span></Button>
                        ))}
                    </>
                )
            }
        </>
    )

}
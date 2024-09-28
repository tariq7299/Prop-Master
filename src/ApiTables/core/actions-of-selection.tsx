import * as React from "react"
import { useTableColumns } from "../table-providers/table-columns-provider.tsx"
import { useTableCore } from "../table-providers/table-core-provider.tsx"
import { useTableBulkActions } from "../table-providers/bulk-actions-provider.tsx"
import { useTableRowActions } from "../table-providers/row-actions-provider.tsx"
import { ExternalRedirectRowActionElement, GeneralRowActionElement, RedirectRowActionElement, ToggleRowActionElement } from "../general-components/row-actions-elements.tsx"
import { Button } from "@/components/custom/button.tsx"
import { File } from "lucide-react"


function ActionsOfSelections() {
    const { selectedRows, selectedIds } = useTableColumns()
    const { appliedFilters } = useTableCore()
    const { bulkActions, bulkActionsPostHandler, bulkActionsDispatcher } = useTableBulkActions()
    const { selectedRowActions } = useTableRowActions()


    // ... 🐼 Check if the bulk action needs a modal form
    const requireModal = (action: any) => {
        return (action?.payload_keys?.filter((action: any) => action !== 'filters' && action !== 'selected_ids')?.length > 0) || action?.need_confirmation
    }


    // ... 🐼 Bulk Action API Post Handler
    function fireBulkAction(action: any) {
        if (requireModal(action)) {
            bulkActionsDispatcher({ type: 'GET_SELECTED_BULK_ACTION', payload: action })
        } else {
            bulkActionsPostHandler(
                action?.method,
                action?.action.bulk_action_url ? action?.action.bulk_action_url : action?.action.web,
                { filters: appliedFilters, selected_ids: selectedIds },
                { msg: action?.action_key === 'export_excel' ? 'جاري تصدير ملف الاكسل' : 'جاري معالجة البيانات', icon: 'excel' },
                action
            )
        }
    }


    return (
        <>
            {selectedRows?.length > 0 && (
                <div className="flex gap-2 pb-5 flex-wrap justify-center items-center">
                    {selectedRowActions?.map((action: any) => (
                        <div className="" key={action?.action_key}>
                            {action?.action_type === "toggle" ? (
                                <ToggleRowActionElement action={action} isBulk={true} />
                            ) : action?.action_type === 'redirect' ? (
                                <RedirectRowActionElement action={action} />
                            ) : action?.action_type === 'external_redirect' ? (
                                <ExternalRedirectRowActionElement action={action} />
                            ) : (
                                <GeneralRowActionElement action={action} isBulk={true} />
                            )}
                        </div>
                    ))}

                    {bulkActions?.map((action: any) => (
                        <div className="" key={action?.action_key}>
                            <Button size="sm" variant="outline"
                                className="gap-1 " onClick={() => fireBulkAction(action)}>
                                <File className="h-4 w-4" /> {action?.label}
                            </Button>
                        </div>
                    ))}
                </div>
            )}

        </>
    )
}

export default ActionsOfSelections

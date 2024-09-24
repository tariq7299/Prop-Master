import * as React from "react"
import { useTableColumns } from "../table-providers/table-columns-provider.tsx"
import { useTableCore } from "../table-providers/table-core-provider.tsx"
import { useTableBulkActions } from "../table-providers/bulk-actions-provider.tsx"
import { useTableRowActions } from "../table-providers/row-actions-provider.tsx"
import { ExternalRedirectRowActionElement, GeneralRowActionElement, RedirectRowActionElement, ToggleRowActionElement } from "../general-components/row-actions-elements.tsx"

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
                <div className="row g-2 justify-content-center mb-3">
                    {selectedRowActions?.map((action: any) => (
                        <div className="col-12 col-sm-6 flex-grow-1 flex-md-grow-0 col-md-auto align-items-center" key={action?.action_key}>
                            {action?.action_type === "toggle" ? (
                                <ToggleRowActionElement action={action} isBulk={true} />
                            ) : action?.action_type === 'redirect' ? (
                                <RedirectRowActionElement action={action} />
                                // <RedirectRowActionElement action={action} isBulk={true} />
                            ) : action?.action_type === 'external_redirect' ? (
                                <ExternalRedirectRowActionElement action={action} />
                                // <ExternalRedirectRowActionElement action={action} isBulk={true} />
                            ) : (
                                <GeneralRowActionElement action={action} isBulk={true} />
                            )}
                        </div>
                    ))}

                    {bulkActions?.map((action: any) => (
                        <div className="col-12 col-sm-6 flex-grow-1 flex-md-grow-0 col-md-auto align-items-center" key={action?.action_key}>
                            <button type='button'
                                className={`btn ${action?.button?.btnClasses?.join(' ') || 'btn-opac-primary'} btn-sm px-4 w-100`}
                                onClick={() => fireBulkAction(action)}>
                                {action?.label}
                            </button>
                        </div>
                    ))}
                </div>
            )}

        </>
    )
}

export default ActionsOfSelections

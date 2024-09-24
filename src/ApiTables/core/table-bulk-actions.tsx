import * as React from "react"
import { useEffect, useMemo, useRef } from "react"
import { VscSettingsGear } from "react-icons/vsc";
import { CgChevronDown } from 'react-icons/cg'
import { useTableColumns } from "../table-providers/table-columns-provider.tsx";
import { useTableCore } from "../table-providers/table-core-provider.tsx";
import { useTableBulkActions } from "../table-providers/bulk-actions-provider.tsx";
import { downloadURL } from "../table-utils/utils.tsx";
// import { router } from "@inertiajs/react";

function TableBulkActions() {
    const dropdownHolderRef = useRef<any>(null)
    const { bulkActions, bulkActionsDispatcher, bulkActionsPostHandler, bulkActionPostResponse } = useTableBulkActions()
    const { tableData, tableFetchingLoading, appliedFilters } = useTableCore()
    const { selectedIds } = useTableColumns()

    // ... 🐼 Disable Bulk Actions Indicator
    const disableBulkActions = useMemo(() => {
        return (!tableData || tableData?.length === 0 || tableFetchingLoading)
    }, [tableData, tableFetchingLoading])

    // ... 🐼 Check if the bulk action needs a modal form
    const requireModal = (action: any) => {
        return (action?.payload_keys?.filter((action: any) => action !== 'filters' && action !== 'selected_ids')?.length > 0) || action?.need_confirmation
    }

    // ... 🐼 Handle bulk action response
    useEffect(() => {
        if (bulkActionPostResponse?.success && bulkActionPostResponse?.type === 'stream') {
            downloadURL(bulkActionPostResponse?.data?.url, bulkActionPostResponse?.file_name)
        }
        if (bulkActionPostResponse?.success && bulkActionPostResponse?.onSuccess === 'refetchData') {
            window.location.reload()
            // router.reload()
        }
        if (bulkActionPostResponse?.success && bulkActionPostResponse?.onSuccess === 'reload') {
            window.location.reload()
            // router.reload()
        }
        bulkActionsDispatcher({ type: 'BULK_ACTION_POST_RESPONSE', payload: null })
    }, [bulkActionPostResponse])

    // ... 🐼 Bulk Action API Post Handler
    function fireBulkAction(action: any) {
        dropdownHolderRef.current?.click()
        if (requireModal(action)) {
            bulkActionsDispatcher({ type: 'GET_SELECTED_BULK_ACTION', payload: action })
        } else {
            bulkActionsPostHandler(
                action?.method,
                action?.action.web,
                { filters: appliedFilters, selected_ids: selectedIds },
                { msg: action?.action_key === 'export_excel' ? 'جاري تصدير ملف الاكسل' : 'جاري معالجة البيانات', icon: 'excel' },
                action
            )
        }
    }

    return (
        <>
            <div ref={dropdownHolderRef}>
                <div className="dropdown clickabke ms-1">
                    <button
                        type='button'
                        className='btn btn-link p-0 btn-sm dropdown-toggle text-dark fw-bold shadow-0 pt-2 no-caret w-100' data-bs-toggle='dropdown' aria-expanded='false' data-bs-auto-close='outside'
                    >
                        <VscSettingsGear className='mx-1' size='1rem' />
                        الإجراءات
                        <CgChevronDown size={13} className='me-1' />
                    </button>

                    <ul
                        className='dropdown-menu end animate slideIn mt-lg-5'
                        style={{ minWidth: '10rem', top: '3rem' }}
                    >
                        {bulkActions?.map((action: any, index: any) => {
                            return (
                                <li key={index}>
                                    <button type='button'
                                        disabled={disableBulkActions}
                                        className={`dropdown-item text-sm text-end ${disableBulkActions ? 'disabled' : ''}`} onClick={() => fireBulkAction(action)}>
                                        {action?.label}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TableBulkActions

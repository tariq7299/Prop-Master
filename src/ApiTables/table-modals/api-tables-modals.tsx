import * as React from "react"
import Popup from '@/components/custom/popup.tsx'
import { useTableBulkActions } from '../table-providers/bulk-actions-provider.tsx'
import { useTableRowActions } from '../table-providers/row-actions-provider.tsx'
import { ConfirmationModal, ViewRowData } from "./columns-static-modals.tsx"
import DrawerDialog from "@/components/custom/drawer-dialog.tsx"
import AddNewProject from "./custom-controls/add-new-project/index.tsx"
import AddNewProjectsByExcel from "./custom-controls/add-new-projects-by-excel/index.tsx"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/custom/button.tsx"


function ApiTablesModals() {
    const { selectedBulkAction, bulkActionsDispatcher } = useTableBulkActions()
    const { clickedRowAction, clickedRowActionResponse, rowActionsDispatcher, customControlAction } = useTableRowActions()

    function handleCloseModal() {
        rowActionsDispatcher({ type: 'GET_CLICKED_ROW_ACTION_RESPONSE', payload: null })
        bulkActionsDispatcher({ type: 'GET_SELECTED_BULK_ACTION', payload: null })
        rowActionsDispatcher({ type: 'GET_CLICKED_ROW_ACTION', payload: null })
        rowActionsDispatcher({ type: 'GET_CUSTOM_CONTROL_REQUEST', payload: null })
    }

    return (
        <>
            {/* ... Bulk Actions Modals */}
            {/* <Popup hasDissmissButton={true} status={selectedBulkAction && !selectedBulkAction?.need_confirmation} closeModal={handleCloseModal}>
                {selectedBulkAction?.action_key === 'export_email' && <SendToMails />}
            </Popup> */}

            {/* ... Row Actions Modals */}
            {/* <Popup hasDissmissButton={true} status={clickedRowActionResponse} closeModal={handleCloseModal}>
                {clickedRowAction?.onSuccess === 'DisplayOnModal' && <ViewRowData data={clickedRowActionResponse} />} */}
            {/* {clickedRowAction?.onSuccess === 'DisplayOnModalCustom' && <AnnouncementModal />} */}
            {/* </Popup> */}


            <ConfirmationModal status={clickedRowAction?.need_confirmation || selectedBulkAction?.need_confirmation} handleCloseModal={handleCloseModal} confirmationFor={clickedRowAction ? 'rowAction' : selectedBulkAction && 'bulkAction'} />

            {/* Custom Control Modals */}
            <DrawerDialog
                className="w-[60%]"
                action={customControlAction}
                handleCloseModal={handleCloseModal}
                status={customControlAction?.action_key === "addNewProject"}
                modalTitle={(<p className="text-xl">{customControlAction?.button?.label}</p>)} modalDescription="Fill in the details of the new project"
                hasCloseButton={false}
            // modalFooter={(<Button >Add Project</Button>)}
            >
                <AddNewProject handleCloseModal={handleCloseModal} />
            </DrawerDialog >

            <DrawerDialog
                className="w-[50%]"
                action={customControlAction}
                handleCloseModal={handleCloseModal}
                status={customControlAction?.action_key === "addNewProjectsByExcel"}
                modalTitle={(<p className="text-xl">{customControlAction?.button?.label}</p>)} modalDescription="Follow steps to upload your sheet"
                hasCloseButton={false}
            // modalFooter={(<Button >Add Project</Button>)}
            >
                <AddNewProjectsByExcel handleCloseModal={handleCloseModal} />
            </DrawerDialog >





            {/* Custom Control Modals */}
            {/* <Popup hasDissmissButton={true} status={customControlAction} closeModal={handleCloseModal} containerClass={`${customControlAction?.url?.web?.includes('/cities/update-carriers') ? "col-11" : ''}`}>
                <h5 className="text-center mb-5">{clickedRowAction?.button?.label}</h5> */}

            {/* {customControlAction?.url?.web?.includes('update-address') && (
                    <EditConsigneeInfoForm action={customControlAction} closeModal={handleCloseModal} />
                )} */}

            {/* </Popup> */}




        </>
    )
}

export default ApiTablesModals

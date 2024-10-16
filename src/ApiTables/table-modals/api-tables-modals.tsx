import * as React from "react"
import Popup from '@/components/custom/popup.tsx'
import { useTableBulkActions } from '../table-providers/bulk-actions-provider.tsx'
import { useTableRowActions } from '../table-providers/row-actions-provider.tsx'
import { SendToMails } from "./bulk-actions-modals.tsx"
import { ConfirmationModal, ViewRowData } from "./columns-static-modals.tsx"
// import EditConsigneeInfoForm from "./custom-controls/edit-consignee-info.tsx"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DrawerDialog from "@/components/custom/drawer-dialog.tsx"
import AddNewProject from "./custom-controls/add-new-project/index.tsx"




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
            <Popup hasDissmissButton={true} status={clickedRowActionResponse} closeModal={handleCloseModal}>
                {clickedRowAction?.onSuccess === 'DisplayOnModal' && <ViewRowData data={clickedRowActionResponse} />}
                {/* {clickedRowAction?.onSuccess === 'DisplayOnModalCustom' && <AnnouncementModal />} */}
            </Popup>

            {/* ... Confirmation Modal */}
            <Popup hasDissmissButton={true} status={clickedRowAction?.need_confirmation || selectedBulkAction?.need_confirmation} closeModal={handleCloseModal}>
                <ConfirmationModal closeModal={handleCloseModal} confirmationFor={clickedRowAction ? 'rowAction' : selectedBulkAction && 'bulkAction'} /* isBulk={clickedRowAction?.isBulk}*/ />
            </Popup>

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

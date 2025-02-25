import * as React from "react"
import { useTableBulkActions } from '../table-providers/bulk-actions-provider.tsx'
import { useTableRowActions } from '../table-providers/row-actions-provider.tsx'
import { ConfirmationModal } from "./columns-static-modals.tsx"
import DrawerDialog from "@/components/custom/drawer-dialog.tsx"
import AddNewProperty from "@/pages/properties/components/add-new-property.tsx"
import ProjectModals from "./custom-controls/project-modals.tsx"
import { RowData } from "./columns-static-modals.tsx"
import PropertyModals from "./custom-controls/property-modals.tsx"
import AddNewDeveloper from "@/pages/developers/components/add-new-developer.tsx"

function ApiTablesModals() {
    const { selectedBulkAction, bulkActionsDispatcher } = useTableBulkActions()
    const { clickedRowAction, clickedRowActionResponse, rowActionsDispatcher, customControlAction, rowActionPostLoading } = useTableRowActions()

    function handleCloseModal() {
        rowActionsDispatcher({ type: 'GET_CLICKED_ROW_ACTION', payload: null })
        rowActionsDispatcher({ type: 'GET_CLICKED_ROW_ACTION_RESPONSE', payload: null })
        bulkActionsDispatcher({ type: 'GET_SELECTED_BULK_ACTION', payload: null })
        rowActionsDispatcher({ type: 'GET_CUSTOM_CONTROL_REQUEST', payload: null })
    }


    console.log("clickedRowAction", clickedRowAction)
    console.log("customControlAction", customControlAction)

    // Note when using modals, pass 'clickedRowAction.action_key' or "customControlAction?.action_key" instead of relying on the url of the response coming after user presses on an action button in the table modal!
    // Because of relyed on the url, this will block the UI !!!, and i will make a bad UX
    // Also if you want to show like a loading indicator when user opens up the modal and don't see any data, then pass in 'rowActionPostLoading' and check it also check if 'action is null' then if both is true then shwo a loading component
    // Iam checking if 'action is null' because I want the laoding to only appear when user opens up the modal and not when closing or submitting !!! so i a have to check for both (rowActionPostLoading and action === null)

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

            {/* 'All Projects' page Modals */}
            <ProjectModals handleCloseModal={handleCloseModal} />

            {/* 'All Properties' page modals */}
            <PropertyModals handleCloseModal={handleCloseModal} />

            <DrawerDialog
                className="w-[60%] max-w-[1100px]"
                handleCloseModal={handleCloseModal}
                status={clickedRowAction?.action_key === "add_new_developer"}
                modalTitle={(<p className="text-xl font-roboto-slap">{clickedRowAction?.label}</p>)}
                modalDescription="Fill in the form below"
                hasCloseButton={true}
            >
                <AddNewDeveloper />
            </DrawerDialog>

            <DrawerDialog
                className="w-[70%]"
                handleCloseModal={handleCloseModal}
                status={clickedRowAction?.action_key === "record_data"}
                modalTitle={(<p className="text-xl font-roboto-slap">Record Details</p>)}
                hasCloseButton={true}
            >
                <RowData rowActionResponse={clickedRowActionResponse} isLoadingModalData={rowActionPostLoading} />
            </DrawerDialog>

        </>
    )
}

export default ApiTablesModals

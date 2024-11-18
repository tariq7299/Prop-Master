import * as React from "react"
import { useTableBulkActions } from '../table-providers/bulk-actions-provider.tsx'
import { useTableRowActions } from '../table-providers/row-actions-provider.tsx'
import { ConfirmationModal } from "./columns-static-modals.tsx"
import DrawerDialog from "@/components/custom/drawer-dialog.tsx"
import AddNewProject from "@/pages/projects/components/add-new-project.tsx"
import AddNewProjectsByExcel from "@/pages/projects/components/add-new-project-by-excel.tsx"
import UpdateProjectDetails from "@/pages/projects/components/update-project-details.tsx"
import ProjectImagesUploadForm from "@/pages/projects/components/project-images-upload-form.tsx"
import UpdateProjectImages from "@/pages/projects/components/update-project-images.tsx"

function ApiTablesModals() {
    const { selectedBulkAction, bulkActionsDispatcher } = useTableBulkActions()
    const { clickedRowAction, clickedRowActionResponse, rowActionsDispatcher, customControlAction } = useTableRowActions()

    function handleCloseModal() {
        rowActionsDispatcher({ type: 'GET_CLICKED_ROW_ACTION_RESPONSE', payload: null })
        bulkActionsDispatcher({ type: 'GET_SELECTED_BULK_ACTION', payload: null })
        rowActionsDispatcher({ type: 'GET_CLICKED_ROW_ACTION', payload: null })
        rowActionsDispatcher({ type: 'GET_CUSTOM_CONTROL_REQUEST', payload: null })
    }

    console.log("customControlAction", customControlAction)
    console.log("clickedRowActionResponse", clickedRowActionResponse)

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

            {/* All Projects page Modals */}
            <DrawerDialog
                className="w-[60%]"
                // action={customControlAction}
                handleCloseModal={handleCloseModal}
                status={customControlAction?.action_key === "addNewProject"}
                modalTitle={(<p className="text-xl">{customControlAction?.button?.label}</p>)} modalDescription="Fill in the details of the new project"
                hasCloseButton={false}
            // modalFooter={(<Button >Add Project</Button>)}
            >
                <AddNewProject action={customControlAction} handleCloseModal={handleCloseModal} />
            </DrawerDialog >
            <DrawerDialog
                className="w-[50%]"
                // action={customControlAction}
                handleCloseModal={handleCloseModal}
                status={customControlAction?.action_key === "addNewProjectsByExcel"}
                modalTitle={(<p className="text-xl">{customControlAction?.button?.label}</p>)} modalDescription="Follow steps to upload your sheet"
                hasCloseButton={false}
            // modalFooter={(<Button >Add Project</Button>)}
            >
                <AddNewProjectsByExcel handleCloseModal={handleCloseModal} />
            </DrawerDialog >
            <DrawerDialog
                className="w-[50%]"
                // action={customControlAction}
                handleCloseModal={handleCloseModal}
                status={customControlAction?.action_key === "edit_project"}
                modalTitle={(<p className="text-xl">Update Project details</p>)} modalDescription="Write a nice discription here"
                hasCloseButton={false}
            // modalFooter={(<Button >Add Project</Button>)}
            >
                <UpdateProjectDetails action={customControlAction} handleCloseModal={handleCloseModal} />
            </DrawerDialog >
            <DrawerDialog
                className="w-[50%]"
                // action={customControlAction}
                handleCloseModal={handleCloseModal}
                status={customControlAction?.action_key === "edit_project_image"}
                modalTitle={(<p className="text-xl">Update Project details</p>)} modalDescription="Write a nice discription here"
                hasCloseButton={false}
            // modalFooter={(<Button >Add Project</Button>)}
            >
                <UpdateProjectImages action={customControlAction} handleCloseModal={handleCloseModal} />
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

import DrawerDialog from "@/components/custom/drawer-dialog.tsx"
import AddNewProject from "@/pages/projects/components/add-new-project.tsx"
import AddNewProjectsByExcel from "@/pages/projects/components/add-new-project-by-excel.tsx"
import UpdateProjectDetails from "@/pages/projects/components/update-project-details.tsx"
import UpdateProjectImages from "@/pages/projects/components/update-project-images.tsx"
import { useTableRowActions } from "@/ApiTables/table-providers/row-actions-provider"
import { CustomControlModalProps } from "@/ApiTables/types/table-modals"

export default function ProjectModals({ handleCloseModal }: CustomControlModalProps) {

    const { clickedRowAction, customControlAction, rowActionPostLoading } = useTableRowActions()


    return (
        <>
            {/* All Projects page Modals */}
            <DrawerDialog
                className="w-[60%]"
                handleCloseModal={handleCloseModal}
                status={customControlAction?.action_key === "add_new_project"}
                modalTitle={(<p className="text-xl">{customControlAction?.button?.label}</p>)} modalDescription="Fill in the details of the new project"
                hasCloseButton={false}
            >
                <AddNewProject action={customControlAction} handleCloseModal={handleCloseModal} />
            </DrawerDialog >
            <DrawerDialog
                className="w-[50%]"
                handleCloseModal={handleCloseModal}
                status={customControlAction?.action_key === "add_new_projects_by_excel"}
                modalTitle={(<p className="text-xl">{customControlAction?.button?.label}</p>)} modalDescription="Follow steps to upload your sheet"
                hasCloseButton={false}
            >
                <AddNewProjectsByExcel handleCloseModal={handleCloseModal} />
            </DrawerDialog >

            <DrawerDialog
                className="w-[50%]"
                handleCloseModal={handleCloseModal}
                status={clickedRowAction?.action_key === "edit_project"}
                modalTitle={(<p className="text-xl">Update Project details</p>)} modalDescription="Write a nice discription here"
                hasCloseButton={false}
            >
                <UpdateProjectDetails action={customControlAction} handleCloseModal={handleCloseModal} loadingModalData={rowActionPostLoading} />
            </DrawerDialog >
            <DrawerDialog
                className="w-[60%]"
                handleCloseModal={handleCloseModal}
                status={clickedRowAction?.action_key === "edit_project_image"}
                modalTitle={(<p className="text-xl">Update Project Images</p>)} modalDescription="You can delete/add images using the form below"
                hasCloseButton={true}
            >
                <UpdateProjectImages action={customControlAction} handleCloseModal={handleCloseModal} />
            </DrawerDialog >
        </>
    )
}
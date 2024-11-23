import ProjectDetailsForm from "./project-details-form"
import { useTableRowActions } from "@/ApiTables/table-providers/row-actions-provider"

// Write types
export default function UpdateProjectDetails({ action, handleCloseModal }) {

    const { rowActionsPostHandler, rowActionPostLoading } = useTableRowActions()


    return (
        <>
            <ProjectDetailsForm isSubmittingProject={rowActionPostLoading} handleSubmittingProject={rowActionsPostHandler} action={action} handleCloseModal={handleCloseModal} formType="update" />
        </>
    )
};
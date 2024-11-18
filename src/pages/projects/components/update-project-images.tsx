import { useTableRowActions } from "@/ApiTables/table-providers/row-actions-provider"
import ProjectImagesUploadForm from "./project-images-upload-form"

export default function UpdateProjectImages({ action, handleCloseModal }) {

    const { rowActionsPostHandler, rowActionPostLoading } = useTableRowActions()

    return (
        <>
            <ProjectImagesUploadForm isSubmittingImags={rowActionPostLoading} handleSubmittingImages={rowActionsPostHandler} action={action} handleCloseModal={handleCloseModal} formType="update" />
        </>
    )
};
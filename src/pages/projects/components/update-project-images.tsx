import { useTableRowActions } from "@/ApiTables/table-providers/row-actions-provider"
import ProjectImagesUploadForm from "./project-images-upload-form"
import { CustomControlActionResponse } from "@/ApiTables/types/table-actions"

type ImageFileInfo = {
    id: number;
    project_id: number;
    url: string;
    caption: string;
    created_at?: string;
    updated_at?: string;
    is_cover: boolean;
};

type CustomControlActionPayload = {
    project_id: number;
    project_images: ImageFileInfo[];
};

type UpdateProjectDetailsProps = {
    action: CustomControlActionResponse<CustomControlActionPayload>
    handleCloseModal: () => void
}

export default function UpdateProjectImages({ action, handleCloseModal }: UpdateProjectDetailsProps) {

    const { rowActionsPostHandler, rowActionPostLoading } = useTableRowActions()

    return (
        <>
            <ProjectImagesUploadForm isSubmittingModal={rowActionPostLoading} handleSubmittingModal={rowActionsPostHandler} action={action} handleCloseModal={handleCloseModal} formType="update" />
        </>
    )
}; 
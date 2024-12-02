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

    if (rowActionPostLoading && !action) {
        return (
            <div className="min-h-16 flex flex-col justify-center items-center pb-9">
                <h1 className="mb-4 text-xl font-bold">Loading data...</h1>
                <div className="loader--3" />
            </div>
        )
    }


    return (
        <>
            <ProjectImagesUploadForm isSubmittingModal={rowActionPostLoading} handleSubmittingModal={rowActionsPostHandler} action={action} handleCloseModal={handleCloseModal} formType="update" />
        </>
    )
}; 
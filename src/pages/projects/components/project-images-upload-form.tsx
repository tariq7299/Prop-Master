
import * as React from "react";
import { useForm } from "react-hook-form";
import { Image, ImagePlus } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import useSendRequest from "@/hooks/api/use-send-request";
import { ReqOptions, ApiResFuncArgs } from "@/helper/types/api";
import { Image as ImageType } from "@/components/custom/image-upload";
import { Stepper } from "@stepperize/react";
import { RowActionPostHandlerArgs, CustomControlActionResponse } from "@/ApiTables/types/table-actions";
import { ConfirmationAlert, ConfirmationAlertStatus, Button, ImageUpload } from "@/components/custom";

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


type FormType = "add" | "update"

type NewProject = {
    id: number,
    name: string,
    // delivery_time: string,
    acres: number,
    status: string
}

type ProjectImagesUploadFormProps = {
    action: CustomControlActionResponse<CustomControlActionPayload>
    newProject?: NewProject
    stepper?: Stepper<[{
        readonly id: "proejctDetails";
        readonly label: "Project Details";
    }, {
        readonly id: "projectImages";
        readonly label: "Project Images";
    }, {
        readonly id: "completed";
        readonly label: "Completed";
    }]>
    formType: FormType
    handleSubmittingModal?: (args: Partial<RowActionPostHandlerArgs>) => void
    isSubmittingModal?: boolean
    handleCloseModal: () => void
}


export default function ProjectImagesUploadForm({ action, newProject, stepper, formType, handleSubmittingModal, isSubmittingModal, handleCloseModal }: ProjectImagesUploadFormProps) {

    const validImageTypes = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
    };

    // Write types
    const form = useForm<any>({
        defaultValues: {
            images: [],
        }
    })

    // Those will be used later with upload image component
    const maxImagesSlots = 6;
    const maxImageSize = 2097152; // Two Mega bytes

    // This is will be used with the Confirm alert that will appear when user tries to delete an image
    const [confirmationAlertStatus, setConfirmationAlertStatus] = React.useState<ConfirmationAlertStatus<ImageType>>({ isOpen: false, itemToRemove: null });

    const sendRequestProps = useSendRequest();
    const { isLoading: isProcessing, sendRequest: performRequest } = sendRequestProps

    // This projectId will be used when uploading images (in update or add modals)
    const projectId = formType === "add" ? newProject?.id : formType === "update" ? action?.payload?.project_id : null
    // This deleteImageUrl will be used when deleting images (in update modals only as in add modals we just remove images from ui only and we don't send anything to backend)
    const deleteImageUrl = `/admin/projects/delete-image`

    // This function will convert a given file info, to a `File` object
    // I am doing this because my form, only takes/gives File objects, as after I convert the images coming from backend to `File` objects I will feed/setValue to the `ImageUpload` form
    function convertToFileObject(imageFileInfo: ImageFileInfo) {

        const fileName = imageFileInfo.caption;

        // Get file extension from URL
        const extension = imageFileInfo.url.split('.').pop() as 'jpg' |
            "jpeg" | 'png';

        // This will store
        const mimeType = validImageTypes[extension.toLowerCase() as 'jpg' |
            "jpeg" | 'png'];

        // I have to convert the imageFileInfo object coming form API to a blob object instance, because it is necessary to create a `File` object
        // This is the standard way to create a blob object
        const blob = new Blob([JSON.stringify(imageFileInfo)], {
            type: "application/json",
        });

        // Create File object
        const file = new File(
            [blob],
            fileName,
            {
                type: mimeType,
                lastModified: new Date(imageFileInfo.updated_at || Date.now()).getTime(),

            }
        );
        return file;
    }

    function convertToFileListObject(projectImages: ImageFileInfo[]) {
        return projectImages?.length > 0 ? projectImages.map((imageInfo) => {
            const image = convertToFileObject(imageInfo)
            // Assign necessary keys of my "Image" object (IsCover, uploadingStaus, id, url)
            Object.assign(image, { isCover: imageInfo.is_cover || false, uploadingStatus: "pending", id: imageInfo.id, url: imageInfo.url });
            return image
        }) : []
    }

    React.useEffect(() => {
        if (formType === "update" && action) {
            // Populate the form of ImageUpload, with all existing images coming form backend
            const existingImages = convertToFileListObject(action.payload.project_images)
            existingImages && form.setValue("images", existingImages)
        }
    }, [action])

    const removeImageFromUi = (imageToRemove: ImageType) => {

        const existingImages: ImageType[] = form.getValues("images")
        let newImages: ImageType[];

        // If the image user wants to remove is a cover, then remove it and after that make one of the existing images as cover instead
        if (imageToRemove && imageToRemove.isCover) {
            newImages = existingImages.filter((existingImage) => existingImage?.name !== imageToRemove.name)
            newImages = newImages.map((newImage, index) => {
                if (index === 0) {
                    newImage.isCover = true
                    return newImage
                } else {
                    return newImage
                }
            })
            form.setValue("images", newImages)
        } else {
            newImages = existingImages.filter((existingImage) => existingImage?.name !== imageToRemove.name)
            form.setValue("images", newImages)
        }
    }

    // This will send a request to Api to delete the image
    const handleSendingDeleteImageReq = (imageToRemove: ImageType | null) => {
        if (imageToRemove) {
            // This will show a loading indecator on the image
            Object.assign(imageToRemove, { uploadingStatus: "deleting" });
            // Reset the confirmationAlertStaus so the alert modal would close
            setConfirmationAlertStatus({ isOpen: false, itemToRemove: null })
            const imageId = imageToRemove?.id

            const RowActionPostHandlerArgs: Partial<RowActionPostHandlerArgs> = { url: action.url.web, action: action, showToast: false, affectModalOpeningClosing: false }

            const reqOptions: ReqOptions = { method: "DELETE", url: `${deleteImageUrl}/${imageId}` }

            const apiResFuncArgs: ApiResFuncArgs = {
                showToast: true,
                successCallback: () => {
                    // Remove the image form the UI, if the api successfully deletes the image
                    removeImageFromUi(imageToRemove)
                    // Iam sending this request so it will update the table, and refetching the row but without closing the modal of updateImages
                    handleSubmittingModal && handleSubmittingModal(RowActionPostHandlerArgs)
                }, errorCallBack: () => {
                    // If the image can't be deleted, then remove the loading indicator because of `uploadingStatus: "deleting"`
                    Object.assign(imageToRemove, { uploadingStatus: "pending" });
                }
            }

            // Send a "DELETE" request to API to delete the image
            performRequest({ reqOptions, apiResFuncArgs })
        }
    }

    const handleDeletingImage = (imageName: string) => {

        const existingImages: ImageType[] = form.getValues("images")
        const imageToRemove = existingImages.find((existingImage) => existingImage.name === imageName)

        if (imageToRemove) {
            if (imageToRemove?.id) {
                setConfirmationAlertStatus({ isOpen: true, itemToRemove: imageToRemove })
            } else {
                removeImageFromUi(imageToRemove)
            }
        }
    }

    // The event attached to "Update Images" button
    const onSubmit = async (data: { images: ImageType[] }) => {

        const newUploadedImages = data?.images

        // I am creating an array of upload image api requests/callbacks
        // This will be used to in Promise.allSettled()
        const apiUploadImagesCallbacks = newUploadedImages.map((newImage: ImageType) => handleUploadingImage(newImage))

        // I am using Promise.allSettled() to check if any image has failed uploading or all has succeeded
        const results = await Promise.allSettled<"succeeded" | "failed">(apiUploadImagesCallbacks);

        if (formType === "update") {

            // Check if all promises succeeded or if there were any failures
            const noImageHasFailedAfterUploading = results.every(
                (result) => result.status === "fulfilled" && result.value === "succeeded"
            );

            //  There all has succeedded uploading then, updated the tabel by refetching the row, and then close the modal
            if (noImageHasFailedAfterUploading) {
                const RowActionPostHandlerArgs: Partial<RowActionPostHandlerArgs> = { url: action.url.web, action: action, showToast: true, customSuccessMsg: "Images have been Updated successfully!", affectModalOpeningClosing: true }
                handleSubmittingModal && handleSubmittingModal(RowActionPostHandlerArgs)
            }
            // If a single image has failed uploading then, update the table by refetching the row but don't close the modal
            else {
                const RowActionPostHandlerArgs: Partial<RowActionPostHandlerArgs> = { url: action.url.web, action: action, showToast: false, affectModalOpeningClosing: false }
                handleSubmittingModal && handleSubmittingModal(RowActionPostHandlerArgs)
            }
        }

    }

    const handleUploadingImage = (image: ImageType): Promise<"succeeded" | "failed"> => {

        // Don't upload any image that has already been uploaded
        if (image?.uploadingStatus !== "succeeded") {

            // This is neccessary becaseu the request contians `File` objects
            const formData = new FormData();
            formData.append('image', image);
            formData.append('is_cover', image?.isCover.toString());

            // Show a loading indicator
            Object.assign(image, { uploadingStatus: "uploading" });

            // Write type of newProject coming after create the new project
            const reqOptions: ReqOptions = { method: "POST", url: `/admin/projects/store-image/${projectId}`, header: { 'Content-Type': 'multipart/form-data' }, data: formData }

            const apiResFuncArgs: ApiResFuncArgs = {
                showToast: false,
                successCallback: () => {
                    // Show uploaded badge on the image
                    Object.assign(image, { uploadingStatus: "succeeded" });
                }, errorCallBack: () => {
                    // Show failed badge with two buttons on the image
                    Object.assign(image, { uploadingStatus: "failed" });
                }
            }

            // If image already has an id with it 
            // Then don't upload it to server and instead just mark it directly as "succeeded"
            // becayse any image has an id would mean that the image already exists!, and it was fetched from backend in the "update" images modal 
            // So only send new images to api
            if (!image?.id) {
                return performRequest({ reqOptions, apiResFuncArgs })
            } else {
                // Just mark the iamge as succeed as it has an id and that would mean that it is already found on the server
                Object.assign(image, { uploadingStatus: "succeeded" });
                // Return a promise and reslove it immedialty! beacuse the Promise.allSettled() function excepct a promise as return value from this function 
                // So i have to return a promise in all cases even there is no a api request
                return Promise.resolve("succeeded")
            }

        }

        // If the image has uploadingStatus === "succeeded" then that would mean the image has already been uploaded, then just return a promise of succeeeded
        // Return a promise and reslove it immedialty! beacuse the Promise.allSettled() function excepct a promise as return value from this function 
        // So i have to return a promise in all cases even there is no a api request
        return Promise.resolve("succeeded")
    }

    const images = form.getValues("images")
    const imagesStatus = images.map((image: ImageType) => image.uploadingStatus).join()


    const oneImageHasFailedUploading = React.useMemo(() => images.some((image: ImageType) => image.uploadingStatus === "failed") && images.length > 0, [images, imagesStatus])

    const oneImageAtLeastIsUnderProcessing = React.useMemo(() => images.some((image: ImageType) => image.uploadingStatus === "uploading" || image.uploadingStatus === "deleting") && images.length > 0, [images, imagesStatus])

    const allImagesHasBeenUploaded = React.useMemo(() => !images.some((image: ImageType) => image.uploadingStatus !== "succeeded") && images.length > 0, [images, imagesStatus])

    const oneImageHasBeenUploaded = React.useMemo(() => images.some((image: ImageType) => image.uploadingStatus === "succeeded") && images.length > 0, [images, imagesStatus])

    const oneImageAtLeastIsPending = React.useMemo(() => images.some((image: ImageType) => image.uploadingStatus === "pending" || image.uploadingStatus === "failed") && images.length > 0, [images, imagesStatus])

    const isSubmitButtonDisabled = React.useMemo(() => isProcessing || !form.formState.isDirty || oneImageAtLeastIsUnderProcessing || !oneImageAtLeastIsPending || isSubmittingModal, [images, imagesStatus])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="overflow-y-auto">

                {/* Modal Body  */}
                <div className=" py-6 p-1 pb-28 md:p-6 md:pb-14 grid grid-cols-1 md:grid-cols-2 gap-y-10 md:items-center justify-items-center gap-x-10 ">

                    <div className="md:col-span-2">

                        <FormField
                            control={form.control}
                            name='images'
                            render={({ field }) => (
                                <FormItem className='space-y-1  '>
                                    <FormControl>
                                        <ImageUpload
                                            handleUploadingImage={handleUploadingImage}
                                            maxImageSize={maxImageSize}
                                            maxImagesSlots={maxImagesSlots}
                                            validImageTypes={validImageTypes}
                                            field={field}
                                            title={"Upload Project Images"}
                                            description={"Drag and drop your images here or click the button to select files."}
                                            imagePlaceHolderText={"Drag and drop your images here"}
                                            titleIcon={(<Image className="h-5 w-5 text-secondary" />)}
                                            imagePlaceHolderIcon={(<ImagePlus className="w-6 h-6 text-muted-foreground" />)}
                                            handleDeletingImage={handleDeletingImage}
                                            deleteImageUrl={deleteImageUrl}
                                        />
                                    </FormControl>
                                    <FormMessage className="  max-w-prose" />
                                </FormItem>
                            )}
                        />
                    </div>

                </div >

                {/* Modal Footer */}
                <div className="fixed bottom-0 right-0 p-2 pt-3 bg-background w-full flex  justify-end gap-2">

                    {formType === "add" ? (
                        <>
                            {((images.length > 0 && !allImagesHasBeenUploaded)) && (
                                <Button disabled={isSubmitButtonDisabled} type="submit" variant="secondary" >
                                    {oneImageHasFailedUploading ? "Retry uploading" : "Upload Images"}
                                </Button>
                            )}

                            {/* This "skip/finish" button will only appear in add forms */}
                            <Button disabled={isProcessing || !form.formState.isDirty || !oneImageHasBeenUploaded || oneImageAtLeastIsUnderProcessing} type="button" onClick={() => stepper && stepper.next()}>
                                {(oneImageHasFailedUploading && oneImageHasBeenUploaded && (images.length > 0))
                                    ?
                                    "Skip"
                                    :
                                    "Finish"
                                }
                            </Button>

                        </>
                    ) : (
                        <>
                            <Button disabled={isSubmitButtonDisabled} type="submit" variant="secondary" >
                                {oneImageHasFailedUploading ? "Retry uploading" : "Update Images"}
                            </Button>

                            {/* This "Close" button will only appear in update forms */}
                            <Button variant="outline" disabled={isProcessing || oneImageAtLeastIsUnderProcessing} type="button" onClick={() => handleCloseModal()}>
                                Close
                            </Button>

                        </>
                    )}

                </div>

                {/* This is the alert comopnent that will appear when users clicks on delete button to delete an image */}
                <ConfirmationAlert<ImageType>
                    setConfirmationAlertStatus={setConfirmationAlertStatus}
                    confirmationAlertStatus={confirmationAlertStatus}
                    handleConfirmation={() => handleSendingDeleteImageReq(confirmationAlertStatus.itemToRemove)}
                    alertTitle={(
                        <>
                            Are you absolutely sure you want to delete the image <span className="font-bold ">{confirmationAlertStatus.itemToRemove?.name}</span>?
                        </>
                    )}
                    discription={"This image is currently linked to one or more projects in the database."}
                />

            </form>
        </Form >
    )
}
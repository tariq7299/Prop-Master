import * as React from "react";
import ImageUpload from "@/components/custom/image-upload";
import { useForm } from "react-hook-form";
import { Button } from "@/components/custom/button";
import { Image, ImagePlus } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import useSendRequest from "@/hooks/api/use-send-request";
import { ReqOptions } from "@/helper/types/api";
import { ApiResFuncArgs } from "@/helper/types/api";
import { Image as ImageType } from "@/components/custom/image-upload";
import { Stepper } from "@stepperize/react";


type FormType = "add" | "update"

type NewProject = {
    id: number,
    name: string,
    // delivery_time: string,
    acres: number,
    status: string
}

// Write types
type ProjectImagesUploadFormProps = {
    action: any
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
    handleSubmittingImages?: any
    handleCloseModal: any
    isSubmittingImags: boolean
}

// Write types
export default function ProjectImagesUploadForm({ action, newProject, stepper, formType, handleSubmittingImages, isSubmittingImags, handleCloseModal }: ProjectImagesUploadFormProps) {

    console.log("action", action)
    console.log("formType", formType)

    // This will store all deleted images when user clicks on a delete/reset button
    // Iam not using a state, because this doesn't have to trigger any rerenders of ui or any component !, as it doesn't affect the UI in any case
    // This sole purpose to be sent to server in order to remove them from database
    const deleted_images_ids = React.useRef([])

    const form = useForm<any>({
        defaultValues: {
            images: [],
        }
    })

    function convertToFile(fileInfo) {


        // // Validate input
        // if (!fileInfo?.url) {
        //     throw new Error('URL is required in the file information object');
        // }

        const fileName = fileInfo.caption;

        console.log("fileName", fileName)
        // Get file extension from URL
        const extension = fileInfo.url.split('.').pop() || '';

        console.log("extension", extension)
        // Determine MIME type based on extension
        const mimeTypes = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',

        };

        const mimeType = mimeTypes[extension.toLowerCase()] || 'application/octet-stream';

        console.log("mimeType", mimeType)


        const blob = new Blob([JSON.stringify(fileInfo)], {
            type: "application/json",
        });

        console.log("blob", blob)
        // Create File object
        const file = new File(
            [blob],
            fileName,
            {
                type: mimeType,
                lastModified: new Date(fileInfo.updated_at || Date.now()).getTime(),

            }
        );

        Object.assign(file, { isCover: fileInfo.is_cover || false, uploadingStatus: "pending", id: fileInfo.id, projectId: fileInfo.project_id, url: fileInfo.url });

        console.log("file", file)

        const array = new Array(file);

        console.log("array", array)

        // return array;
        return file;

    }

    function convertToFileList(projectImages) {
        return projectImages?.length > 0 ? projectImages.map((image) => convertToFile(image)) : []
    }

    React.useEffect(() => {

        console.log("action?.payload?.project_images", action?.payload?.project_images)

        if (formType === "update") {

            const existingImages = convertToFileList(action?.payload?.project_images)

            console.log("existingImages", existingImages)

            existingImages && form.setValue("images", existingImages)


        }

    }, [action])

    // console.log("tretssf", convertToFile(project_images[0]))


    // if (!(newProject || action)) {
    //     return (
    //         <div className="min-h-36 flex justify-center items-center">
    //             No project found ! Please create project and come back again
    //         </div>
    //     )
    // }

    // Write types
    // console.log(form.watch())

    const onSubmit = (data: any) => {

        console.log("dataa", data)
        console.log("action", action)

        const formattedPayload = { deleted_image_ids: deleted_images_ids }

        const newUploadedImages = data?.images

        newUploadedImages.map((newImage) => {
            handleUploadingImage(newImage)
        })

        if (formType === "add") {
            // handleSubmittingImages()
            console.log("formType", formType)
        } else if (formType === "update") {
            handleSubmittingImages(action?.method, action?.url?.web, formattedPayload, action, "", true)
        }

    }

    // Those will be used later with upload image component
    const maxImagesSlots = 6;
    const maxImageSize = 2097152; // Two Mega bytes

    const sendRequestProps = useSendRequest();
    const { isLoading: isSubmittingImage, sendRequest: uploadOneImage } = sendRequestProps

    // write
    const handleUploadingImage = (image: ImageType) => {

        console.log("imageSUBMIGT", image)

        if (image?.uploadingStatus !== "succeeded") {

            // Write comments
            // Write types
            const formData = new FormData();
            formData.append('image', image);
            formData.append('is_cover', image?.isCover.toString());

            Object.assign(image, { uploadingStatus: "uploading" });

            // Write type of newProject coming after create the new project
            const reqOptions: ReqOptions = { method: "POST", url: `/admin/projects/store-image/${13115}`, header: { 'Content-Type': 'multipart/form-data' }, data: formData }
            // const reqOptions: ReqOptions = { method: "POST", url: `/admin/projects/store-image/${newProject?.id}`, header: { 'Content-Type': 'multipart/form-data' }, data: formData }

            const apiResFuncArgs: ApiResFuncArgs = {
                successCallback: (res: any) => {
                    Object.assign(image, { uploadingStatus: "succeeded" });
                }, errorCallBack: (res: any) => {
                    Object.assign(image, { uploadingStatus: "failed" });
                }
            }

            // If image already has an id with it 
            // Then don't upload it to server and instead just mark it directly as "succeeded"
            // becayse any image has an id would mean that the image already exists!, and it was fetched from backend in the "update" images modal 
            // So only send new images to api
            console.log("imageSUBMIGT", image)
            if (!image?.id) {

                console.log("reqOptions", reqOptions)
                uploadOneImage({ reqOptions, apiResFuncArgs })

            } else {
                Object.assign(image, { uploadingStatus: "succeeded" });
            }


        }
    }

    const images = form.getValues("images")
    const imagesStatus = images.map((image) => image.uploadingStatus).join()


    // Write types
    // Write comments

    const oneImageHasFailedUploading = React.useMemo(() => images.some((image) => image.uploadingStatus === "failed") && images.length > 0, [images, imagesStatus])

    const oneImageAtLeastIsUploading = React.useMemo(() => images.some((image) => image.uploadingStatus === "uploading") && images.length > 0, [images, imagesStatus])

    const allImagesHasBeenUploaded = React.useMemo(() => !images.some((image) => image.uploadingStatus !== "succeeded") && images.length > 0, [images, imagesStatus])

    const oneImageHasBeenUploaded = React.useMemo(() => images.some((image) => image.uploadingStatus === "succeeded") && images.length > 0, [images, imagesStatus])

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
                                        {/* Write Types */}
                                        <ImageUpload
                                            // sendRequestProps={sendRequestProps}
                                            handleUploadingImage={handleUploadingImage}
                                            // newProject={newProject}
                                            maxImageSize={maxImageSize}
                                            maxImagesSlots={maxImagesSlots}
                                            field={field}
                                            title={"Upload Project Images"}
                                            description={"Drag and drop your images here or click the button to select files."}
                                            imagePlaceHolderText={"Drag and drop your images here"}
                                            titleIcon={(<Image className="h-5 w-5 text-secondary" />)}
                                            imagePlaceHolderIcon={(<ImagePlus className="w-6 h-6 text-muted-foreground" />)}
                                            deleted_images_ids={deleted_images_ids}
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
                                <Button disabled={isSubmittingImage || !form.formState.isDirty || oneImageAtLeastIsUploading} type="submit" variant="secondary" >
                                    {oneImageHasFailedUploading ? "Retry uploading" : "Upload Images"}
                                </Button>
                            )}

                            <Button disabled={isSubmittingImage || !form.formState.isDirty || !oneImageHasBeenUploaded || oneImageAtLeastIsUploading} type="button" onClick={() => stepper.next()}>
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


                            <Button disabled={isSubmittingImage || !form.formState.isDirty || oneImageAtLeastIsUploading} type="submit" variant="secondary" >
                                {oneImageHasFailedUploading ? "Retry uploading" : "Update Images"}
                            </Button>

                            <Button type="button" onClick={() => handleCloseModal()}>
                                Cancel
                            </Button>

                        </>
                    )}


                </div>
            </form>
        </Form >

    )
}
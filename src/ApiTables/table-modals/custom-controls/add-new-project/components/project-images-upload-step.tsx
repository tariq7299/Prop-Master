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
import { ReqOptions } from "@/helper/api/types";
import { ApiResFuncArgs } from "@/helper/api/types";

// Write types
export default function ProjectImagesUploadStep({ newProject, stepper }: any) {

    // Write types
    const form = useForm<any>({
        defaultValues: {
            images: [],
        }
    })

    const onSubmit = (data: any) => {

        const newUploadedImages = data?.images
        newUploadedImages.map((newImage) => {
            handleUploadingImage(newImage)
        })

    }

    // Those will be used later with upload image component
    const maxImagesSlots = 6;
    const maxImageSize = 2097152; // Two Mega bytes

    const sendRequestProps = useSendRequest();
    const { isLoading: isSubmittingImage, sendRequest: uploadOneImage } = sendRequestProps

    const handleUploadingImage = (image: ImageWithCoverKey) => {

        if (image?.uploadingStatus !== "succeeded") {

            // Write comments
            const formData = new FormData();
            formData.append('image', image);
            formData.append('is_cover', image?.isCover);

            Object.assign(image, { uploadingStatus: "uploading" });

            // Write type of newProject coming after create the new project
            const reqOptions: ReqOptions = { method: "POST", url: `/admin/projects/store-image/${newProject?.data?.id}`, header: { 'Content-Type': 'multipart/form-data' }, data: formData }

            const apiResFuncArgs: ApiResFuncArgs = {
                successCallback: (res: any) => {
                    Object.assign(image, { uploadingStatus: "succeeded" });
                }, errorCallBack: (res: any) => {
                    Object.assign(image, { uploadingStatus: "failed" });
                }
            }
            uploadOneImage({ reqOptions, apiResFuncArgs })
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
                                            sendRequestProps={sendRequestProps}
                                            handleUploadingImage={handleUploadingImage}
                                            newProject={newProject}
                                            maxImageSize={maxImageSize}
                                            maxImagesSlots={maxImagesSlots}
                                            field={field}
                                            title={"Upload Project Images"}
                                            description={"Drag and drop your images here or click the button to select files."}
                                            imagePlaceHolderText={"Drag and drop your images here"}
                                            titleIcon={(<Image className="h-5 w-5 text-secondary" />)}
                                            imagePlaceHolderIcon={(<ImagePlus className="w-6 h-6 text-muted-foreground" />)}
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

                </div>
            </form>
        </Form >

    )
}
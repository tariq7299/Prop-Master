
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "./button"
import { Input } from "../ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { X, Upload, Loader, Ellipsis, BadgeCheck, Trash2, Repeat2, BadgeAlert } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
// change this to sonner
// import { toast } from "@/components/ui/use-toast";
import { toast } from "sonner"
import { useFormContext } from "react-hook-form";
import useSendRequest from "@/hooks/api/use-send-request";
import { SendRequest } from "@/helper/api/types"
import { ReqOptions } from "@/helper/api/types";
import { ApiResFuncArgs } from "@/helper/api/types";
import { FullPageLoader } from "@/hooks/app/types";

// Write types
type ImageUplaod = {
    // Change this and add to filed the correct types
    // form: any,
    handleUploadingImage: any,
    sendRequesProps: any,
    newProject: any
    // stepper: any
    maxImageSize: number
    maxImagesSlots: number
    // handleDroppingImages: any,
    // handleImagesChange: any,
    // handleSetImageAsCover: any,
    // handleRemovingImage: any,
    // watch: any,
    // getValues: any,
    // images: any
    field: any,
    title: string,
    description: string,
    imagePlaceHolderText: string,
    titleIcon?: React.ReactNode,
    imagePlaceHolderIcon?: React.ReactNode
}

// Write types
type ImageWithCoverKey = File & {
    // isUploaded?: boolean
    // isUploading?: boolean
    uploadingStatus: "pending" | "uploading" | "succeeded" | "failed"
    isCover?: boolean
}

export default function ImageUpload({ maxImagesSlots, maxImageSize, field, title, description, imagePlaceHolderText, titleIcon, imagePlaceHolderIcon, newProject, sendRequesProps, handleUploadingImage }: ImageUplaod) {

    // Write types
    // // I added this line because the ref 
    const fileInputRef = React.useRef(null)

    // Add types to this hook using generic types `TS`


    const { setValue, watch, getValues, setError, clearErrors } = useFormContext()
    // const { setValue, watch, getValues, setError, clearErrors } = form

    const validateMaxNubmerOfImages = (existingImages: ImageWithCoverKey[], uploadedImagesArray: File[], uploadedImageCount: number, existingImageCount: number): File[] => {


        // This the number of free images slots left
        const freeImagesSlots = maxImagesSlots - existingImageCount

        // This will be used in fitlering the uploaded images array from duplictaed iamges and then it will be filtered from images exceeding max lentgh of `freeImageSlots`
        let newFilteredArray = [...uploadedImagesArray]

        // If uploaded images count exceeding the free images slotes left
        if (uploadedImageCount > freeImagesSlots) {

            // Show error under the input to user
            setError("images", { type: "maxImagesSlots", message: `You are trying to upload ${uploadedImageCount} images, but only ${freeImagesSlots} image slots are available.` })
            // Also toast the same error 
            // toast({
            //     title: "Max number of photos",
            //     variant: "destructive",
            //     description: `You're attempting to upload ${uploadedImageCount} images, which exceeds the left free image spaces of ${freeImagesSlots}`
            // })
            toast.warning("Max number of photos", {
                description: `You are trying to upload ${uploadedImageCount} images, but only ${freeImagesSlots} image slots are available.`,

            })

            // Filter the images from duplicated/already uploaded images

            newFilteredArray = [...uploadedImagesArray.filter(uploadedImage => !existingImages.some(existingImage => (uploadedImage.name === existingImage.name)))]

            // In case after we filter the uploaded from already uploaded imagees and yet still the `newFilteredArray` have images more than free slots left 
            if (newFilteredArray.length > freeImagesSlots) {

                //  Then only take number of images equal to free slotes left
                newFilteredArray = Array.from({ length: freeImagesSlots }, (_, index) => newFilteredArray[index]);
            }
            // At the end return the newFilterArray
            return newFilteredArray

        } else {
            // If number uploaded Images doesn't exceed the free images then don't do any thing and just return it
            return uploadedImagesArray
        }


    }

    const validateMaxImageSize = (uploadedImagesArray: File[], maxSize: number) => {

        const oneOfImagesExceedMaxSize = uploadedImagesArray.some(uploadedImage => {
            return uploadedImage.size > maxSize
        })

        if (oneOfImagesExceedMaxSize) {
            // not working ??!??!
            // setError("images", { type: "maxSizeOfImage", message: "Some of the images didn't got upladed as it exceed the maximum size of 2 MB!" })
            // toast({
            //     title: "Max size",
            //     variant: "destructive",
            //     description: "Some of the images didn't got upladed as it exceed the maximum size of 2 MB!"
            // })
            toast.warning("Max size", {
                description: "Some of the images didn't got upladed as it exceed the maximum size of 2 MB!",

            })
        }

        // Then test the max size of each image and only include equal or less than 2MB image from the uploadedImages
        return uploadedImagesArray.filter((uploadedImage) => uploadedImage.size <= maxSize)
    }

    const validateImageType = (uploadedImagesArray: File[], validImageTypes: string[]) => {

        const isAnyImageHasInvalidType = uploadedImagesArray.some(uploadedImage => !validImageTypes.includes(uploadedImage.type))
        if (isAnyImageHasInvalidType) {
            // toast({
            //     title: "Invalid type",
            //     variant: "destructive",
            //     description: "Some of the images didn't got upladed as has an invalid image type!, Valid types are [.png, .jpg, .jpeg]"
            // })
            toast.warning("Invalid type", {
                description: "Some of the images didn't got upladed as has an invalid image type!, Valid types are [.png, .jpg, .jpeg]",

            })
        }
        return uploadedImagesArray.filter(uploadedImage => validImageTypes.includes(uploadedImage.type))
    }

    const handleDroppingImages = (droppedImages: FileList, onChange: (e: ImageWithCoverKey[]) => void) => {
        handleImagesChange(droppedImages, onChange)
    }

    const handleSetImageAsCover = (imageName: string) => {
        const existingImages: ImageWithCoverKey[] = getValues("images")

        const newImages = existingImages.map((existingImage) => {
            if (existingImage?.name === imageName) {
                existingImage["isCover"] = true
                return existingImage
            } else {
                existingImage["isCover"] = false
                return existingImage
            }
        })

        setValue("images", newImages)


    }

    const handleRemovingImage = (imageName: string) => {

        const existingImages: ImageWithCoverKey[] = getValues("images")
        const imageToRemove = existingImages.find(existingImage => existingImage.name === imageName)

        let newImages: ImageWithCoverKey[];
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
            setValue("images", newImages)
        } else {
            newImages = existingImages.filter((existingImage) => existingImage?.name !== imageName)
            setValue("images", newImages)
        }

    }

    const handleImagesChange = (uploadedImages: FileList, onChange: (e: ImageWithCoverKey[]) => void) => {

        // clear error appeared under the image input if any found
        clearErrors("images")

        // Convert the `uploadedImages` to array as it is a `FileList` object
        let uploadedImagesArray = Array.from(uploadedImages)

        const existingImages: ImageWithCoverKey[] = watch("images")
        const validImageTypes = ["image/png", "image/jpg", "image/jpeg"]
        const uploadedImagesCount = uploadedImagesArray.length
        const existingImageCount = existingImages.length


        // Validation
        // Validate and return filtered array with correct values/images !
        uploadedImagesArray = validateImageType(uploadedImagesArray, validImageTypes)
        uploadedImagesArray = validateMaxImageSize(uploadedImagesArray, maxImageSize)
        uploadedImagesArray = validateMaxNubmerOfImages(existingImages, uploadedImagesArray, uploadedImagesCount, existingImageCount)

        // This
        let newUploadedImages: ImageWithCoverKey[];

        // First check if existingImages has any images becasue if not just use the uploadedImagesArray directily !
        if (existingImages.length > 0) {

            // Add isCover key to each image object in uploadedImagesArray
            // Here i want to mark all of them to be as `false` as there is already existing images and one of them is set to isCover image
            newUploadedImages = uploadedImagesArray.map((uploadedImage) => {
                // Object.assign(uploadedImage, { isCover: false, isUploading: false, isUploaded: false });
                Object.assign(uploadedImage, { isCover: false, uploadingStatus: "pending", });
                return uploadedImage
            })


            // This will filter `uploadedImagesArray` to see if any image inside it has been already uploaded before

            // We did this by filtring "uploadedImagesArray" by checking if any `existingImage.name` in `existingImages` equal to `uploadedImage.name` by using: 
            // `existingImages.some(uploadedImage.name === existingImage.name)` function to each `uploadedImage`.

            // Then if output of `existingImages.some()` is true then convert to `false` by using `!existingImages.some()` 

            // Then that will tell uploadedImagesArray.filter() function to not return the current image ! and move to the next one 

            // Finally return the filtered `uploadedImagesArray` array and `existingImages` array

            newUploadedImages = [...uploadedImagesArray.filter(uploadedImage => !existingImages.some(existingImage => (uploadedImage.name === existingImage.name))), ...existingImages]



            // This part of 'if' will be used if there is no existing images yet 
        } else {
            // Add isCover key to each image object in uploadedImagesArray
            newUploadedImages = uploadedImagesArray.map((uploadedImage, index) => {
                // If the it is the first image in the array then mark it as a isCover image
                if (index === 0) {
                    // Object.assign(uploadedImage, { isCover: true, isUploading: false, isUploaded: false });
                    Object.assign(uploadedImage, { isCover: true, uploadingStatus: "pending", });
                    return uploadedImage
                } else {
                    // If not then it is not a isCover image
                    // Object.assign(uploadedImage, { isCover: false, isUploading: false, isUploaded: false });
                    Object.assign(uploadedImage, { isCover: false, uploadingStatus: "pending", });
                    return uploadedImage
                }
            })


            // newUploadedImages = [...uploadedImagesArray]
        }


        onChange(newUploadedImages)

    }


    return (
        <TooltipProvider>

            <div className="grid gap-4 max-w-lg" >

                <div className="grid gap-1">

                    <div className="flex items-center space-x-2">
                        <h2 className="text-sm md:text-base font-medium">{title}</h2> {titleIcon && titleIcon}
                    </div>

                    {/* <p className="text-sm text-gray-500 dark:text-gray-400"> */}

                    <p className="text-xs md:text-sm text-muted-foreground">
                        {description}
                    </p>

                </div>

                <Card>
                    <CardContent className="grid gap-4 p-4">
                        <div onDrop={(e) => { e.preventDefault(); handleDroppingImages(e.dataTransfer.files, field.onChange) }} onDragOver={(event) => event.preventDefault()}>
                            <div>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-700 transform transition hover:bg-muted/40 hover:drop-shadow-lg hover:-translate-y-2">
                                            <Upload className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{imagePlaceHolderText}</p>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-warning text-warning-700 border-2">
                                        <p className="text-wrap">Drag and drop images here, supported files(.png, .jpg, jpeg)</p>
                                    </TooltipContent>
                                </Tooltip>

                            </div>
                        </div>
                        {/* <div className="flex justify-end">
                        <FormField
                            control={form.control}
                            name='delivery_time'
                            render={({ field }) => (
                                <FormItem className='space-y-1'>
                                    <div className="flex items-center space-x-2">
                                        <FormLabel htmlFor="file-input" className="button button-sm"> Select Files <UploadIcon className="mr-2 h-4 w-4" /> </FormLabel>
                                        <Input {...field} id="file-input" type="file" multiple className="hidden" />
                                    </div>
                                    <FormControl>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div> */}
                        {/* Write types */}
                        <div className="flex justify-end">
                            <label htmlFor="file-input" className="button button-sm">
                                <Upload className="mr-2 h-4 w-4" />
                                Select Files
                                <Input {...field} value={field.value.fileName} onChange={(e) => {
                                    // field.onChange(Array.from(e.target.files))
                                    handleImagesChange(e.target.files, field.onChange)
                                }} id="file-input" type="file" multiple className="hidden" accept="image/png, image/jpg, image/jpeg" />

                            </label>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-flow-row auto-rows-max gap-5 justify-items-stretch grid-cols-[repeat(3,_minmax(70px,_100px))] justify-center p-4">
                    {/* <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-y-3 gap-x-3 justify-items-center"> */}

                    {/* Write some comments here  */}
                    {Array.from({ length: maxImagesSlots }, (_, i) => {

                        if (getValues("images").find((_, index) => index === i)) {
                            return (
                                <div key={i} className={`relative flex bg-muted justify-center items-center aspect-square w-full  rounded-lg group overflow-hidden transform transition duration-300 ease-in-out hover:-translate-y-3 hover:drop-shadow-lg ${getValues("images")[i]?.uploadingStatus === "uploading" ? "motion-safe:animate-bounce" : ""}`}>

                                    <img src={URL.createObjectURL(getValues("images")[i])} alt="" className="" />

                                    {getValues("images")[i]?.uploadingStatus === "pending"
                                        ? (
                                            <>
                                                <Button type="button" size="sm" variant="outline" className="absolute top-2 right-2 w-max h-max p-1 block md:hidden group-hover:block"
                                                    onClick={() => handleRemovingImage(getValues("images")[i]?.name || "")}
                                                >
                                                    <X className="h-3 w-3 md:h-4 md:w-4 text-destructive " />

                                                </Button>

                                                {!getValues("images")[i]?.isCover && (
                                                    <Button size="sm" type="button" variant="default" className="block md:hidden group-hover:block absolute bottom-2 w-max h-max px-2 text-2xs py-1 " onClick={() => handleSetImageAsCover(getValues("images")[i]?.name || "")}>Set as isCover</Button>
                                                )}
                                            </>

                                        )
                                        : getValues("images")[i]?.uploadingStatus === "uploading" ?
                                            (
                                                <div className={`absolute h-full w-full z-40 bg-muted-foreground/80 dark:bg-muted/60 inset-0 flex flex-col justify-center items-center gap-y-2 `}>

                                                    <Loader className="animate-spin z-50 text-primary-500 w-1/3 h-1/3" />
                                                    <div className="text-nowrap flex z-50">
                                                        <span className="text-xs text-primary-500 font-semibold italic">Uploading</span>
                                                        <Ellipsis className="animate-pulse  text-primary-500  " />
                                                    </div>
                                                </div>
                                            )
                                            : getValues("images")[i]?.uploadingStatus === "succeeded" ?
                                                (

                                                    <div className={`absolute h-full w-full z-40 bg-muted-foreground/80 dark:bg-muted/60 inset-0 flex flex-col justify-center items-center gap-y-2 `}>
                                                        {/* <Loader className="animate-spin z-50 text-primary-500 w-1/3 h-1/3" /> */}
                                                        <BadgeCheck className="w-1/3 h-auto rounded-full  text-success z-50 " />
                                                        <div className="text-nowrap flex z-50">
                                                            <span className="text-xs text-success font-semibold">Uploaded</span>
                                                        </div>
                                                    </div>
                                                ) : getValues("images")[i]?.uploadingStatus === "failed" ?
                                                    (<div className={`absolute h-full w-full z-40 bg-muted-foreground/80 dark:bg-muted/60 inset-0 flex flex-col justify-center items-center gap-y-2 `}>

                                                        <BadgeAlert className="w-1/4 h-auto rounded-full  text-destructive z-50 " />
                                                        <div className="text-nowrap flex z-50">
                                                            <span className="text-xs text-destructive font-semibold">Failed</span>
                                                        </div>

                                                        <div className="flex gap-x-2">
                                                            <Button type="button" size="sm" variant="outline" className="p-x-1  text-xs h-7"
                                                                onClick={() => handleRemovingImage(getValues("images")[i]?.name || "")}
                                                            >
                                                                <Trash2 className="h-3 w-3 md:h-4 md:w-4 text-destructive " />
                                                            </Button>
                                                            <Button type="button" size="sm" variant="outline" className="p-x-1  text-xs h-7"
                                                                onClick={() => handleUploadingImage(getValues("images")[i])}
                                                            >
                                                                <Repeat2 className="h-3 w-3 md:h-4 md:w-4 text-destructive " />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    ) : (null)
                                    }
                                    {getValues("images")[i]?.isCover && (
                                        <div className="bg-primary w-full absolute bottom-4 left-[-25px]  text-background font-bold text-2xs md:text-xs text-center rotate-45 tracking-widest " ><p>COVER</p></div>
                                    )}
                                </div>
                            )
                        } else {

                            return (
                                // <div className="">
                                <Button key={i} type="button" className=" h-full  flex justify-center items-center aspect-square w-full bg-muted hover:bg-muted/50 rounded-lg transform transition duration-300 ease-in-out hover:-translate-y-3 hover:drop-shadow-lg" variant="ghost" onClick={() => { document.getElementById("file-input")?.click() }}>
                                    {imagePlaceHolderIcon}
                                </Button>
                                // </div>

                            )
                        }
                    })}

                </div>

            </div >
        </TooltipProvider>

    )
}
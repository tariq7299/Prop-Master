import * as React from "react";
import ImageUpload from "@/components/custom/image-upload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/custom/date-picker";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/custom/button";
import { CirclePlus, Building2, Image, CalendarClock, Activity, LandPlot, Warehouse, MapPinHouse, ImagePlus } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import useSendRequest from "@/hooks/api/use-send-request";
import { axiosPrivate } from "@/helper/axiosInstances";
import { handleApiError } from "@/helper/api-requests/handleApiError";
import { handleApiSuccess } from "@/helper/api-requests/handleApiSuccess";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

export default function AddNewProject({ handleCloseModal }) {




    // See how to add types to this
    const [contractors, setContractors] = React.useState([{ id: "1", name: "Emaar" }, { id: "2", name: "Amer Group" }, { id: "3", name: "New Address" }, { id: "4", name: "Nawy" }, { id: "5", name: "Madint Masr" }])

    // See how to add types 
    const [destinations, setDestinations] = React.useState([{ id: "1", name: "Alamin" }, { id: "2", name: "fNew Cairo" }, { id: "3", name: "fifth" }, { id: "4", name: "Nasr City" }, { id: "5", name: "Misr Elgededah" }])

    const form = useForm({
        defaultValues: {
            name: "",
            delivery_time: "",
            images: [],
            acres: "",
            status: "active",
            contractors: contractors[0]?.id,
            destination: destinations[0]?.id
        }
    })

    const { handleSubmit, register, control, setValue, resetField, watch, getValues, setError, clearErrors, formState: { dirtyFields } } = form


    // set correct types
    const handleImagesChange = (uploadedImages, onChange) => {

        clearErrors("images")

        const twoMegaBytes = 2097152;
        const existingImages = watch("images")

        const uploadedImagesArray = Array.from(uploadedImages)

        if (uploadedImagesArray.length > 6) {
            setError("images", { type: "maxNumberOfImages", message: `You're attempting to upload ${uploadedImagesArray.length} images, which exceeds our limit of 6. Please reduce your selection to 6 or fewer images.` })
            toast({
                title: "Max number of photos",
                variant: "destructive",
                description: `You're attempting to upload ${uploadedImagesArray.length} images, which exceeds our limit of 6. Please reduce your selection to 6 or fewer images.`
            })
            return
        }

        if (existingImages.length >= 6 || existingImages.length + uploadedImagesArray.length > 6) {
            setError("images", { type: "maxNumberOfImages", message: "You can upload a maximum of 6 images. Please remove some before adding more." })
            toast({
                title: "Max number of photos",
                variant: "destructive",
                description: "You can upload a maximum of 6 images. Please remove some before adding more."
            })
            return
        }

        const oneOfImagesExceedMaxSize = uploadedImagesArray.some(uploadedImage => {
            console.log("uploadedImage.size", uploadedImage.size)
            return uploadedImage.size > twoMegaBytes
        })

        console.log("oneOfImagesExceedMaxSize", oneOfImagesExceedMaxSize)

        if (oneOfImagesExceedMaxSize) {
            // not working ??!??!
            // setError("images", { type: "maxSizeOfImage", message: "Some of the images didn't got upladed as it exceed the maximum size of 2 MB!" })
            toast({
                title: "Max size",
                variant: "destructive",
                description: "Some of the images didn't got upladed as it exceed the maximum size of 2 MB!"
            })
        }

        let newUploadedImages;

        console.log("newUploadedImages", newUploadedImages)

        // First check if existingImages has any images becasue if not just use the uploadedImagesArray directily !
        if (existingImages.length > 0) {

            // Add cover key to each image object in uploadedImagesArray
            // Here i want to mark all of them to be as `false` as there is already existing images and one of them is set to cover image
            newUploadedImages = uploadedImagesArray.map((uploadedImage, index) => {
                uploadedImage["cover"] = false
                return uploadedImage
            })

            // This will filter `uploadedImagesArray` to see if any image inside it has been already uploaded before

            // We did this by filtring "uploadedImagesArray" by checking if any `existingImage.name` in `existingImages` equal to `uploadedImage.name` by using: 
            // `existingImages.some(uploadedImage.name === existingImage.name)` function to each `uploadedImage`.

            // Then if output of `existingImages.some()` is true then convert to `false` by using `!existingImages.some()` 

            // Then that will tell uploadedImagesArray.filter() function to not return the current image ! and move to the next one 

            // Finally return the filtered `uploadedImagesArray` array and `existingImages` array


            newUploadedImages = [...uploadedImagesArray.filter(uploadedImage => !existingImages.some(existingImage => (uploadedImage.name === existingImage.name))), ...existingImages]


        } else {
            // Add cover key to each image object in uploadedImagesArray
            newUploadedImages = uploadedImagesArray.map((uploadedImage, index) => {
                // If the it is the first image in the array then mark it as a cover image
                if (index === 0) {
                    uploadedImage["cover"] = true
                    return uploadedImage
                } else {
                    // If not then it is not a cover image
                    uploadedImage["cover"] = false
                    return uploadedImage
                }
            })

            newUploadedImages = [...uploadedImagesArray]
        }


        // Then test the max size of each image and only include > 2mb image from the uploadedImages
        newUploadedImages = [...newUploadedImages.filter(uploadedImage => uploadedImage.size <= twoMegaBytes)]

        console.log("newUploadedImages", newUploadedImages)
        onChange(newUploadedImages)

    }


    // console.log(uploadedImages?.map(img => URL.createObjectURL(img)))

    // const {resData, isLoading, sendRequest} = useSendRequest();

    // React.useEffect(() => {

    //     const getAllContractors = async () => {

    //         try {

    //             const contractorsRes = await axiosPrivate("/client/contract-company")

    //             handleApiSuccess(contractorsRes?.data, false, '', () => {
    //                 console.log("contractorsRes?.data", contractorsRes?.data)
    //                 // setContractors()
    //             })



    //         } catch (error) {
    //             if (axios.isAxiosError(error) || error instanceof Error) {
    //                 handleApiError(error)

    //             }

    //         }
    //     }

    //     const getAllDestinations = async () => {

    //         try {

    //             const destinationsRes = await axiosPrivate("/client/destination")

    //             handleApiSuccess(destinationsRes?.data, false, '', () => {
    //                 console.log("destinationsRes?.data", destinationsRes?.data)
    //                 // setContractors()
    //             })



    //         } catch (error) {
    //             if (axios.isAxiosError(error) || error instanceof Error) {
    //                 handleApiError(error)

    //             }

    //         }
    //     }

    //     getAllContractors()

    //     getAllDestinations()


    // }, [])

    const onSubmit = (data) => {
        console.log("dataa", data)
    }

    return (
        <>



            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="overflow-y-auto">

                    {/* Modal Body  */}
                    <div className=" py-6 p-1 pb-28 md:p-6 md:pb-14 grid grid-cols-1 md:grid-cols-2 gap-y-10 md:items-center justify-items-center gap-x-10 ">
                        {/* <div className="overflow-y-auto py-6 flex flex-col gap-y-10 items-start md:items-center"> */}
                        {/* <h2 className="text-2xl font-medium tracking-tight">New Project</h2> */}

                        <div className="space-y-2 w-full max-w-sm">
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem className='space-y-1'>
                                        <div className="flex items-center space-x-2">
                                            <FormLabel>Project Name</FormLabel> <Building2 className="h-5 w-5 text-secondary" />
                                        </div>
                                        <FormControl>
                                            <Input placeholder="Madinatiy..." type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* <div className="flex items-center space-x-2"><Label className="text-md font-medium ">Project Name</Label> <Building2 className="h-5 w-5 text-secondary" /></div>
                            <Input className=" " name="name" type="text"></Input> */}
                        </div>

                        <div className="space-y-2 w-full max-w-sm">

                            <FormField
                                control={form.control}
                                name='delivery_time'
                                render={({ field }) => (
                                    <FormItem className='space-y-1'>
                                        <div className="flex items-center space-x-2">
                                            <FormLabel>Delivery Time</FormLabel> <CalendarClock className="h-5 w-5 text-secondary" />
                                        </div>
                                        <FormControl>
                                            <DatePicker onChange={field.onChange} value={field.value} ></DatePicker>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        </div>



                        <div className="md:col-span-2">

                            <FormField
                                control={form.control}
                                name='images'
                                render={({ field }) => (
                                    <FormItem className='space-y-1  '>
                                        <FormControl>
                                            <ImageUpload
                                                // form={form}
                                                handleImagesChange={handleImagesChange}
                                                field={field}
                                                // images={images}
                                                watch={watch}
                                                getValues={getValues}
                                                // uploadedImages={uploadedImages}
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

                            {/* <ImageUpload
    title={"Upload Project Images"}
    description={"Drag and drop your images here or click the button to select files."}
    imagePlaceHolderText={"Drag and drop your images here"}
    titleIcon={(<Image className="h-5 w-5 text-secondary" />)}
    imagePlaceHolderIcon={(<ImagePlus className="w-6 h-6 text-muted-foreground" />)}
/> */}
                        </div>

                        <div className="space-y-2 w-full max-w-sm">
                            <FormField
                                control={form.control}
                                name='status'
                                render={({ field }) => (
                                    <FormItem className='space-y-1'>
                                        <div className="flex items-center space-x-2"> <FormLabel>Status</FormLabel><Activity className="h-5 w-5 text-secondary" />
                                        </div>
                                        <FormControl>
                                            <Select
                                                value={field?.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className="w-full" >
                                                    <SelectValue placeholder="Choose project status">
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Choose Status</SelectLabel>
                                                        <SelectItem value="active" >Active</SelectItem>
                                                        <SelectItem value="not-active" >Not active</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2 w-full max-w-sm">
                            <FormField
                                control={form.control}
                                name='acres'
                                render={({ field }) => (
                                    <FormItem className='space-y-1'>
                                        <div className="flex items-center space-x-2"> <FormLabel>Number of Acres</FormLabel><LandPlot className="h-5 w-5 text-secondary" />
                                        </div>
                                        <FormControl>
                                            <Input {...field} type="number"></Input>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2 w-full max-w-sm">
                            <FormField
                                control={form.control}
                                name='contractors'
                                render={({ field }) => (
                                    <FormItem className='space-y-1'>
                                        <div className="flex items-center space-x-2"> <FormLabel>Contractor Company</FormLabel><Warehouse className="h-5 w-5 text-secondary" />
                                        </div>
                                        <FormControl>
                                            <div className="flex justify-center items-center gap-2 ">
                                                <Select
                                                    value={field?.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className="grow">
                                                        <SelectValue placeholder="Choose Contractor">
                                                        </SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Conractor Company</SelectLabel>
                                                            {contractors.map((contractor) => {
                                                                return (
                                                                    <SelectItem key={contractor.id} value={contractor.id} >{contractor.name}</SelectItem>
                                                                )
                                                            })}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <Button className="bg-foreground text-background space-x-1 text-nowrap  flex-none " size="sm"><CirclePlus className="h-4 w-4" /><span className="sr-only md:not-sr-only text-nowrap  ">New</span></Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className="space-y-2 w-full max-w-sm">

                            <FormField
                                control={form.control}
                                name='destination'
                                render={({ field }) => (
                                    <FormItem className='space-y-1'>
                                        <div className="flex items-center space-x-2">
                                            <FormLabel>Destination</FormLabel><Warehouse className="h-5 w-5 text-secondary" />
                                        </div>
                                        <FormControl>
                                            <Select
                                                value={field?.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Choose Contractor">
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Destination</SelectLabel>
                                                        {destinations.map((destination) => {
                                                            return (
                                                                <SelectItem key={destination.id} value={destination.id} >{destination.name}</SelectItem>
                                                            )
                                                        })}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div >

                    {/* Modal Footer */}
                    <div className="fixed bottom-0 right-0 p-4 pt-3 bg-background w-full flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-y-2 ">
                        <Button type="submit" >Add Project</Button>
                        <Button type="button" onClick={handleCloseModal} variant="outline">Cancel</Button>
                    </div>
                </form>
            </Form >
        </>
    )
}
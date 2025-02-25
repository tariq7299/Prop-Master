import * as React from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/custom/button";
import { X, Contact, Mail, Phone, ImagePlus, MapPinCheck, Images } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from '@/components/ui/form';
import { axiosPrivate } from "@/helper/api/axiosInstances";
import { handleApiError } from "@/helper/api/handleApiError";
import { handleApiSuccess } from "@/helper/api/handleApiSuccess";
import axios from "axios";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Combobox } from "@/components/custom/combobox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"

type ValidImageTypes = {
    jpg: string;
    jpeg: string;
    png: string;
};

// Write types
const DeveloperDetailsForm = () => {

    const validImageTypes = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
    };

    const maxImageSize = 2097152; // Two Mega bytes



    const validateMaxImageSize = (selectedImage: File, maxSize: number) => {

        const oneOfImagesExceedMaxSize = selectedImage.size > maxSize

        if (oneOfImagesExceedMaxSize) {
            toast.warning("Max size", {
                description: "Some of the images didn't got upladed as it exceed the maximum size of 2 MB!"
            })
            return null
        } else {
            return selectedImage
        }

    }

    const validateImageType = (selectedImage: File, validImageTypes: string[]) => {

        const isImageHasInvalidType = !Object.values(validImageTypes).includes(selectedImage.type)

        // Change the error message to be more descriptive
        if (isImageHasInvalidType) {
            toast.warning("Invalid type", {
                description: "Some of the images didn't got upladed as has an invalid image type!, Valid types are [.png, .jpg, .jpeg]",
            })

            return null
        } else {

            return selectedImage
        }
    }


    // Write types
    const form = useForm()

    const { control, getValues, setValues, watch, clearErrors } = form;

    console.log("watch", watch())


    const handleImageChange = (selectedImage, onChange) => {
        console.log("selectedImage", selectedImage)

        if (selectedImage) {
            clearErrors("logo")

            // Validation
            // Validate and return filtered array with correct values/images !
            selectedImage = validateImageType(selectedImage, Object.values(validImageTypes))
            selectedImage = validateMaxImageSize(selectedImage, maxImageSize)

            onChange(selectedImage)
        }
    }

    const handleDeletingImage = () => {

        const imageToRemove = form.getValues("logo")

        if (imageToRemove) {
            // if (imageToRemove?.id) {
            //     setConfirmationAlertStatus({ isOpen: true, itemToRemove: imageToRemove })
            // } else {
            //     removeImageFromUi(imageToRemove)
            // }

            form.setValue("logo", null)

        }
    }


    const handleDroppingImages = (droppedImages: FileList, onChange) => {

        console.log("droppedImages", droppedImages)
        handleImageChange(droppedImages, onChange)
    }


    return (
        <Form {...form}>
            <form className="py-6 p-1 pb-28 lg:py-11 lg:px-14 lg:pb-14 h-full  grid grid-cols-[minmax(200px,_300px)] lg:grid-cols-[minmax(200px,_385px)_minmax(200px,_385px)] gap-y-10 gap-x-8 justify-center lg:justify-between ">

                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem className='space-y-1'>
                            <div className="flex items-center space-x-2">
                                <FormLabel className="font-medium">Developer Name</FormLabel> <Contact className="h-5 w-5 text-secondary" />
                            </div>
                            <FormControl>
                                <Input placeholder="Amer Group..." type="text" {...field} />
                            </FormControl>
                            <FormDescription>
                                Type the name of the developer
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem className='space-y-1'>
                            <div className="flex items-center space-x-2">
                                <FormLabel className="font-medium">Developer Email</FormLabel> <Mail className="h-5 w-5 text-secondary" />
                            </div>
                            <FormControl>
                                <Input placeholder="developer@gmail.com..." type="text" {...field} />
                            </FormControl>
                            <FormDescription>
                                Type the email of the developer
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='phone_number'
                    render={({ field }) => (
                        <FormItem className='space-y-1'>
                            <div className="flex items-center space-x-2">
                                <FormLabel className="font-medium">Developer Phone number</FormLabel> <Phone className="h-5 w-5 text-secondary" />
                            </div>
                            <FormControl>
                                <Input placeholder="01098567583..." type="text" {...field} />
                            </FormControl>
                            <FormDescription>
                                Type the developer phone number
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                        <FormItem className='space-y-1'>
                            <div className="flex items-center space-x-2">
                                <FormLabel className="font-medium">Developer Address</FormLabel> <MapPinCheck className="h-5 w-5 text-secondary" />
                            </div>
                            <FormControl>
                                <Input placeholder="23 Orchid street..." type="text" {...field} />
                            </FormControl>
                            <FormDescription>
                                Type the developer address
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-1">

                    <div className="flex items-center space-x-2">
                        <Label className="text-sm leading-none  font-medium">Developer Logo</Label> <Images className="h-5 w-5 text-secondary" />
                    </div>


                    <div className="  border rounded border-muted-foreground/40 border-dashed aspect-[6/3] max-w-40 relative flex  justify-center items-center w-full group" >
                        {getValues("logo") ?
                            <div className="p-1 max-w-40 h-full ">
                                <img src={URL.createObjectURL(getValues("logo"))} alt="logo" className="object-contain w-full h-full" />

                                <Button type="button" size="sm" variant="outline" className="absolute top-2 right-2 w-max h-max p-1 block md:hidden group-hover:block"
                                    onClick={() => handleDeletingImage()}
                                >
                                    <X className="h-3 w-3 md:h-4 md:w-4 text-destructive " />

                                </Button>
                            </div>
                            : (
                                <FormField
                                    control={form.control}
                                    name='logo'
                                    render={({ field }) => (
                                        <FormItem className='space-y-1 ' onDrop={(e) => { e.preventDefault(); handleDroppingImages(e.dataTransfer.files[0], field.onChange) }} onDragOver={(event) => event.preventDefault()}>
                                            <FormControl>
                                                <label className=" flex flex-col gap-2   items-center justify-center hover:cursor-pointer hover:bg-muted/50 p-2 py-3" htmlFor="file-input" >
                                                    <ImagePlus className="w-6 h-6 text-muted-foreground" />
                                                    <p className="text-muted-foreground text-xs text-center">Select or Drag and drop Developer Logo</p>
                                                    <Input
                                                        {...field}
                                                        value={field.value?.fileName}
                                                        // oChange
                                                        onChange={(e) => {
                                                            console.log("e.target.files", e.target.files)
                                                            handleImageChange(e.target.files[0], field.onChange)
                                                        }}

                                                        id="file-input"
                                                        type="file"

                                                        className="hidden"
                                                        accept="image/png, image/jpg, image/jpeg" />
                                                </label>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}


                    </div>


                    <p className="text-[0.8rem] text-muted-foreground"> Upload your company logo in PNG or JPG format. Recommended size: 200x200 pixels or larger.</p>

                </div>







                {/* Modal Footer */}
                <div className="fixed bottom-0 right-0 p-2 pt-3 bg-background w-full flex  justify-end sm:space-x-2 gap-2 ">
                    {/* <Button type="submit" >Update Project</Button> */}
                    <Button disabled={!form.formState.isDirty} type="submit" >Add Developer</Button>
                    <Button type="button" variant="outline">Cancel</Button>
                    {/* <Button loading={isSubmittingProject} disabled={isSubmittingProject || !form.formState.isDirty} type="submit" >{formType === "add" ? "Add Project" : "Update Project"}</Button>
                                        <Button type="button" onClick={handleCloseModal} variant="outline">Cancel</Button> */}
                </div>


            </form>


        </Form>
    )
}


export { DeveloperDetailsForm }; 
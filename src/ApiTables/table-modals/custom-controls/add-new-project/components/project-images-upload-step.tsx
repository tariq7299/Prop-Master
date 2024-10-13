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
import { useForm, useFormContext } from "react-hook-form";
import { Button } from "@/components/custom/button";
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
import { axiosPrivate } from "@/helper/api/axiosInstances";
import { handleApiError } from "@/helper/api/handleApiError";
import { handleApiSuccess } from "@/helper/api/handleApiSuccess";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDateToMMYYYY } from '@/helper/utils/dateUtils';
import { Separator } from '@/components/ui/separator';
import { defineStepper } from '@stepperize/react';



// Write types
export default function ProjectImagesUploadStep({ newProject, handleCloseModal }: any) {

    const form = useForm<any>({
        defaultValues: {
            images: [],
        }
    })

    console.log("newProject", newProject)
    const onSubmit = (data: any) => {

        console.log("data", data)

    }


    // Those will be used later with upload image component
    const maxImagesSlots = 6;
    const maxImageSize = 2097152; // Two Mega bytes


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="overflow-y-auto">

                {/* Modal Body  */}
                <div className=" py-6 p-1 pb-28 md:p-6 md:pb-14 grid grid-cols-1 md:grid-cols-2 gap-y-10 md:items-center justify-items-center gap-x-10 ">
                    {/* <div className="overflow-y-auto py-6 flex flex-col gap-y-10 items-start md:items-center"> */}
                    {/* <h2 className="text-2xl font-medium tracking-tight">New Project</h2> */}




                    <div className="md:col-span-2">

                        <FormField
                            control={form.control}
                            name='images'
                            render={({ field }) => (
                                <FormItem className='space-y-1  '>
                                    <FormControl>
                                        <ImageUpload
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
                <div className="fixed bottom-0 right-0 p-4 pt-3 bg-background w-full flex  justify-end sm:space-x-2 gap-2 ">
                    <Button type="submit" >Add Project Images</Button>
                    <Button type="button" onClick={handleCloseModal} variant="outline">Cancel</Button>
                </div>
            </form>
        </Form >

    )
}
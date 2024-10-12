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
// import { defineStepper } from '@stepperize/react';





const newProjectSchema = z
    .object({
        name: z
            .string()
            .min(1, { message: "Please enter a name for the project" })
            .min(5, { message: "Project name must be at least 5 characters" })
            .max(90, { message: "Project name must't exceed 90 characters long" }),
        delivery_time: z
            .date()
            .min(new Date(), { message: "Delivery date can't be in the past" }),
        // images: z
        //     .any(),
        acres: z
            // THis has to be added if want the field value to be parsed and submitted as Number
            .coerce
            .number()
            .positive()
            .gte(1, { message: "Acres should at least be 1" })
            .lte(1000, { message: "Acres should not exceed 1000" }),
        contractor_company: z
            .string(),
        destination_id: z
            .string(),
        status: z
            .string(),
    })

type NewProjectSchema = z.infer<typeof newProjectSchema>


export default function ProjectDetailsStep({ handleCloseModal }: any) {

    // const stepper = useStepper();

    // See how to add types to this
    const [contractors, setContractors] = React.useState([{ id: "1", name: "Emaar" }, { id: "2", name: "Amer Group" }, { id: "3", name: "New Address" }, { id: "4", name: "Nawy" }, { id: "5", name: "Madint Masr" }])

    // See how to add types 
    const [destinations, setDestinations] = React.useState([{ id: "1", name: "Alamin" }, { id: "2", name: "fNew Cairo" }, { id: "3", name: "fifth" }, { id: "4", name: "Nasr City" }, { id: "5", name: "Misr Elgededah" }])

    // Those will be used later with upload image component
    const maxImagesSlots = 6;
    const maxImageSize = 2097152; // Two Mega bytes

    const form = useForm<NewProjectSchema>({
        resolver: zodResolver(newProjectSchema),
        defaultValues: {
            name: "",
            delivery_time: new Date(),
            // images: [],
            acres: 0,
            status: "active",
            contractor_company: contractors[0]?.id,
            destination_id: destinations[0]?.id
        }
    })

    // const { handleSubmit, register, control, setValue, resetField, watch, getValues, setError, clearErrors, formState: { dirtyFields } } = form



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



    const onSubmit = (data: NewProjectSchema) => {

        const formatedData = { ...data, delivery_time: formatDateToMMYYYY(data.delivery_time) }
        console.log("formatedData", formatedData)
        // Formate the date to "MM-YYYY" before submitting

    }

    return (
        <>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">

                    {/* Modal Body  */}
                    <div className=" py-6 p-1 pb-28 md:p-6 md:pb-14 grid grid-cols-1 md:grid-cols-2 gap-y-10 md:items-center justify-items-center gap-x-10 ">
                        {/* <div className=" py-6 flex flex-col gap-y-10 items-start md:items-center"> */}
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
                                name='contractor_company'
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
                                name='destination_id'
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
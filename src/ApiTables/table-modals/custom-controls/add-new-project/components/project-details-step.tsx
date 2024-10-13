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
import { CirclePlus, Building2, Image, CalendarClock, Activity, LandPlot, Warehouse, BriefcaseBusiness, MapPinHouse, ImagePlus } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
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
import { Combobox } from "@/components/custom/combobox";






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
        contractor_company_id: z
            .coerce
            .number(),
        // .promise(z.coerce.number()),
        destination_id: z
            .coerce
            .number(),
        // .promise(z.coerce.number()),
        status: z
            .string(),
    })

type NewProjectSchema = z.infer<typeof newProjectSchema>


export default function ProjectDetailsStep({ handleCloseModal, addNewProject, isSubmittingNewProject, newProject, stepper }: any) {


    // const stepper = useStepper();



    console.log("newProject", newProject)

    // See how to add types to this
    const [contractors, setContractors] = React.useState<{ id: number, name: string }[]>([])

    // See how to add types 
    const [destinations, setDestinations] = React.useState<{ id: number, name: string }[]>([])

    const getAllContractors = async () => {

        try {

            const contractorsRes = await axiosPrivate("/client/contract-company/get-all")

            handleApiSuccess(contractorsRes?.data, false, '', () => {
                console.log("contractorsRes?.data", contractorsRes?.data)
                setContractors(contractorsRes?.data?.data)
            })

            return contractorsRes?.data?.data

        } catch (error) {
            if (axios.isAxiosError(error) || error instanceof Error) {
                handleApiError(error)

            }

        }
    }

    const getAllDestinations = async () => {

        try {

            const destinationsRes = await axiosPrivate("/client/destination/get-all")

            handleApiSuccess(destinationsRes?.data, false, '', () => {
                console.log("destinationsRes?.data", destinationsRes?.data)
                setDestinations(destinationsRes?.data?.data)
            })

            return destinationsRes?.data?.data



        } catch (error) {
            if (axios.isAxiosError(error) || error instanceof Error) {
                handleApiError(error)

            }

        }
    }

    const defaultValues: NewProjectSchema = {
        name: "",
        delivery_time: new Date(),
        acres: 0,
        status: "active",
        contractor_company_id: async () => {
            const contractors = await getAllContractors();
            return contractors[0]?.id || 1;
        },
        destination_id: async () => {
            const destinations = await getAllDestinations();
            return destinations[0]?.id || 1;
        }
    };
    const form = useForm<NewProjectSchema>({
        resolver: zodResolver(newProjectSchema),
        defaultValues: {
            ...defaultValues,
            contractor_company_id: contractors[0]?.id || 1,
            destination_id: destinations[0]?.id || 1,
        }
    })




    console.log("form.watch()", form.watch())


    React.useEffect(() => {
        getAllContractors()
        getAllDestinations()
    }, [])



    const onSubmit = (data: NewProjectSchema) => {

        const formatedData = { ...data, delivery_time: formatDateToMMYYYY(data.delivery_time) }

        console.log("formatedData", formatedData)
        const reqOptions = { method: "POST", url: "/admin/projects", data: formatedData }
        const apiResFuncArgs = {
            successCallback: (res: any) => {
                stepper.next()
            }
        }
        const fullPageLoader = { isLoading: true, loadingMsg: "Saving Project...", loadingIconName: "3dLoader" }
        addNewProject({ reqOptions, fullPageLoader, apiResFuncArgs })



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
                                        <FormDescription>
                                            Type the name of compound or project in here
                                        </FormDescription>
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
                                        <FormDescription>
                                            Type when the project will be deliverd
                                        </FormDescription>
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
                                        <FormDescription>
                                            Choose the status of the project
                                        </FormDescription>
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
                                        <FormDescription>
                                            Area of the project
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2 w-full max-w-sm">
                            <FormField
                                control={form.control}
                                name='contractor_company_id'
                                render={({ field }) => (
                                    <FormItem className='space-y-1'>
                                        <div className="flex items-center space-x-2"> <FormLabel>Contractor Company</FormLabel><BriefcaseBusiness className="h-5 w-5 text-secondary" />
                                        </div>
                                        <FormControl>
                                            <div className="flex justify-center items-center gap-2 ">
                                                <Combobox className="w-full" values={contractors} field={field}></Combobox>
                                                <Button className="bg-foreground text-background space-x-1 text-nowrap  flex-none " size="sm"><CirclePlus className="h-4 w-4" /><span className="sr-only md:not-sr-only text-nowrap  ">New</span></Button>
                                            </div>
                                            {/* <Select
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
                                            </div> */}
                                        </FormControl>
                                        <FormDescription>
                                            Choose the developer of the project
                                        </FormDescription>
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
                                            <FormLabel>Destination</FormLabel><MapPinHouse className="h-5 w-5 text-secondary" />
                                        </div>
                                        <FormControl>
                                            <Combobox className="w-full" values={destinations} field={field}></Combobox>
                                            {/* <Select
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
                                            </Select> */}
                                        </FormControl>
                                        <FormDescription>
                                            Choose the place where the project exist
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div >

                    {/* Modal Footer */}
                    <div className="fixed bottom-0 right-0 p-4 pt-3 bg-background w-full flex  justify-end sm:space-x-2 gap-2 ">
                        <Button loading={isSubmittingNewProject} disabled={isSubmittingNewProject || !form.formState.isDirty} type="submit" >Add Project</Button>
                        <Button type="button" onClick={handleCloseModal} variant="outline">Cancel</Button>
                    </div>
                </form>
            </Form >
        </>
    )
}
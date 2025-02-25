import * as React from "react";
import { Input } from "@/components/ui/input";
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
import { Button } from "@/components/custom/button";
import { Building2, Activity, LandPlot, BriefcaseBusiness, MapPinHouse } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from '@/components/ui/form'
import { axiosPrivate } from "@/helper/api/axiosInstances";
import { handleApiError } from "@/helper/api/handleApiError";
import { handleApiSuccess } from "@/helper/api/handleApiSuccess";
import axios from "axios";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Combobox } from "@/components/custom/combobox";
import { projectStatuses } from "../data/project-statuses";
import { RowActionPostHandlerArgs } from "@/ApiTables/types/table-actions";

const projectSchema = z
    .object({
        name: z
            .string()
            .min(1, { message: "Please enter a name for the project" })
            .min(5, { message: "Project name must be at least 5 characters" })
            .max(90, { message: "Project name must't exceed 90 characters long" }),
        // delivery_time: z
        //     .date()
        //     .refine((date) => date > new Date(), { message: "Delivery time can't be in the past" }),
        // images: z
        //     .any(),
        acres: z
            // This has to be added if we want the field value to be parsed and submitted as Number
            .coerce
            .number()
            .positive({ message: "Acres Should be greater than 1" })
            .gte(1, { message: "Acres should at least be 1" })
            .lte(1000, { message: "Acres should not exceed 1000" }),
        contractor_company_id: z.nullable(z.coerce
            .number()
        ).refine((value) => value !== null, { message: "You a have to choose a contractor" }),
        // .promise(z.coerce.number()),
        destination_id: z.nullable(z.coerce
            .number()
        ).refine((value) => value !== null, { message: "You a have to choose a destination" }),

        // .promise(z.coerce.number()),
        status: z
            .string(),
    })

type ProjectSchema = z.infer<typeof projectSchema>

// Write types
export default function ProjectDetailsForm({ action, handleCloseModal, handleSubmittingProject, isSubmittingProject, stepper, formType, loadingModalData }: any) {

    // I am checking if 'action is null' because I want the laoding to only appear when user opens up the modal and not when closing or submitting !!! so i a have to check for both (rowActionPostLoading and action === null)
    if (loadingModalData && !action) {
        return (
            <div className="min-h-16 flex flex-col justify-center items-center pb-9">
                <h1 className="mb-4 text-xl font-bold">Loading project...</h1>
                <div className="loader--3" />
            </div>
        )
    }

    const [contractors, setContractors] = React.useState<{ id: number, name: string }[]>([])

    const [destinations, setDestinations] = React.useState<{ id: number, name: string }[]>([])

    const getAllContractors = async () => {

        try {

            const contractorsRes = await axiosPrivate("/client/contract-company/get-all")

            handleApiSuccess(contractorsRes?.data, false, '', () => {
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
                setDestinations(destinationsRes?.data?.data)
            })

            return destinationsRes?.data?.data



        } catch (error) {
            if (axios.isAxiosError(error) || error instanceof Error) {
                handleApiError(error)

            }

        }
    }

    const defaultValues: ProjectSchema = {
        name: "",
        // delivery_time: new Date(),
        acres: 0,
        status: "active",
        contractor_company_id: null,
        destination_id: null
    };

    const form = useForm<ProjectSchema>({
        resolver: zodResolver(projectSchema),
        defaultValues,
        values: action?.payload?.project
        // defaultValues: {
        //     ...defaultValues,
        //     contractor_company_id: contractors[0]?.id || 1,
        //     destination_id: destinations[0]?.id || 1,
        // }
    })

    console.log("form.watch()", form.watch())

    React.useEffect(() => {
        getAllContractors()
        getAllDestinations()
    }, [])

    const onSubmit = (data: ProjectSchema) => {

        console.log("data", data)
        console.log("action", action)
        console.log("formType", formType)

        if (formType === "add") {

            const reqOptions = { method: "POST", url: "/admin/projects", data: data }
            const apiResFuncArgs = {
                successCallback: () => {
                    stepper && stepper.next()
                }
            }
            const fullPageLoader = { isLoading: true, loadingMsg: "Saving Project...", loadingIconName: "loader--1" }

            handleSubmittingProject({ reqOptions, fullPageLoader, apiResFuncArgs })

        } else if (formType === "update") {

            const RowActionPostHandlerArgs: Partial<RowActionPostHandlerArgs> = { method: action.method, url: action.url.web, payload: data, action: action, showToast: true, affectModalOpeningClosing: true }
            handleSubmittingProject && handleSubmittingProject(RowActionPostHandlerArgs)

        }

    }


    return (
        <>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">

                    {/* Modal Body  */}
                    <div className=" py-6 p-1 pb-28 lg:p-6 lg:pb-14 grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:content-center justify-items-center gap-x-10 h-full   ">

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
                                            Type the name of compound or project
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
                                                        {projectStatuses?.map((status) => { return (<SelectItem key={status.value} value={status.value} >{status.label}</SelectItem>) })}
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
                                                <Combobox inputPlaceholder="Select a company..." searchPlaceholder="Search company..." className="w-full" values={contractors} field={field}></Combobox>
                                            </div>
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
                                            <Combobox inputPlaceholder="Select a destination..." searchPlaceholder="Search destination..." className="w-full" values={destinations} field={field}></Combobox>
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
                    <div className="fixed bottom-0 right-0 p-2 pt-3 bg-background w-full flex  justify-end sm:space-x-2 gap-2 ">
                        {/* <Button type="submit" >Update Project</Button> */}
                        <Button loading={isSubmittingProject} disabled={isSubmittingProject || !form.formState.isDirty} type="submit" >{formType === "add" ? "Add Project" : "Update Project"}</Button>
                        <Button type="button" onClick={handleCloseModal} variant="outline">Cancel</Button>
                    </div>
                </form>
            </Form >
        </>
    )
}
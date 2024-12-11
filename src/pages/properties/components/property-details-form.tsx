import { useTableRowActions } from "@/ApiTables/table-providers/row-actions-provider";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { useForm, useFieldArray } from 'react-hook-form'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Combobox } from "@/components/custom/combobox";
import { Label } from "@/components/ui/label";
import { RadioItem } from "@/components/custom/radio-item";
import { CirclePlus } from 'lucide-react';
import { useMemo, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { axiosPrivate } from "@/helper/api/axiosInstances";
import { handleApiSuccess } from "@/helper/api/handleApiSuccess";
import { handleApiError } from "@/helper/api/handleApiError";
import { Separator } from "@/components/ui/separator";
import { NotebookPen, ListPlus, CirclePercent, Trash2 } from 'lucide-react';
import { RowActionPostHandlerArgs } from "@/ApiTables/types/table-actions";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { FullPageLoader } from "@/hooks/app/types";
import { typeOfUnit, noRooms, frequencies, durations, currencies } from "../data/property";


type PropertyDetailsFormProps = {
    handleCloseModal: () => void
}

// Write types
const PropertyDetailsForm = ({ handleCloseModal }: PropertyDetailsFormProps) => {

    const [parent] = useAutoAnimate()


    // When I try to add .nullable() to supress the type errors below in this file, it then corrupts/miss my
    const newPropertyShcema = z
        .object({
            project_id:
                // z.coerce.number().gte(1, { message: "Please choose a project" }).nullable(),
                z.coerce.number().gte(1, { message: "Please a choose a project" }),
            // z.number().gte(1, { message: "Please a choose a quarter" }).transform(value => Number(value)),
            delivery_year: z.coerce.number().gte(1, { message: "Please choose a year" }),
            delivery_quarter: z.string().min(1, { message: "Please a choose a quarter" }).transform(value => Number(value.replace('Q', ''))),
            features: z
                .object({
                    TypeOfUnit: z
                        .string()
                        .min(1, { message: "Please a choose a type" }),
                    NoRooms: z
                        .coerce
                        .number().gte(1, { message: "Please choose a the number of rooms" }),
                    Area: z
                        .coerce
                        .number()
                        .gte(3, { message: "Area should at least be 3" })
                        .lte(1000, { message: "Area should not exceed 1000" }),
                    price_from:
                        z
                            .coerce
                            .number()
                            .gte(1, { message: "Please type a correct price" }),
                    price_to: z
                        .coerce
                        .number()
                        .gte(1, { message: "Please type a correct price" }),
                }).refine((data) => data.price_from <= data.price_to,
                    {
                        message: "Price 'from' must be less than or equal to 'to'",
                        path: ['price_from'],
                    })
            ,
            "installment_details": z.array(z.object(
                {
                    "down_payment_from": z.coerce
                        .number().gte(1, { message: "Please type a correct down payment" }),
                    "down_payment_to": z.coerce
                        .number().gte(1, { message: "Please type a correct down payment" }),
                    "amount_from": z.coerce
                        .number().gte(1, { message: "Please type a correct amount" }),
                    "amount_to": z.coerce.number().gte(1, { message: "Please type a correct amount" }),
                    "currency": z.string().min(1, { message: "Please choose a currency" }),
                    "freq": z.coerce
                        .number().gte(1, { message: "Please choose a payment frquency" }),
                    "duration": z.coerce
                        .number().gte(1, { message: "Please choose duration" }),
                    "is_default": z.boolean()
                }
            )
                .refine(
                    (data) => data.down_payment_from <= data.down_payment_to,
                    {
                        message: "Down payment 'from' must be less than or equal to 'to'",
                        path: ["down_payment_from"]
                    }
                )
                .refine(
                    (data) => data.amount_from <= data.amount_to,
                    {
                        message: "Amount 'from' must be less than or equal to 'to'",
                        path: ["amount_from"]
                    }
                )
            )

        })


    type NewPropertyShcema = z.infer<typeof newPropertyShcema>

    const [allProjects, setAllProjects] = useState([])


    const { clickedRowAction, rowActionsPostHandler } = useTableRowActions()




    const form = useForm<NewPropertyShcema>({
        resolver: zodResolver(newPropertyShcema),
        defaultValues: setFormDefaultValues,
        shouldUnregister: true
    })

    const { setValue, watch, getValues, handleSubmit, formState: { isLoading, isDirty, isSubmitting }, control, } = form
    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormProvider)
        name: "installment_details", // unique name for your Field Array
    });

    async function setFormDefaultValues(): Promise<NewPropertyShcema> {

        const allProjects = await getAllProjects()

        return {
            // project_id: allProjects.length > 0 ? allProjects[0].id : "",
            project_id: "",
            delivery_year: "",
            delivery_quarter: "",
            features:
            {
                "TypeOfUnit": "",
                "NoRooms": "",
                "Area": 0,
                "price_from": 0,
                "price_to": 0,
            }
            ,
            "installment_details": [
                {
                    "down_payment_from": 0,
                    "down_payment_to": 0,
                    "amount_from": 0,
                    "amount_to": 0,
                    "currency": "",
                    "freq": "",
                    "duration": "",
                    "is_default": true
                }
            ]

        }
    }

    async function getAllProjects(): Promise<{ id: string, name: string }[] | []> {
        try {
            const response = await axiosPrivate("/client/projects/get-all")
            handleApiSuccess(response?.data, false, "", () => {
                setAllProjects(response.data.data)
            })
            return response?.data?.data || []
        } catch (error) {
            if (axios.isAxiosError(error) || error instanceof Error) {
                handleApiError(error, "")
            } else {
                console.error(error)
            }
            return []
        }

    }



    function getQuarter(date?: Date): number {
        date = date || new Date();
        const quarter = Math.ceil((date.getMonth() + 1) / 3);
        return quarter;
    }

    const currentYear = new Date().getFullYear()

    const deliveryYearsOptions = useMemo(() => {
        const deliveryYears = new Array()
        const maxYearsForDelivery = 5
        for (let i = 0; i <= maxYearsForDelivery; i++) {
            deliveryYears.push({ id: `${currentYear + i}`, name: currentYear + i })
        }
        return deliveryYears
    }, [])


    // Write comments
    const quartersOptions = useMemo(() => {
        let quartersOptions = []
        const selectedYear = Number(getValues("delivery_year"))
        if (currentYear === selectedYear) {
            const currentQuarter = getQuarter()
            const quartersLeftInYear = 4 - currentQuarter + 1
            for (let i = 1; i <= quartersLeftInYear; i++) {
                quartersOptions.push({ id: `Q${5 - i}`, name: `Q${5 - i}` })
            }
        } else {
            for (let i = 1; i <= 4; i++) {
                quartersOptions.push({ id: `Q${i}`, name: `Q${i}` })
            }
        }
        setValue(`delivery_quarter`, "")
        return quartersOptions?.sort((a, b) => Number(a?.id?.replace('Q', '')) - Number(b?.id?.replace('Q', '')))
    }, [watch("delivery_year")])


    const onSubmit = (data: NewPropertyShcema) => {

        const fullPageLoader: FullPageLoader = { isLoading: true, loadingMsg: "Saving Property..." }

        const rowActionsHandlerArgs: Partial<RowActionPostHandlerArgs> = {
            method: clickedRowAction.method,
            url: clickedRowAction.action.web,
            payload: data,
            action: clickedRowAction,
            showToast: true,
            fullPageLoader
        }
        rowActionsPostHandler(rowActionsHandlerArgs)

    }

    if (isLoading) {
        return (
            <div className="min-h-16 flex flex-col justify-center items-center pb-9">
                <h1 className="mb-4 text-xl font-bold">Loading...</h1>
                <div className="loader--3" />
            </div>
        )
    }


    return (
        <div className="overflow-y-auto space-y-5 h-full">

            <Form {...form}>

                <form onSubmit={handleSubmit(onSubmit)} className="h-full">

                    <div className='space-y-11 py-6 p-1 pb-28 lg:p-6 lg:pb-14  h-full grid justify-items-stretch lg:content-center justify-center '>

                        <div className="space-y-4 max-w-sm xl:max-w-full ">
                            <div className="flex items-center space-x-2">
                                <h1 className="text-lg font-bold ">Project and delivery date</h1> <NotebookPen className="h-6 w-6 text-secondary" />
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-3 gap-y-5">
                                <FormField
                                    control={control}
                                    name='project_id'
                                    render={({ field }) => (
                                        <FormItem className="w-full max-w-sm ">
                                            <FormLabel>Project</FormLabel>
                                            <FormControl>
                                                <div className="flex justify-center items-center gap-2 ">
                                                    <Combobox inputPlaceholder="Select project..." searchPlaceholder="Search project..." className="w-full" values={allProjects} field={field}></Combobox>
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                Choose project from prop master registered projects
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="space-y-2 ">
                                    <Label className="">Delivery Date</Label>
                                    <div className="flex gap-2 max-w-sm">
                                        <FormField
                                            control={control}
                                            name='delivery_year'
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    {/* <FormLabel>Delivery date</FormLabel> */}
                                                    <FormControl>
                                                        <Select value={String(field?.value)} onValueChange={field.onChange}
                                                        >
                                                            <SelectTrigger className="w-full ">
                                                                <SelectValue placeholder="Choose a year">
                                                                    {field?.value || "Choose a year"}
                                                                </SelectValue>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <div className='flex justify-between'>
                                                                        <SelectLabel>Delivery Year</SelectLabel>
                                                                        <Button
                                                                            disabled={!field?.value}
                                                                            variant="secondary"
                                                                            size="sm"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                setValue(`delivery_year`, "")
                                                                            }}
                                                                        >
                                                                            Clear
                                                                        </Button>
                                                                    </div>
                                                                    {deliveryYearsOptions?.map(opt => (
                                                                        <SelectItem value={opt?.id} key={opt?.id}>{opt?.name}</SelectItem>
                                                                    ))}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormDescription>
                                                        Delivery year of property
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={control}
                                            name='delivery_quarter'
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    {/* <FormLabel>Delivery Quarter</FormLabel> */}
                                                    <FormControl>
                                                        <Select value={String(field?.value)} onValueChange={field.onChange}
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Choose quarter">
                                                                    {field?.value || "Choose a quarter"}
                                                                </SelectValue>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <div className='flex justify-between'>
                                                                        <SelectLabel>Delivery Quarter</SelectLabel>
                                                                        <Button
                                                                            disabled={!field?.value}
                                                                            variant="secondary"
                                                                            size="sm"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                setValue(`delivery_quarter`, "")
                                                                            }}
                                                                        >
                                                                            Clear
                                                                        </Button>
                                                                    </div>
                                                                    {quartersOptions?.map(opt => (
                                                                        <SelectItem value={opt?.id} key={opt?.id}>{opt?.name}</SelectItem>
                                                                    ))}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormDescription>
                                                        Year's quarter
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            <Separator className="" />
                        </div>



                        <div className="space-y-4 max-w-sm xl:max-w-full ">

                            <div className="flex items-center space-x-2"><h1 className="text-lg font-bold">Property features</h1><ListPlus className="h-6 w-6 text-secondary" /></div>
                            <div className="grid xl:grid-cols-2 gap-x-3 gap-y-5 ">

                                <FormField

                                    control={control}
                                    name={`features.TypeOfUnit`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type</FormLabel>
                                            <FormControl>
                                                <Select value={field?.value} onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className="w-full col-span-1 max-w-sm">
                                                        <SelectValue placeholder="Choose type">
                                                            {field?.value || "Choose type"}
                                                        </SelectValue>

                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <div className='flex justify-between'>
                                                                <SelectLabel>Type</SelectLabel>
                                                                <Button
                                                                    disabled={!field?.value}
                                                                    variant="secondary"
                                                                    size="sm"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        setValue(`features.TypeOfUnit`, "")
                                                                    }}
                                                                >
                                                                    Clear
                                                                </Button>
                                                            </div>
                                                            {typeOfUnit?.map(opt => (
                                                                <SelectItem value={opt?.id} key={opt?.id}>{opt?.name}</SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription>
                                                Choose the type of the unit
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name={`features.NoRooms`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Number of rooms</FormLabel>
                                            <FormControl>
                                                <Select value={String(field?.value)} onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className="w-full col-span-1 max-w-sm">
                                                        <SelectValue placeholder="Choose rooms">
                                                            {field?.value || "Choose rooms"}
                                                        </SelectValue>

                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <div className='flex justify-between'>
                                                                <SelectLabel>Number of rooms</SelectLabel>
                                                                <Button
                                                                    disabled={!field?.value}
                                                                    variant="secondary"
                                                                    size="sm"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        setValue(`features.NoRooms`, "")
                                                                    }}
                                                                >
                                                                    Clear
                                                                </Button>
                                                            </div>
                                                            {noRooms?.map(opt => (
                                                                <SelectItem value={opt?.id} key={opt?.id}>{opt?.name}</SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription>
                                                Choose the number of rooms
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name={`features.Area`}
                                    render={({ field }) => (
                                        <FormItem className='max-w-sm '>
                                            <FormLabel>Area</FormLabel>
                                            <FormControl>
                                                <Input step="0.01"
                                                    onWheel={(e) => e.currentTarget.blur()} min={0} type="number" {...field} placeholder="200" />
                                            </FormControl>
                                            <FormDescription>
                                                Type the area of the property
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="space-y-2 ">
                                    <Label className="">Property Price (from-to)</Label>

                                    <div className="flex gap-2 max-w-sm">

                                        <FormField
                                            control={control}
                                            name={`features.price_from`}
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <Input
                                                        step="0.01"
                                                        onWheel={(e) => e.currentTarget.blur()}
                                                        min={0}
                                                        type="number" placeholder='7000000...' {...field} />
                                                    <FormDescription>
                                                        Type the starting price of the property
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={control}
                                            name={`features.price_to`}
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    {/* <FormLabel>Price to</FormLabel> */}
                                                    <FormControl>
                                                        <Input step="0.01"
                                                            onWheel={(e) => e.currentTarget.blur()} min={0} type="number" placeholder='9000000...' {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Type the end price of the property
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                </div>


                            </div>

                            <Separator className="" />

                        </div>

                        <div className="space-y-4 max-w-sm xl:max-w-full " ref={parent}>

                            <div className="flex items-center space-x-2"><h1 className="text-lg font-bold">Installment details</h1><CirclePercent className="h-6 w-6 text-secondary" /></div>
                            {/* <div className="grid grid-cols-2  gap-x-3 gap-y-5 justify-items-center"> */}

                            {fields.map((item, index) => (

                                <div key={item.id} className=" pb-14" >

                                    <div className="flex space-x-2 items-center pb-3">
                                        <h1 className="text-md font-bold col-span-2 text-start ">Installment Plan <span className="text-primary">#{index}</span></h1>

                                        {index != 0 && (
                                            <Button type="button" size="icon" variant="destructive" className="  flex items-center" onClick={() => remove(1)}>
                                                <Trash2 className="w-5 h-5 " />
                                            </Button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2  gap-x-3 gap-y-5 justify-items-stretch">

                                        <div className="space-y-2 col-span-2 xl:col-span-1 ">
                                            <Label className="">Down Payment (from-to)</Label>
                                            <div className="flex gap-2 max-w-sm">

                                                <FormField
                                                    control={control}
                                                    name={`installment_details.${index}.down_payment_from`}
                                                    render={({ field }) => (
                                                        <FormItem className="w-full">
                                                            <FormControl>
                                                                <Input step="0.01"
                                                                    onWheel={(e) => e.currentTarget.blur()} min={0} type="number" {...field} placeholder="45000..." />
                                                            </FormControl>
                                                            <FormDescription>
                                                                Choose the starting down payment amount
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={control}
                                                    name={`installment_details.${index}.down_payment_to`}
                                                    render={({ field }) => (
                                                        <FormItem className="w-full">
                                                            <FormControl>
                                                                <Input step="0.01"
                                                                    onWheel={(e) => e.currentTarget.blur()} min={0} type="number" {...field} placeholder="90000..." />
                                                            </FormControl>
                                                            <FormDescription>
                                                                Choose the starting down payment amount
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2 col-span-2 xl:col-span-1 ">
                                            <Label className="">Installment Amount (from-to)</Label>
                                            <div className="flex gap-2 max-w-sm">
                                                <FormField
                                                    control={control}
                                                    name={`installment_details.${index}.amount_from`}
                                                    render={({ field }) => (
                                                        <FormItem className="w-full">
                                                            <FormControl>
                                                                <Input step="0.01"
                                                                    onWheel={(e) => e.currentTarget.blur()} min={0} type="number" {...field} placeholder="10000..." />
                                                            </FormControl>
                                                            <FormDescription>
                                                                Type the start amount of installment
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={control}
                                                    name={`installment_details.${index}.amount_to`}
                                                    render={({ field }) => (
                                                        <FormItem className="w-full">
                                                            <FormControl>
                                                                <Input step="0.01"
                                                                    onWheel={(e) => e.currentTarget.blur()} min={0} type="number" {...field} placeholder="20000..." />
                                                            </FormControl>
                                                            <FormDescription>
                                                                Type the end amount of installment
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                        </div>

                                        <FormField
                                            control={control}
                                            name={`installment_details.${index}.currency`}
                                            render={({ field }) => (
                                                <FormItem className="col-span-1  w-full ">
                                                    <FormLabel>Currency</FormLabel>
                                                    <FormControl>
                                                        <Select value={field?.value} onValueChange={field.onChange}
                                                        >
                                                            <SelectTrigger className="w-full col-span-1 max-w-sm">
                                                                <SelectValue placeholder="Choose currency">
                                                                    {field?.value || "Choose currency"}
                                                                </SelectValue>

                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <div className='flex justify-between'>
                                                                        <SelectLabel>Currency</SelectLabel>
                                                                        <Button
                                                                            disabled={!field?.value}
                                                                            variant="secondary"
                                                                            size="sm"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                setValue(`installment_details.${index}.currency`, "")
                                                                            }}
                                                                        >
                                                                            Clear
                                                                        </Button>
                                                                    </div>
                                                                    {currencies?.map(opt => (
                                                                        <SelectItem value={opt?.id} key={opt?.id}>{opt?.name}</SelectItem>
                                                                    ))}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormDescription>
                                                        Type the end amount of installment
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={control}
                                            name={`installment_details.${index}.freq`}
                                            render={({ field }) => (
                                                <FormItem className="col-span-1 w-full">
                                                    <FormLabel>Frequency</FormLabel>
                                                    <FormControl>
                                                        <Select value={String(field?.value)} onValueChange={field.onChange}
                                                        >
                                                            <SelectTrigger className="w-full col-span-1 max-w-sm">
                                                                <SelectValue placeholder="Choose frequency">
                                                                    {field?.value || "Choose frequency"}
                                                                </SelectValue>

                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <div className='flex justify-between'>
                                                                        <SelectLabel>Frequency</SelectLabel>
                                                                        <Button
                                                                            disabled={!field?.value}
                                                                            variant="secondary"
                                                                            size="sm"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                setValue(`installment_details.${index}.freq`, "")
                                                                            }}
                                                                        >
                                                                            Clear
                                                                        </Button>
                                                                    </div>
                                                                    {frequencies
                                                                        ?.map(opt => (
                                                                            <SelectItem value={opt?.id} key={opt?.id}>{opt?.name}</SelectItem>
                                                                        ))}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormDescription>
                                                        Type the end amount of installment
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={control}
                                            name={`installment_details.${index}.duration`}
                                            render={({ field }) => (
                                                <FormItem className="col-span-1 w-full">
                                                    <FormLabel>Duration</FormLabel>
                                                    <FormControl>
                                                        <Select value={String(field?.value)} onValueChange={field.onChange}
                                                        >
                                                            <SelectTrigger className="w-full col-span-1 max-w-sm">
                                                                <SelectValue placeholder="Choose a duration">
                                                                    {field?.value || "Choose duration"}
                                                                </SelectValue>

                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <div className='flex justify-between'>
                                                                        <SelectLabel>Duration</SelectLabel>
                                                                        <Button
                                                                            disabled={!field?.value}
                                                                            variant="secondary"
                                                                            size="sm"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                setValue(`installment_details.${index}.duration`, "")
                                                                            }}
                                                                        >
                                                                            Clear
                                                                        </Button>
                                                                    </div>
                                                                    {durations?.map(opt => (
                                                                        <SelectItem value={opt?.id} key={opt?.id}>{opt?.name}</SelectItem>
                                                                    ))}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormDescription>
                                                        Choose the duration of the installment
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={control}
                                            name={`installment_details.${index}.is_default`}
                                            render={({ field }) => (
                                                <FormItem className="col-span-1 w-full">
                                                    <FormLabel htmlFor="">Default Installment</FormLabel>
                                                    <FormControl>
                                                        <RadioItem {...field} onChange={(_) =>
                                                            setValue("installment_details", getValues("installment_details").map((f, i) => {
                                                                if (i != index) {
                                                                    return { ...f, is_default: false }
                                                                } else {
                                                                    return { ...f, is_default: true }
                                                                }
                                                            }))}
                                                            checked={getValues("installment_details")?.find((_, i) => i == index)?.is_default || false} value={index} label="Default Installment" id={`is_default${index}`} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Check this input if this is the default installment
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                </div>

                            ))}

                            {/* </div> */}

                            <div className="w-full pt-2">

                                <Button type="button" variant="outline" className=" font-medium flex items-center gap-1" onClick={() => append({ down_payment_from: 0, down_payment_to: 0, amount_from: 0, amount_to: 0, currency: "", freq: "", duration: "", is_default: false })}>
                                    <CirclePlus className="w-4 h-4 text-primary" />Add Installment
                                </Button>

                            </div>

                        </div>


                    </div>

                    {/* Modal Footer */}
                    <div className="fixed bottom-0 right-0 p-2 pt-3 bg-background w-full flex justify-end sm:space-x-2 gap-2 ">
                        {/* <Button type="submit" >Update Project</Button> */}
                        <Button loading={false} disabled={false} type="submit" >Add Property</Button>
                        <Button type="button" onClick={handleCloseModal} variant="outline">Cancel</Button>
                    </div>

                </form>

            </Form>
        </div >

    )

};

export default PropertyDetailsForm;     
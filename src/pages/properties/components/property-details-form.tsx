
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
import { useForm } from 'react-hook-form'
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const PropertyDetailsForm = () => {


    const { clickedRowAction, clickedRowActionResponse, rowActionsDispatcher, customControlAction, rowActionPostLoading } = useTableRowActions()


    const form = useForm({
        // resolver: zodResolver(formSchema),
        // defaultValues,
        // mode: 'onChange',
    })
    const { setValue, watch, getValues, handleSubmit, formState: { isDirty, errors } } = form


    // I am checking if 'action is null' because I want the laoding to only appear when user opens up the modal and not when closing or submitting !!! so i a have to check for both (rowActionPostLoading and action === null)
    // if (loadingModalData && !action) {
    //     return (
    //         <div className="min-h-16 flex flex-col justify-center items-center pb-9">
    //             <h1 className="mb-4 text-xl font-bold">Loading project...</h1>
    //             <div className="loader--3" />
    //         </div>
    //     )
    // }

    // Fetch all projects from database
    const projects = [{ id: 1, name: "project1" }, { id: 2, name: "project12" }, { id: 3, name: "project3" }, { id: 4, name: "project4" }, { id: 5, name: "project5" }, { id: 6, name: "project16" }, { id: 7, name: "project17" }]

    // Store this in a static file 
    const typeOfUnit = [
        { id: "apartment", name: "apartment" },
        { id: "villa", name: "villa" },
        { id: "townhouse", name: "townhouse" },
        { id: "duplex", name: "duplex", }, { id: "studio", name: "studio" }
    ]

    // Store this in a static file
    const noRooms = [{ id: '1', name: "1" }, { id: ' 2', name: "2" }, { id: '3', name: "3" }, { id: '4', name: "4" }]

    // Store this in a static file
    const frequencies = [{ id: '1', name: "1" }, { id: '2', name: "2" }, { id: '4', name: "4" }]

    // Store this in a static file
    const deliveryYears = [{ id: '2024', name: "2024" }, { id: '2025', name: "2025" }, { id: '2026', name: "2026" }, { id: '2027', name: "2027" }]

    // Store this in a static file
    const yearQuarters = [{ id: '1', name: "Q1" }, { id: '2', name: "Q2" }, { id: '3', name: "Q3" }, { id: '4', name: "Q4" }]

    // Store this in a static file
    const durations = [{ id: '1', name: "1" }, { id: '2', name: "2" }, { id: '3', name: "3" }, { id: '4', name: "4" }, { id: '5', name: "5" }]

    // Store this in a static file
    const currencies = [{ id: "egp", name: "EGP" }, { id: "dollar", name: "$" }]


    return (
        <div className="overflow-y-auto space-y-5 h-full">

            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => console.log("dataform", data))} className="h-full">


                    <div className='space-y-10 py-6 p-1 pb-28 lg:p-6 lg:pb-14  h-full grid justify-items-center lg:content-center '>

                        <div className="space-y-4 max-w-sm xl:max-w-full ">
                            <h1 className="text-md font-bold ">Project and delivery date</h1>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-3 gap-y-5">
                                <FormField
                                    control={form.control}
                                    name='project_id'
                                    render={({ field }) => (
                                        <FormItem className="w-full max-w-sm ">
                                            <FormLabel>Project</FormLabel>
                                            <FormControl>
                                                <div className="flex justify-center items-center gap-2 ">
                                                    <Combobox inputPlaceholder="Select project..." searchPlaceholder="Search project..." className="w-full" values={projects} field={field}></Combobox>
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                Choose project from the prop master registered projects
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="space-y-2 ">
                                    <Label className="">Delivery Date</Label>
                                    <div className="flex gap-2 max-w-sm">
                                        <FormField
                                            control={form.control}
                                            name='delivery_year'
                                            render={({ field }) => (
                                                <FormItem >
                                                    {/* <FormLabel>Delivery date</FormLabel> */}
                                                    <FormControl>
                                                        <Select defaultValue="" value={field?.value} onValueChange={field.onChange}
                                                        >
                                                            <SelectTrigger className="w-full ">
                                                                <SelectValue placeholder="Choose a year">
                                                                </SelectValue>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <div className='flex justify-between'>
                                                                        {/* <SelectLabel>Type</SelectLabel> */}
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
                                                                    {deliveryYears?.map(opt => (
                                                                        <SelectItem value={opt?.id} key={opt?.id}>{opt?.name}</SelectItem>
                                                                    ))}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormDescription>
                                                        Choose the delivery year of the property
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='delivery_quarter'
                                            render={({ field }) => (
                                                <FormItem>
                                                    {/* <FormLabel>Delivery Quarter</FormLabel> */}
                                                    <FormControl>
                                                        <Select defaultValue="" value={field?.value} onValueChange={field.onChange}
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Choose quarter">
                                                                </SelectValue>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <div className='flex justify-between'>
                                                                        {/* <SelectLabel>Type</SelectLabel> */}
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
                                                                    {yearQuarters?.map(opt => (
                                                                        <SelectItem value={opt?.id} key={opt?.id}>{opt?.name}</SelectItem>
                                                                    ))}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormDescription>
                                                        You can choose the quarter of year from here
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 max-w-sm xl:max-w-full ">

                            <h1 className="text-md font-bold">Property features</h1>
                            <div className="grid xl:grid-cols-2 gap-x-3 gap-y-5 ">

                                <FormField

                                    control={form.control}
                                    name={`features.TypeOfUnit`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type</FormLabel>
                                            <FormControl>
                                                <Select defaultValue="" value={field?.value} onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className="w-full col-span-1 max-w-sm">
                                                        <SelectValue placeholder="Choose type">
                                                        </SelectValue>

                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <div className='flex justify-between'>
                                                                {/* <SelectLabel>Type</SelectLabel> */}
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
                                    control={form.control}
                                    name={`features.NoRooms`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Number of rooms</FormLabel>
                                            <FormControl>
                                                <Select defaultValue="" value={field?.value} onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className="w-full col-span-1 max-w-sm">
                                                        <SelectValue placeholder="Choose rooms">
                                                        </SelectValue>

                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <div className='flex justify-between'>
                                                                {/* <SelectLabel>Type</SelectLabel> */}
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
                                    control={form.control}
                                    name={`features.Area`}
                                    render={({ field }) => (
                                        <FormItem className='max-w-sm '>
                                            <FormLabel>Area</FormLabel>
                                            <FormControl>
                                                <Input min={0} type="number" {...field} placeholder="1" />
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
                                            control={form.control}
                                            name={`features.price_from`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    {/* <FormLabel>Price from</FormLabel> */}
                                                    <FormControl>
                                                        <Input min={0} type="number" placeholder='7000000...' {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Type the starting price of the property
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`features.price_to`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    {/* <FormLabel>Price to</FormLabel> */}
                                                    <FormControl>
                                                        <Input min={0} type="number" placeholder='9000000...' {...field} />
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

                        </div>

                        <div className="space-y-4 max-w-sm xl:max-w-full ">

                            <h1 className="text-md font-bold">Installment details</h1>
                            <div className="grid grid-cols-2  gap-x-3 gap-y-5 justify-items-center">

                                <div className="space-y-2 col-span-2 xl:col-span-1">
                                    <Label className="">Down Payment (from-to)</Label>
                                    <div className="flex gap-2 max-w-sm">

                                        <FormField
                                            control={form.control}
                                            name={`installment_details.down_payment_form`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input min={0} type="number" {...field} placeholder="45000..." />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Choose the starting down payment amount
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`installment_details.down_payment_to`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input min={0} type="number" {...field} placeholder="90000..." />
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
                                            control={form.control}
                                            name={`installment_details.amount_form`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input min={0} type="number" {...field} placeholder="10000..." />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Type the start amount of installment
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`installment_details.amount_to`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input min={0} type="number" {...field} placeholder="20000..." />
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
                                    control={form.control}
                                    name={`installment_details.currency`}
                                    render={({ field }) => (
                                        <FormItem className="col-span-1  w-full ">
                                            <FormLabel>Currency</FormLabel>
                                            <FormControl>
                                                <Select defaultValue="" value={field?.value} onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className="w-full col-span-1 max-w-sm">
                                                        <SelectValue placeholder="Choose currency">
                                                        </SelectValue>

                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <div className='flex justify-between'>
                                                                {/* <SelectLabel>Type</SelectLabel> */}
                                                                <Button
                                                                    disabled={!field?.value}
                                                                    variant="secondary"
                                                                    size="sm"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        setValue(`installment_details.currency`, "")
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
                                    control={form.control}
                                    name={`installment_details.freq`}
                                    render={({ field }) => (
                                        <FormItem className="col-span-1 w-full">
                                            <FormLabel>Frequency</FormLabel>
                                            <FormControl>
                                                <Select defaultValue="" value={field?.value} onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className="w-full col-span-1 max-w-sm">
                                                        <SelectValue placeholder="Choose frequency">
                                                        </SelectValue>

                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <div className='flex justify-between'>
                                                                {/* <SelectLabel>Type</SelectLabel> */}
                                                                <Button
                                                                    disabled={!field?.value}
                                                                    variant="secondary"
                                                                    size="sm"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        setValue(`installment_details.freq`, "")
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
                                    control={form.control}
                                    name={`installment_details.duration`}
                                    render={({ field }) => (
                                        <FormItem className="col-span-1 w-full">
                                            <FormLabel>Duration</FormLabel>
                                            <FormControl>
                                                <Select defaultValue="" value={field?.value} onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className="w-full col-span-1 max-w-sm">
                                                        <SelectValue placeholder="Choose a duration">
                                                        </SelectValue>

                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <div className='flex justify-between'>
                                                                {/* <SelectLabel>Type</SelectLabel> */}
                                                                <Button
                                                                    disabled={!field?.value}
                                                                    variant="secondary"
                                                                    size="sm"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        setValue(`installment_details.duration`, "")
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
                                    control={form.control}
                                    name={`installment_details.is_default`}
                                    render={({ field }) => (
                                        <FormItem className="col-span-1 w-full">
                                            <FormLabel htmlFor="">Default Installment</FormLabel>
                                            <FormControl>
                                                <RadioItem {...field} label="Default Installment" id="testId" ></RadioItem>
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

                    </div>

                    {/* Modal Footer */}
                    <div className="fixed bottom-0 right-0 p-2 pt-3 bg-background w-full flex  justify-end sm:space-x-2 gap-2 ">
                        {/* <Button type="submit" >Update Project</Button> */}
                        <Button loading={false} disabled={false} type="submit" >Add Property</Button>
                        <Button type="button" onClick={() => { }} variant="outline">Cancel</Button>
                    </div>

                </form>

            </Form>
        </div>)

};

export default PropertyDetailsForm;     
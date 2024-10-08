
import * as React from 'react';
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { getOperatorLabel, objectToArrayKeyVal } from "../table-utils/utils.tsx"
import { restructureSelectedFilters } from '../table-utils/utils.tsx'
import { useTableCore } from '../table-providers/table-core-provider.tsx';
// import useApp from "../../hooks/useApp"
import AppliedFilters from "./applied-filters.tsx";
import { DatePickerWithRange } from '../../pages/projects/components/controlled-date-picker-with-range.tsx';
import { Label } from '@/components/ui/label.tsx';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { CornerDownRight } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'


function TableFilters() {
    const { tableCoreDispatcher, structureFilters, tableName } = useTableCore()
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    // const { accessibilitySettings } = useApp()
    const form = useForm()
    const { handleSubmit, register, control, setValue, resetField, watch, formState: { dirtyFields } } = form
    const watchFields = watch();
    const [isOpen, setIsOpen] = useState(true);


    useEffect(() => {
        const isAnyFieldFilled = Object.values(watchFields).some(
            field => field?.fieldValue && (typeof field.fieldValue === 'string' && field.fieldValue?.trim()) !== ""
        );
        setIsSubmitEnabled(isAnyFieldFilled);
    }, [watchFields]);

    const getOperators = (filter: any) => {
        return filter?.props?.operators
    }

    const renderOperator = (filter: any) => {
        return filter?.props?.operators?.length > 1
    }

    function submitFiltersHandler(data: any) {

        // console.log("structureFilters", structureFilters)
        tableCoreDispatcher({ type: 'SET_APPLIED_FILTERS', payload: restructureSelectedFilters(data, dirtyFields, structureFilters) })
        tableCoreDispatcher({ type: 'SET_RENDERED_FILTERS', payload: restructureSelectedFilters(data, dirtyFields, structureFilters) })
        tableCoreDispatcher({ type: 'SET_CURRENT_PAGE', payload: 1 })
    }


    return (
        <>

            <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="space-y-2"
            >
                <div className="flex items-center justify-start space-x-2" >
                    <h4 className="text-sm font-semibold">
                        Toggle Filters
                    </h4>
                    <CollapsibleTrigger asChild className='border shadow-sm'>
                        <Button variant="ghost" size="sm" className="w-9 p-0">
                            <ChevronsUpDown className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                </div>

                <CollapsibleContent className="py-4">
                    <Form {...form}>
                        <form /*className="row g-3 align-items-end"*/ className="" onSubmit={handleSubmit(submitFiltersHandler)}>
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-5 gap-x-3'>

                                {/* ... Date Type Filters */}
                                {structureFilters?.filter((filter: any) => filter?.type === 'date')?.map((filter: any) => (
                                    filter?.pair_with && (
                                        <FormField
                                            key={filter?.filter_name}
                                            control={form.control}
                                            // rules={{
                                            //     required: {
                                            //         value: true,
                                            //         message: "Please provide a date!"
                                            //     }, validate: (e) => {
                                            //         console.log("e", e);
                                            //         if (e?.from && e?.to) {
                                            //             return true
                                            //         }
                                            //         return "Please provide a ranged date!"
                                            //     }
                                            // }}
                                            defaultValue={{ from: new Date(filter?.min), to: new Date(filter?.max) }}
                                            name={`${filter?.filter_name}.fieldValue`}
                                            render={({ field }) => (
                                                <FormItem className='space-y-1'>
                                                    <FormLabel className='text-muted-foreground' htmlFor={filter?.filter_name}>{filter?.label}</FormLabel>
                                                    <FormControl>
                                                        <DatePickerWithRange min={new Date(filter?.min)} max={new Date(filter?.max)} onChange={field.onChange} value={field.value} className='w-full' id={filter?.filter_name} ></DatePickerWithRange>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    )
                                ))}


                                {/* Other Filter Types */}
                                {structureFilters?.filter((filter: any) => filter?.type !== 'date')?.map((filter: any, index: any) => (
                                    <div key={index}>

                                        {/* <Label className='pb-3 block text-muted-foreground' htmlFor={filter?.filter_name}>{filter?.label}</Label> */}

                                        <div
                                            key={filter?.filter_name}
                                            className={`${renderOperator(filter) ? 'flex items-end' : ''}`}
                                        >
                                            {
                                                // ... Select Type
                                                (filter?.type === 'select' || filter?.type === 'boolean' || filter?.type === 'null') ? (
                                                    <FormField
                                                        control={form.control}
                                                        name={`${filter?.filter_name}.fieldValue`}

                                                        render={({ field }) => (
                                                            <FormItem className=''>
                                                                <FormLabel className='text-muted-foreground'>{filter?.label}</FormLabel>
                                                                <FormControl>
                                                                    <Select defaultValue="" value={field?.value} onValueChange={field.onChange}
                                                                    >
                                                                        <SelectTrigger className={`w-full ${renderOperator(filter) ? 'border-r-0 rounded-r-none z-20' : ''}`}>
                                                                            <SelectValue placeholder="Choose">
                                                                            </SelectValue>
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectGroup>
                                                                                <SelectLabel>{filter?.label}</SelectLabel>
                                                                                {objectToArrayKeyVal(filter?.props?.select_options)?.sort((a, b) => (a.value === '' ? -1 : b.value === '' ? 1 : 0))?.map(opt => (
                                                                                    <SelectItem value={opt?.value} key={opt?.value}>{opt?.key}</SelectItem>
                                                                                ))}
                                                                            </SelectGroup>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    // ... Number Type
                                                ) : filter?.type === 'number' ? (
                                                    <FormField
                                                        control={form.control}
                                                        name={`${filter?.filter_name}.fieldValue`}
                                                        defaultValue=""
                                                        render={({ field }) => (
                                                            <FormItem className=' w-full'>
                                                                <FormLabel className='text-muted-foreground'>{filter?.label}</FormLabel>
                                                                <FormControl>
                                                                    <Input  {...field} className={`w-full ${renderOperator(filter) ? 'border-r-0 rounded-r-none z-20' : ''}`} type={filter?.type} id={filter?.label} placeholder={filter?.label} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />


                                                    // ... Text Type
                                                ) : filter?.type === 'text' && (

                                                    <FormField
                                                        control={form.control}
                                                        name={`${filter?.filter_name}.fieldValue`}
                                                        defaultValue=""
                                                        render={({ field }) => (
                                                            <FormItem className=' w-full'>
                                                                <FormLabel className='text-muted-foreground'>{filter?.label}</FormLabel>
                                                                <FormControl>
                                                                    <Input {...field} className={`w-full ${renderOperator(filter) ? 'border-r-0 rounded-r-none z-20' : ''}`} type="text" id={filter?.label} placeholder={filter?.label} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                )
                                            }

                                            <FormField
                                                control={form.control}
                                                name={`${filter?.filter_name}.operator`}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <FormItem className=''>
                                                        {/* <FormLabel className='text-muted-foreground'>{filter?.label}</FormLabel> */}
                                                        <FormControl>
                                                            <Select onValueChange={field.onChange} defaultValue={getOperators(filter)[0]} >
                                                                <SelectTrigger className={`${(renderOperator(filter) && filter?.type !== 'select' && filter?.type !== 'null' && filter?.type !== 'boolean') ? 'w-fit border-l-0 rounded-l-none bg-muted text-xs font-light' : 'hidden'}`}>
                                                                    <SelectValue placeholder="Choose" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        {/* <SelectLabel >{filter?.label}</SelectLabel> */}
                                                                        {getOperators(filter)?.map((operator: any, idx: any) => (
                                                                            <SelectItem className='text-xs' key={idx} value={operator}>
                                                                                {getOperatorLabel(operator)}
                                                                            </SelectItem>
                                                                        ))}

                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>

                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />


                                        </div>
                                    </div>
                                ))}

                                {/* Filters Submission */}
                                <div className="flex justify-start items-end">
                                    {/* <button className="btn btn-sm px-4 btn-opac-primary" type='submit'
                            disabled={!isSubmitEnabled}>تطبيق</button> */}
                                    <Button size="sm" disabled={!isSubmitEnabled} >
                                        <CornerDownRight className="mr-2 h-4 w-4" /> Apply
                                    </Button>
                                    {/* <Button size="sm" d>
                                        <CornerDownRight className="mr-2 h-4 w-4" /> Apply
                                    </Button> */}

                                </div>
                            </div>
                        </form>
                    </Form>
                </CollapsibleContent>
            </Collapsible>


            <div className="my-4">
                <AppliedFilters setValue={setValue} resetField={resetField} />
            </div>
        </>
    )
}

export default TableFilters

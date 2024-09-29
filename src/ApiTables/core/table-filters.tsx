
import * as React from 'react';
import { useState, useEffect } from "react"
import { RiFilter2Line } from "react-icons/ri";
import { useForm, Controller } from "react-hook-form"
import { getOperatorLabel, objectToArrayKeyVal } from "../table-utils/utils.tsx"
import CustomDatePicker from "../general-components/custom-date-picker.tsx"
import { restructureSelectedFilters } from '../table-utils/utils.tsx'
import { useTableCore } from '../table-providers/table-core-provider.tsx';
// import useApp from "../../hooks/useApp"
import AppliedFilters from "./applied-filters.tsx";
import { DatePickerWithRange } from '../../components/custom/DatePickerWithRange.tsx';
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


// import { useMemo } from "react";

function TableFilters() {
    const { tableCoreDispatcher, structureFilters, tableName } = useTableCore()
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    // const { accessibilitySettings } = useApp()
    const { handleSubmit, register, control, setValue, resetField, watch, formState: { dirtyFields } } = useForm()
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
                    <form /*className="row g-3 align-items-end"*/ className="" onSubmit={handleSubmit(submitFiltersHandler)}>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-5 gap-x-3'>


                            {/* ... Date Type Filters */}
                            {structureFilters?.filter((filter: any) => filter?.type === 'date')?.map((filter: any) => (
                                filter?.pair_with && (
                                    <div className='' key={filter?.filter_name}>
                                        <Label className='pb-3 block text-muted-foreground  ' htmlFor={filter?.filter_name}>{filter?.label}</Label>
                                        <DatePickerWithRange className='w-full' from={filter?.min} to={filter?.max} id={filter?.filter_name} ></DatePickerWithRange>
                                    </div>

                                )
                            ))}


                            {/* Other Filter Types */}
                            {structureFilters?.filter((filter: any) => filter?.type !== 'date')?.map((filter: any, index: any) => (
                                <div key={index}>

                                    <Label className='pb-3 block text-muted-foreground' htmlFor={filter?.filter_name}>{filter?.label}</Label>

                                    <div
                                        key={filter?.filter_name}
                                        className={`${renderOperator(filter) ? 'flex ' : ''}`}
                                    >
                                        {
                                            // ... Select Type
                                            (filter?.type === 'select' || filter?.type === 'boolean' || filter?.type === 'null') ? (
                                                <Select >
                                                    <SelectTrigger className={`w-full ${renderOperator(filter) ? 'border-r-0 rounded-r-none z-50' : ''}`}>
                                                        <SelectValue placeholder="Choose" />
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
                                                // ... Number Type
                                            ) : filter?.type === 'number' ? (
                                                <Input className={`w-full ${renderOperator(filter) ? 'border-r-0 rounded-r-none z-50' : ''}`} type="number" id={filter?.label} placeholder={filter?.label} />
                                                // ... Text Type
                                            ) : filter?.type === 'text' && (
                                                <Input className={`w-full ${renderOperator(filter) ? 'border-r-0 rounded-r-none z-50' : ''}`} type="text" id={filter?.label} placeholder={filter?.label} />
                                            )
                                        }

                                        <Select name={`${filter?.filter_name}.operator`} defaultValue={getOperators(filter)[0]} >
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

                                        {/* <Controller
                                        name={`${filter?.filter_name}.operator`}
                                        control={control}
                                        defaultValue={getOperators(filter)[0]}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                className={`${(renderOperator(filter) && filter?.type !== 'select' && filter?.type !== 'null' && filter?.type !== 'boolean') ? '' : 'hidden'}`}
                                            >
                                                {getOperators(filter)?.map((operator: any, idx: any) => (
                                                    <option key={idx} value={operator}>
                                                        {getOperatorLabel(operator)}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    /> */}

                                    </div>
                                </div>
                            ))}

                            {/* Filters Submission */}
                            <div className="flex justify-start items-end">
                                {/* <button className="btn btn-sm px-4 btn-opac-primary" type='submit'
                            disabled={!isSubmitEnabled}>تطبيق</button> */}
                                <Button size="sm" disabled={!isSubmitEnabled}>
                                    <CornerDownRight className="mr-2 h-4 w-4" /> Apply
                                </Button>

                            </div>
                        </div>
                    </form>
                </CollapsibleContent>
            </Collapsible>


            <div className="my-4">
                <AppliedFilters setValue={setValue} resetField={resetField} />
            </div>
        </>
    )
}

export default TableFilters

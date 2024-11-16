
import * as React from 'react';
import { useState, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { getOperatorLabel, objectToArrayKeyVal } from "../table-utils/utils.tsx"
import { restructureSelectedFilters } from '../table-utils/utils.tsx'
import { useTableCore } from '../table-providers/table-core-provider.tsx';
// import useApp from "../../hooks/useApp"
import AppliedFilters from "./applied-filters.tsx";
import { DatePickerWithRange } from '../general-components/controlled-date-picker-with-range.tsx';
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
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { ControlledMultiSelect } from '@/components/custom/controlled-multi-select.tsx';
import ApplyFiltersButton from '../general-components/ApplyFiltersButton.tsx';
import { Label } from '@/components/ui/label.tsx';


function TableFilters() {
    const { tableCoreDispatcher, structureFilters } = useTableCore()

    const form = useForm()
    const { handleSubmit, control, setValue, resetField, formState: { dirtyFields } } = form

    const [isOpen, setIsOpen] = useState(true);

    const memoizedStrucreFilters = React.useMemo(() => structureFilters?.length > 0 ? [...structureFilters] : [], [])



    const getOperators = React.useCallback((filter: any) => {
        return filter?.props?.operators
    }, [])

    const renderOperator = React.useCallback((filter: any) => {
        return filter?.props?.operators?.length > 1
    }, [])


    const submitFiltersHandler = React.useCallback((data: any) => {
        // Cache the restructured filters

        tableCoreDispatcher({
            type: 'SET_APPLIED_FILTERS',
            payload: restructureSelectedFilters(data, dirtyFields, structureFilters)
        });

        tableCoreDispatcher({
            type: 'SET_RENDERED_FILTERS',
            payload: restructureSelectedFilters(data, dirtyFields, structureFilters)
        });

        tableCoreDispatcher({
            type: 'SET_CURRENT_PAGE',
            payload: 1
        });
    }, [memoizedStrucreFilters, dirtyFields]);


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
                                {memoizedStrucreFilters?.filter((filter: any) => filter?.type === 'date')?.map((filter: any) => (
                                    filter?.pair_with && (
                                        <>
                                            <Label className='text-muted-foreground'>{filter?.label}</Label>
                                            <Controller
                                                name={`${filter?.filter_name}.fieldValue`}
                                                control={form.control}
                                                defaultValue={{ from: new Date(filter?.min), to: new Date(filter?.max) }}
                                                render={({ field }) => (
                                                    <DatePickerWithRange min={new Date(filter?.min)} max={new Date(filter?.max)} onChange={field.onChange} value={field.value} className='w-full' id={filter?.filter_name} ></DatePickerWithRange>
                                                )}
                                            />
                                        </>


                                    )
                                ))}


                                {/* Other Filter Types */}
                                {memoizedStrucreFilters?.filter((filter: any) => filter?.type !== 'date')?.map((filter: any, index: any) => (
                                    <div key={filter?.filter_name} className='space-y-1'>

                                        <Label className='text-muted-foreground'>{filter?.label}</Label>
                                        <div

                                            className={`${renderOperator(filter) ? 'flex items-end' : ''}`}
                                        >
                                            {
                                                // ... Select Type
                                                (filter?.type === 'select' || filter?.type === 'boolean' || filter?.type === 'null') ? (
                                                    <Controller
                                                        name={`${filter?.filter_name}.fieldValue`}
                                                        control={form.control}
                                                        render={({ field }) => (

                                                            <Select defaultValue="" value={field?.value} onValueChange={field.onChange}
                                                            >
                                                                <SelectTrigger className={`w-full min-h-10 h-auto ${renderOperator(filter) ? 'border-r-0 rounded-r-none z-20' : ''}`}>
                                                                    <SelectValue placeholder="Choose">
                                                                    </SelectValue>

                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>

                                                                        <div className='flex justify-between'>
                                                                            <SelectLabel>{filter?.label}</SelectLabel>
                                                                            <Button
                                                                                disabled={!field?.value}
                                                                                variant="secondary"
                                                                                size="sm"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation()
                                                                                    setValue(`${filter?.filter_name}.fieldValue`, "")
                                                                                }}
                                                                            >
                                                                                Clear
                                                                            </Button>
                                                                        </div>
                                                                        {objectToArrayKeyVal(filter?.props?.select_options)?.sort((a, b) => (a.value === '' ? -1 : b.value === '' ? 1 : 0))?.map(opt => (
                                                                            <SelectItem value={opt?.value} key={opt?.value}>{opt?.label}</SelectItem>
                                                                        ))}
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                    />



                                                    // ... Number Type
                                                ) : filter?.type === 'number' ? (
                                                    <Controller
                                                        name={`${filter?.filter_name}.fieldValue`}
                                                        control={control}
                                                        defaultValue=''
                                                        render={({ field }) => (
                                                            <Input min={0}  {...field} className={`min-h-10 h-auto w-full ${renderOperator(filter) ? 'border-r-0 rounded-r-none z-20' : ''}`} type={filter?.type} id={filter?.label} placeholder={filter?.label} />
                                                        )}
                                                    />

                                                ) : filter?.type === 'multiple_select' ? (

                                                    <Controller
                                                        name={`${filter?.filter_name}.fieldValue`}
                                                        control={control}
                                                        defaultValue=''
                                                        render={({ field }) => (
                                                            <ControlledMultiSelect
                                                                options={objectToArrayKeyVal(filter?.props?.select_options)?.sort((a, b) => (a.value === '' ? -1 : b.value === '' ? 1 : 0))}
                                                                // options={filter?.props?.select_options}
                                                                selectedValues={field?.value}
                                                                setSelectedValues={field.onChange}
                                                                // defaultValue={[]}
                                                                placeholder={filter?.props?.placeholder}
                                                                variant="inverted"
                                                                maxCount={3}

                                                            />
                                                        )}
                                                    />

                                                ) : filter?.type === 'range' ? (


                                                    <div className="flex gap-2">

                                                        <Controller
                                                            name={`${filter?.filter_name}.from.fieldValue`}
                                                            control={control}
                                                            defaultValue=''
                                                            render={({ field }) => (
                                                                <Input {...field} className={` min-h-10 h-auto ${renderOperator(filter) ? 'border-r-0 rounded-r-none ' : ''}`} type="number" placeholder={"From"} />
                                                            )}
                                                        />
                                                        <Controller
                                                            name={`${filter?.filter_name}.to.fieldValue`}
                                                            control={control}
                                                            defaultValue=''
                                                            render={({ field }) => (
                                                                <Input {...field} className={` min-h-10 h-auto ${renderOperator(filter) ? 'border-r-0 rounded-r-none ' : ''}`} type="number" placeholder={"To"} />
                                                            )}
                                                        />


                                                    </div>



                                                    // ... Text Type
                                                ) : filter?.type === 'text' && (


                                                    <Controller
                                                        name={`${filter?.filter_name}.fieldValue`}
                                                        control={control}
                                                        defaultValue=''
                                                        render={({ field }) => (
                                                            <Input {...field} className={`w-full min-h-10 h-auto ${renderOperator(filter) ? 'border-r-0 rounded-r-none ' : ''}`} type="text" id={filter?.label} placeholder={filter?.label} />
                                                        )}
                                                    />

                                                )
                                            }


                                            <Controller
                                                control={form.control}
                                                name={`${filter?.filter_name}.operator`}
                                                defaultValue={getOperators(filter)[0]}
                                                render={({ field }) => (
                                                    <Select onValueChange={field.onChange} defaultValue={getOperators(filter)[0]} >
                                                        <SelectTrigger className={` min-h-10 h-auto ${(renderOperator(filter) && filter?.type !== 'select' && filter?.type !== 'null' && filter?.type !== 'boolean' && filter?.type !== 'multiple_select' && filter?.type !== 'range') ? 'w-fit border-l-0 rounded-l-none bg-muted text-xs font-light z-20' : 'hidden'}`}>
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

                                                )}
                                            />


                                        </div>
                                    </div>
                                ))}

                                {/* Filters Submission */}
                                <div className="flex justify-start items-end">
                                    <ApplyFiltersButton />
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

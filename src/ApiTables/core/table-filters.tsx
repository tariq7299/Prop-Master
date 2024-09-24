
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
// import { useMemo } from "react";

function TableFilters() {
    const { tableCoreDispatcher, structureFilters, tableName } = useTableCore()
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    // const { accessibilitySettings } = useApp()
    const { handleSubmit, register, control, setValue, resetField, watch, formState: { dirtyFields } } = useForm()
    const watchFields = watch();


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
            <button type='button'
                className='btn btn-light dropdown-toggle isCollapseBtn text-dark fw-bold shadow-0 mb-4'
                data-bs-toggle='collapse'
                aria-expanded="true"
                // aria-expanded={`${accessibilitySettings?.tablesFilterClosedByDef ? 'false' : 'true'}`}
                data-bs-target={`#filterCollapseEl_${tableName}`}
            >
                <RiFilter2Line className="ms-2" />
                <span className="text-sm ms-3">تصفية النتائج</span>
            </button>

            <div className="collapse true" id={`filterCollapseEl_${tableName}`}>
                <form className="row g-3 align-items-end" onSubmit={handleSubmit(submitFiltersHandler)}>
                    {/* ... Date Type Filters */}
                    {structureFilters?.filter((filter: any) => filter?.type === 'date')?.map((filter: any) => (
                        filter?.pair_with && (
                            <div className="col-xl-3 col-lg-4 col-md-6" key={filter?.filter_name}>
                                <div className="date-range-holder minimal-range" key={filter?.filter_name}>
                                    <div className="range-separator">
                                        <i className="fa-solid fa-right-left"></i>
                                    </div>

                                    <div className="row g-0 align-items-end">
                                        <div className="col-12">
                                            <label className="form-label"><span className="text-sm"></span>{filter?.label}<span className="px-2 fw-bold text-xs">(من - إلى)</span></label>
                                        </div>
                                        <div className="col-6 position-relative">
                                            <Controller
                                                name={`${filter?.filter_name}.fieldValue`}
                                                control={control}
                                                render={({ field }) => (
                                                    <CustomDatePicker
                                                        field={field}
                                                        min={filter?.min}
                                                        max={filter?.max}
                                                        selected={new Date(field?.value).getTime() || new Date(filter?.min).getTime()}
                                                        onChange={(date: any) => {
                                                            setValue(filter?.filter_name, new Date(date).getTime(), { shouldTouch: true });
                                                            field.onChange(new Date(date).getTime())
                                                        }}
                                                        placement='bottom-end'
                                                        placeholder={new Date(filter?.min).getTime()}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="col-6 position-relative">
                                            {structureFilters?.filter((fl: any) => filter?.pair_with === fl?.filter_name)?.map((fl: any) => (
                                                <Controller
                                                    key={fl?.filter_name}
                                                    name={`${fl?.filter_name}.fieldValue`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <CustomDatePicker
                                                            placeholder={"testing"}
                                                            field={field}
                                                            min={filter?.min}
                                                            max={filter?.max}
                                                            selected={new Date(field?.value).getTime() || new Date(filter?.max).getTime()}
                                                            onChange={(date: any) => {
                                                                setValue(fl?.filter_name, new Date(date).getTime(), { shouldTouch: true });
                                                                field.onChange(new Date(date).getTime())
                                                            }}
                                                            placement='bottom-start'
                                                        />
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    ))}


                    {/* Other Filter Types */}
                    {structureFilters?.filter((filter: any) => filter?.type !== 'date')?.map((filter: any) => (
                        <div className="col-xl-3 col-lg-4 col-md-6" key={filter?.filter_name}>
                            <div
                                className={`${renderOperator(filter) ? 'filter-with-operator' : ''}`}
                            >
                                <label className="form-label">{filter?.label}</label>
                                <div className="d-flex align-items-stretch">
                                    <div className="m-0 w-100">
                                        {// ... Select Type
                                            (filter?.type === 'select' || filter?.type === 'boolean' || filter?.type === 'null') ? (
                                                <select className="form-control mock-select"  {...register(`${filter.filter_name}.fieldValue`)} >
                                                    <option value="">اختر</option>
                                                    {objectToArrayKeyVal(filter?.props?.select_options)?.sort((a, b) => (a.value === '' ? -1 : b.value === '' ? 1 : 0))?.map(opt => (
                                                        <option value={opt?.value} key={opt?.value}>{opt?.key}</option>
                                                    ))}
                                                </select>

                                                // ... Number Type
                                            ) : filter?.type === 'number' ? (
                                                <Controller
                                                    name={`${filter?.filter_name}.fieldValue`}
                                                    control={control}
                                                    defaultValue=''
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            min='0' step='0.01' type='number'
                                                            className={`form-control ${renderOperator(filter) ? 'no-gutter shadow-0' : ''}`}
                                                            placeholder={filter?.label}
                                                        />
                                                    )}
                                                />
                                                // ... Text Type
                                            ) : filter?.type === 'text' && (
                                                <Controller
                                                    name={`${filter?.filter_name}.fieldValue`}
                                                    control={control}
                                                    defaultValue=''
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type={filter?.type}
                                                            className={`form-control ${renderOperator(filter) ? 'no-gutter shadow-0' : ''}`}
                                                            placeholder={filter?.label}
                                                        />
                                                    )}
                                                />
                                            )
                                        }
                                    </div>

                                    <Controller
                                        name={`${filter?.filter_name}.operator`}
                                        control={control}
                                        defaultValue={getOperators(filter)[0]}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                className={`${(renderOperator(filter) && filter?.type !== 'select' && filter?.type !== 'null' && filter?.type !== 'boolean') ? '' : 'd-none'} form-control mock-select shadow-0 filter-select-no-gutter ps-3`}
                                            >
                                                {getOperators(filter)?.map((operator: any, idx: any) => (
                                                    <option key={idx} value={operator}>
                                                        {getOperatorLabel(operator)}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Filters Submission */}
                    <div className="col-auto">
                        <button className="btn btn-sm px-4 btn-opac-primary" type='submit'
                            disabled={!isSubmitEnabled}>تطبيق</button>
                    </div>
                </form>

            </div>

            <div className="my-4">
                <AppliedFilters setValue={setValue} resetField={resetField} />
            </div>
        </>
    )
}

export default TableFilters

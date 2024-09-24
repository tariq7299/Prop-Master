import React, { useEffect, useLayoutEffect } from "react"
import { useForm } from "react-hook-form"

function TableFiltersOperators({ filter }: any) {
    const { register } = useForm()

    return (
        <>
            {filter?.props?.operators?.length > 1 && (
                <select
                    {...register(`${filter?.filter_name}_operator`)}
                    className="form-control mock-select shadow-0 filter-select-no-gutter ps-3"
                    style={{ maxWidth: '10rem' }}
                >
                    {filter?.props?.operators?.map((operator: any) => (
                        <option value={operator} key={operator} className="text-xs">
                            {operator === '=' && 'تطابق تام'}
                            {operator === 'like' && 'قيم مشابهة'}
                            {operator === '<=' && 'أقل من أو يساوي'}
                            {operator === '>=' && 'أكبر من أو يساوي'}
                        </option>
                    ))}
                </select>
            )}
        </>
    )
}

export default TableFiltersOperators
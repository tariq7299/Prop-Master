import * as React from "react"
import { useTableCore } from "../table-providers/table-core-provider"
import { formatDateNoTime } from "../table-utils/utils.tsx"
import { RiCloseCircleFill } from "react-icons/ri";

function AppliedFilters({ setValue, resetField }: any) {
    const { renderedFilters, tableCoreDispatcher } = useTableCore()

    function handleClearRenderedFilters(key: any, props: any, type: any) {

        const filteredRenderedFilters = renderedFilters?.filter((filter: any) => filter?.key !== key)
        if (type !== 'date') {
            setValue(`${key}.fieldValue`, '', { shouldDirty: true, shouldValidate: true })
            setValue(`${key}.operator`, props?.operators[0], { shouldDirty: true, shouldValidate: true })
        } else {
            resetField(`${key}.fieldValue`)
        }
        tableCoreDispatcher({ type: 'SET_RENDERED_FILTERS', payload: filteredRenderedFilters })
        tableCoreDispatcher({ type: 'SET_APPLIED_FILTERS', payload: filteredRenderedFilters })
        tableCoreDispatcher({ type: 'SET_CURRENT_PAGE', payload: 1 })

    }

    return (
        <>
            {renderedFilters?.length > 0 && (
                <ul className="list-inline p-0 mb-1">
                    <li className="list-inline-item text-sm fw-bold ms-2">تصفــــية حسب: </li>
                    {renderedFilters?.map((filter: any, index: any) => (
                        <li className="list-inline-item mx-1 mb-1" key={index}>
                            <div className="badge bg-info fw-normal py-0 rounded-pill pe-1 ps-3">
                                <button
                                    type="button"
                                    className="btn btn-link shadow-0 p-0 text-white"
                                    onClick={() => {
                                        handleClearRenderedFilters(filter?.key, filter?.props, filter?.type)
                                    }}
                                >
                                    <RiCloseCircleFill className="ms-2 mb-1" />
                                    ''
                                </button>
                                <strong className="ms-1">{filter?.label}:</strong>
                                <span>{filter?.type !== 'date' ? filter?.valueLable : formatDateNoTime(new Date(filter?.value))}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default AppliedFilters

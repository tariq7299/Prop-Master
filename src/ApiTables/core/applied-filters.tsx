import * as React from "react"
import { useTableCore } from "../table-providers/table-core-provider"
import { formatDateNoTime } from "../table-utils/utils.tsx"
import { RiCloseCircleFill } from "react-icons/ri";
import { Button } from "@/components/custom/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";


function AppliedFilters({ setValue, resetField }: any) {
    const { renderedFilters, tableCoreDispatcher } = useTableCore()

    // console.log("renderedFilters", renderedFilters)


    function handleClearRenderedFilters(key: any, props: any, type: any) {

        const filteredRenderedFilters = renderedFilters?.filter((filter: any) => filter?.key !== key)
        if (type === 'date') {
            resetField(`${key}.fieldValue`)
        } else if (type === "multiple_select") {
            setValue(`${key}.fieldValue`, [], { shouldDirty: true, shouldValidate: true })
        } else if (type === "range") {
            setValue(`${key}.from.fieldValue`, "", { shouldDirty: true, shouldValidate: true })
            setValue(`${key}.to.fieldValue`, "", { shouldDirty: true, shouldValidate: true })
        } else {
            setValue(`${key}.fieldValue`, '', { shouldDirty: true, shouldValidate: true })
            setValue(`${key}.operator`, props?.operators[0], { shouldDirty: true, shouldValidate: true })
        }
        tableCoreDispatcher({ type: 'SET_RENDERED_FILTERS', payload: filteredRenderedFilters })
        tableCoreDispatcher({ type: 'SET_APPLIED_FILTERS', payload: filteredRenderedFilters })
        tableCoreDispatcher({ type: 'SET_CURRENT_PAGE', payload: 1 })

    }
    // console.log("renderedFilters", renderedFilters)

    return (
        <>
            {renderedFilters?.length > 0 && (
                <div className="flex flex-wrap items-center justify-start gap-2 pt-5">
                    <div className=" text-sm font-bold">Filters: </div>
                    {renderedFilters?.map((filter: any, index: any) => (
                        <div className="text-nowrap" key={index}>
                            <Badge className="bg-teal-500 text-background py-0.5 px-1.5  rounded-3xl mx-1 text-2xs">

                                <Button
                                    size="sm"
                                    className="p-0 m-0 h-fit"
                                    variant="ghost"
                                    onClick={() => {
                                        handleClearRenderedFilters(filter?.key, filter?.props, filter?.type)
                                    }}
                                >
                                    <RiCloseCircleFill className="h-3 w-3" />
                                </Button>

                                <span className="mx-1 font-bold ">{filter?.label}:</span>

                                <span className="">

                                    {

                                        filter?.type === 'date' ? `${formatDateNoTime(new Date(filter?.value?.from))} - ${formatDateNoTime(new Date(filter?.value?.to))} `

                                            : filter?.type === 'multiple_select' ?
                                                //  We want to take the value array and then concatentat every value withe each other and add a , between them
                                                filter?.valueLable.join(", ")

                                                : filter?.valueLable


                                    }</span>


                            </Badge>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default AppliedFilters

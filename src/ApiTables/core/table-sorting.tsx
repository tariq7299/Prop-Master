import * as React from "react"
import { RiCloseCircleFill } from "react-icons/ri";
import { useTableCore } from "../table-providers/table-core-provider.tsx";
import { Button } from "@/components/custom/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";

function TableSorting() {

    const { tableSorting, tableCoreDispatcher } = useTableCore()

    function resetTableSorting() {
        tableCoreDispatcher({ type: 'SET_TABLE_SORTING', payload: {} })
    }

    console.log("tableSorting", tableSorting)

    // const tableSorting = {
    //     "label": "Payment Type",
    //     "direction": "desc",
    //     "payment_type": "desc"
    // }

    return (
        <>
            {Object.keys(tableSorting)?.length > 0 && (
                <div className="flex flex-wrap items-center justify-start gap-2 pb-5">
                    <div className="text-sm font-bold">Applied Sorting: </div>
                    <div className="text-nowrap ">
                        <Badge className="bg-neutral-400 hover:bg-neutral-400/80 text-background py-0.5 px-1.5 rounded-3xl mx-1 text-2xs">
                            <Button
                                size="sm"
                                className="p-0 m-0 h-fit"
                                variant="ghost"
                                onClick={resetTableSorting}><RiCloseCircleFill className="h-3 w-3" />
                            </Button>

                            <span className="mx-1 font-bold">{tableSorting?.label}: </span>
                            <span>{tableSorting?.direction === 'asc' ? 'ascending' : 'descending'}</span>
                        </Badge>
                    </div>
                </div>
            )}
        </>
    )
}

export default TableSorting

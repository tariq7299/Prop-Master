import * as React from "react"
import { RiCloseCircleFill } from "react-icons/ri";
import { useTableCore } from "../table-providers/table-core-provider.tsx";
import { Button } from "@/components/custom/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";

function TableSorting() {
    const { tableCoreDispatcher } = useTableCore()

    function resetTableSorting() {
        tableCoreDispatcher({ type: 'SET_TABLE_SORTING', payload: {} })
    }

    const tableSorting = {
        "label": "Payment Type",
        "direction": "desc",
        "payment_type": "desc"
    }

    return (
        <>
            {Object.keys(tableSorting)?.length > 0 && (
                <div className="flex flex-wrap items-center justify-start gap-2 pb-5">
                    <div className="text-sm font-bold">Applied Sorting: </div>
                    <div className="text-nowrap">
                        <Badge className="bg-gray-600 text-background p-1 px-2 rounded-3xl mx-1">
                            <Button
                                size="sm"
                                className="p-0 m-0 h-fit"
                                variant="ghost"
                                onClick={resetTableSorting}><RiCloseCircleFill className="h-4 w-4" />
                            </Button>
                            <div className="mx-1 font-bold">{tableSorting?.label}: </div> {tableSorting?.direction === 'asc' ? 'ascending' : 'descending'}
                        </Badge>
                    </div>
                </div>
            )}
        </>
    )
}

export default TableSorting

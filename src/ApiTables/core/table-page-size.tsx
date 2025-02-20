import * as React from "react"
import { useTableCore } from '../table-providers/table-core-provider.tsx'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label.tsx"

function TablePageSize() {
    const { tableCoreDispatcher, pageSize } = useTableCore()

    function changePageSize(value: any) {
        tableCoreDispatcher({ type: 'CHANGE_PAGE_SIZE', payload: value })
        tableCoreDispatcher({ type: 'SET_CURRENT_PAGE', payload: 1 })
    }


    return (
        <div className="space-x-2 items-center inline-flex">
            {/* <Label className="text-sm">Rows per page</Label> */}
            <Select defaultValue={pageSize?.toString()} onValueChange={(value) => changePageSize(Number(value))}>
                <SelectTrigger name="pageSize" className="h-8 gap-1 p-2">
                    <SelectValue placeholder="Select number of rows" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Page Size</SelectLabel>
                        <SelectItem className="" value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default TablePageSize

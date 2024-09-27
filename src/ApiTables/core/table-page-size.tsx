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


    console.log("pageSize", pageSize)

    return (
        <div className="flex space-x-2 items-center">
            <Label>Rows per page</Label>
            <Select defaultValue={pageSize?.toString()} onValueChange={(value) => changePageSize(Number(value))}>
                <SelectTrigger name="pageSize" className="w-max gap-1">
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
            {/* 
            <select title="select" name="pageSize" className="form-control px-2 px-lg-3 text-sm" value={pageSize} onChange={(e) => {
                changePageSize(Number(e.target.value))
            }}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select> */}
        </div>
    )
}

export default TablePageSize

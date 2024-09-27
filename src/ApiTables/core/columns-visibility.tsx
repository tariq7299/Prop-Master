import * as React from "react"
import { useId } from 'react';
useTableColumns
import { useTableCore } from "../table-providers/table-core-provider.tsx";
import { useTableColumns } from "../table-providers/table-columns-provider.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Binoculars } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox.tsx";

import { Button } from "@/components/custom/button.tsx";

function ColumnsVisibility() {
    const id = useId();
    const { tableName } = useTableCore()
    const { tableColumnsDispatcher, tableColumns, visibleColumns } = useTableColumns()

    function toggleColumnVisibility(value: any, data_src: any, tableName: any) {
        let columns = [...visibleColumns];
        if (value === true) {
            columns = [...visibleColumns, data_src];
        } else {
            columns = columns.filter((col) => col !== data_src);
        }
        tableColumnsDispatcher({ type: 'SET_VISIBLE_COLUMNS', payload: columns })
        localStorage.setItem(`${tableName}_tb`, JSON.stringify(columns));
    }

    // console.log("tableColumns", tableColumns)

    return (

        <div className="me-auto">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant='outline' className='space-x-1'>
                        <Binoculars className="w-4 h-4" /> <span className="sr-only md:not-sr-only">View</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-max flex-col justify-center' align='end' forceMount>
                    {tableColumns?.map((col: any, index: any) => {
                        return (
                            <DropdownMenuItem key={index} onSelect={(e) => e.preventDefault()} className="w-full gap-2 ">
                                <Checkbox id={`${col.data_src}ColVisibility${id}`} onCheckedChange={(checked) => toggleColumnVisibility(checked, col?.data_src, tableName)}
                                    checked={visibleColumns?.indexOf(col?.data_src) !== -1 ? true : false}
                                    key={index}
                                >
                                </Checkbox>
                                <label
                                    htmlFor={`${col.data_src}ColVisibility${id}`}
                                    className="h-full w-full text-sm cursor-pointer"
                                >
                                    {col.name?.props?.children}
                                </label>


                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div >


    );
}

export default ColumnsVisibility;

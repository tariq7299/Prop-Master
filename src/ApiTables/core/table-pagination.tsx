import * as React from "react"
import { useTableCore } from "../table-providers/table-core-provider.tsx";
import { Button } from "@/components/custom/button.tsx";
import { ChevronRight, ChevronLeft } from 'lucide-react';



function TablePagination() {

    const { tablePagination, currentPage, tableCoreDispatcher } = useTableCore()

    function setCurrentPageHandler(link: any) {
        if (link?.label?.includes('الصفحة التالية')) {
            tableCoreDispatcher({ type: 'SET_CURRENT_PAGE', payload: currentPage + 1 })
        } else if (link?.label?.includes('الصفحة السابقة')) {
            tableCoreDispatcher({ type: 'SET_CURRENT_PAGE', payload: currentPage - 1 })
        } else {
            tableCoreDispatcher({ type: 'SET_CURRENT_PAGE', payload: Number(link?.label) })
        }
    }

    return (
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-4 pt-7">

            <div className="text-gray-400 text-sm order-last lg:order-1">
                <span>Showing</span>
                <strong className="mx-1">{tablePagination?.from || 0}</strong>
                <span>to</span>
                <strong className="mx-1">{tablePagination?.to || 0}</strong>
                <span>from</span>
                <strong className="mx-1">{tablePagination?.total || 0}</strong>
                <span>rows</span>
            </div>

            {tablePagination?.links?.length > 1 && (
                <div className="flex overflow-scroll flex-wrap items-center justify-center lg:order-2">
                    {
                        tablePagination?.links?.map((link: any, index: any) => {
                            return (
                                <div className={` ${link?.active ? '' : ''} ${!link?.url && 'disabled'}`} key={index}>
                                    {link?.active ? (
                                        <Button size="sm" className="rounded-2xl">
                                            <span aria-hidden="true"> {link?.label}</span>
                                        </Button >
                                    ) : (
                                        <Button disabled={!link?.url} variant="ghost" size="sm"
                                            onClick={() => setCurrentPageHandler(link)}>
                                            <span aria-hidden="true">{link?.label?.includes('Previous') ? (<ChevronLeft className="h-3.5 w-3.5" />) : link?.label?.includes('Next') ? (<ChevronRight className="h-3.5 w-3.5" />) : link?.label}</span>

                                        </Button>
                                    )}

                                </div>
                            )
                        })
                    }
                </div>
            )}




        </div>
    );

};

export default TablePagination

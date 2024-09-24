import * as React from "react"
import { useTableCore } from "../table-providers/table-core-provider.tsx";

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
        <div className="row mt-4 text-center text-lg-end">
            <div className="col-lg-6">

                {tablePagination?.links?.length > 1 && (
                    <nav aria-label="Page navigation" className="table-pagination">
                        <ul className="pagination custom-pagination p-0">
                            {
                                tablePagination?.links?.map((link: any, index: any) => {
                                    return (
                                        <li className={`page-item ${link?.active ? 'active' : ''} ${!link?.url && 'disabled'}`} key={index}>
                                            {link?.active ? (
                                                <span className="page-link">
                                                    <span aria-hidden="true">{link?.label?.includes('الصفحة السابقة') ? '«' : link?.label?.includes('الصفحة التالية') ? '»' : link?.label}</span>
                                                </span>
                                            ) : (
                                                <button type="button" className="page-link"
                                                    onClick={() => setCurrentPageHandler(link)}>
                                                    <span aria-hidden="true">{link?.label?.includes('الصفحة السابقة') ? '«' : link?.label?.includes('الصفحة التالية') ? '»' : link?.label}</span>
                                                    ""
                                                </button>
                                            )}

                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>
                )}



            </div>
            <div className="col-lg-6 text-muted text-center text-lg-start text-sm">
                <span> استعراض</span>
                <strong className="mx-1">{tablePagination?.from || 0}</strong>
                <span>إلى </span>
                <strong className="mx-1">{tablePagination?.to || 0}</strong>
                <span> من</span>
                <strong className="mx-1">{tablePagination?.total || 0}</strong>
                <span> النتائج</span>
            </div>
        </div>
    );
};

export default TablePagination

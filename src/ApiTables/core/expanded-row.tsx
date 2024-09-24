import * as React from "react"
import { useTableColumns } from "../table-providers/table-columns-provider"

function ExpandedRow({ data }: any) {
    const { tableColumns } = useTableColumns()
    return (
        <div style={{ maxWidth: '500px' }} className="expanded-row-component">
            <div className="row align-items-center text-end g-4 py-4">
                {tableColumns?.map((col: any, index: any) => (
                    <div className={`${col?.type === 'actions' ? 'col-lg-9' : 'col-lg-6'}`} key={index}>
                        <div className="h-100 w-100 d-flex px-3">
                            <i className="fa-solid fa-circle mt-2 text-primary flex-shrink-0" style={{ fontSize: '0.4rem' }}></i>
                            <div className="me-2 w-100">
                                <h6 className="text-sm mb-3">{col?.name}</h6>
                                <div className="text-end">
                                    {col?.cell(data)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default ExpandedRow

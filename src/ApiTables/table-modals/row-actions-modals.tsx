import { useTableColumns } from "../table-providers/table-columns-provider"
import parse from 'html-react-parser'
import * as React from "react"


// ... DataList Modal [Mostly Fail Reason Modal]
export function DatalistModal({ closeModal }) {
    const { rowSelectedModal } = useTableColumns()
    return (
        <>
            <div className="text-center mb-4">
                <h5>{rowSelectedModal?.label}</h5>
            </div>
            <ol className="list-unstyled p-0 mb-4">
                {rowSelectedModal?.value?.value?.map((item, index) => (
                    <li className="p-3 bg-light rounded mb-2" key={index}>{item}</li>
                ))}
            </ol>
            <button className="btn btn-dark py-2 w-100" onClick={closeModal}>إغلاق</button>
        </>
    )
}


// ... HTML Parsed Modal
export function HTMLParsedModal() {
    const { rowSelectedModal } = useTableColumns()

    return (
        <>
            <div className="text-center mb-4">
                <h5>{rowSelectedModal?.label}</h5>
            </div>
            {rowSelectedModal?.value && parse(rowSelectedModal?.value)}
        </>
    )
}

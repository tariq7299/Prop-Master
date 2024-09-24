import * as React from "react"
import { copyToClipboard } from "../table-utils/utils"
import { useTableColumns } from "../table-providers/table-columns-provider"

export function TextCell({ col, row }: any) {
    return (

        col?.values_formating && Object.keys(col?.values_formating)?.filter(key => row[col?.data_src] === col?.values_formating[key]['showValue'])?.length > 0 ? (
            Object.keys(col?.values_formating)?.filter(key => row[col?.data_src] === col?.values_formating[key]['showValue'])?.map((key, index) => (
                <span className={`status text-capitalize ${col?.values_formating[key]['style'] === 'success' ? 'active' : col?.values_formating[key]['style'] === 'danger' ? 'in-active' : col?.values_formating[key]['style'] === 'info' && 'info'}`} key={index}>
                    {row[col?.data_src]}
                </span>
            ))
        ) : (row[col?.data_src] === 'CR' || row[col?.data_src] === 'approved') ? (
            <span className="status active">{row[col?.data_src]}</span>
        ) : (row[col?.data_src] === 'DR' || row[col?.data_src] === 'pending') ? (
            <span className="status in-active">{row[col?.data_src]}</span>
        ) : (
            <p className="mb-0 text-wrap">{row[col?.data_src]}</p>
        )
    )
}



export function LinkCell({ col, row }: any) {
    return (
        <>
            {col?.linkStyle === 'text' ? (
                <a
                    href={row[col?.data_src]?.value || row[col?.data_src]}
                    className={`text-${col?.linkColor} ${(row[col?.data_src] === '!#' || row[col?.data_src]?.value === '!#' || !row[col?.data_src]) ? 'disabled pointer-events-none' : ''}`}
                    target='_blank'>
                    {row[col?.data_src]?.label || col?.linkText}
                </a>

            ) : col?.linkStyle === 'button' && (
                <a
                    href={row[col?.data_src]}
                    className={`btn btn-sm btn-opac-${col?.linkColor} ${(row[col?.data_src] === '!#' || !row[col?.data_src]) ? 'disabled pointer-events-none' : ''}`}
                    target='_blank'>
                    {col?.linkText}
                </a>
            )}

            {col?.showCopyBtn && (
                <button className="btn btn-opac-info btn-sm mx-1" type="button" onClick={() => copyToClipboard(row[col?.data_src])}>
                    نسخ الرابط
                </button>
            )}
        </>
    )
}


export function BooleanCell({ row, col }: any) {
    if (row[col?.data_src] === true) {
        return <span className={`status ${col?.values_formating?.revert_values ? 'in-active' : 'active'}`}>
            {col?.values_formating?.trueLabel}
        </span>
    }

    return (
        <span className={`status ${col?.values_formating?.revert_values ? 'active' : 'in-active'}`}>
            {col?.values_formating?.falseLabel}
        </span>
    )
}


export function HTMLCell({ col, row }: any) {
    const { tableColumnsDispatcher } = useTableColumns()
    return (
        <button
            className="btn btn-opac-dark btn-sm"
            onClick={() => {
                tableColumnsDispatcher({
                    type: 'SET_ROW_SELECTED_MODAL',
                    payload: {
                        label: col?.label,
                        value: row[col?.data_src]
                    }
                })
            }}
        >
            عرض
        </button>
    )
}


export function DataListCell({ col, row }: any) {
    const { tableColumnsDispatcher } = useTableColumns()



    return (
        col?.linkStyle === 'button' ? (
            <button
                className={`btn btn-opac-${col?.linkColor === 'default' ? 'secondary' : col?.linkColor || 'primary'} btn-sm`}
                onClick={() => {
                    tableColumnsDispatcher({
                        type: 'SET_ROW_SELECTED_MODAL',
                        payload: {
                            label: col?.label,
                            value: row[col?.data_src]
                        }
                    })
                }}
            >
                {col?.linkText}
            </button>
        ) : col?.linkStyle === 'link' && (
            <a
                className={`btn btn-link p-0 shadow-0 text-${col?.linkColor === 'default' ? 'secondary' : col?.linkColor || 'primary'} btn-sm`}
                href="#!"
                onClick={() => {
                    tableColumnsDispatcher({
                        type: 'SET_ROW_SELECTED_MODAL',
                        payload: {
                            label: col?.label,
                            value: row[col?.data_src]
                        }
                    })
                }}
            >
                {col?.linkText}
            </a>
        )
    )
}

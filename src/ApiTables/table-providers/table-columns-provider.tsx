import * as React from "react"
import { createContext, useReducer, useContext } from 'react';
import { BooleanCell, DataListCell, HTMLCell, LinkCell, TextCell } from "../general-components/column-cell-types"
import { truncateStart } from "../table-utils/utils"
import TableRowActions from '../core/table-row-actions';

const initialState = {
    tableColumns: [],
    visibleColumns: [],
    selectedRows: [],
    selectedIds: [],
    toggledClearRows: false,
    rowSelectedModal: null
};

// Reducer function
function tableColumnsReducer(state: any, action: any) {
    if (action.type === 'SET_SELECTED_ROWS') {
        return {
            ...state,
            selectedRows: action?.payload,
            selectedIds: action?.payload?.length > 0 ? action?.payload?.map((row: any) => row?.id) : []
        }
    }
    if (action.type === 'SET_TOGGLED_CLEAR_ROW') {
        return {
            ...state,
            toggledClearRows: action?.payload,
        }
    }
    if (action.type === 'SET_VISIBLE_COLUMNS') {
        return {
            ...state,
            visibleColumns: action?.payload,
            tableColumns: state.tableColumns?.map((col: any) => ({ ...col, omit: action?.payload?.indexOf(col?.data_src) === -1 }))
        }
    }
    if (action.type === 'SET_ROW_SELECTED_MODAL') {
        return {
            ...state,
            rowSelectedModal: action?.payload,
        }
    }
    if (action.type === 'SET_TABLE_COLUMNS') {
        return {
            ...state,
            tableColumns: action?.payload?.filter((col: any) => col?.showable)?.map((col: any) => {
                return {
                    name: <span className=" text-wrap text-muted-foreground lg:text-base ">{col?.label}</span>,
                    sortable: col?.sortable,
                    colIdentifier: col?.data_src,
                    data_src: col?.data_src,
                    type: col?.type,
                    selector: (row: any) => row[col?.data_src],
                    cell: (row: any) => {
                        return (
                            // <div row={row} className='text-sm tabel-col-cell w-100'>
                            <div className='w-full flex justify-center '>
                                {row[col?.data_src] === null ? (
                                    <p className="mb-0">-</p>
                                ) : row[col?.data_src] !== null && (
                                    <>
                                        {col?.type === 'text' ? (
                                            <TextCell col={col} row={row} />
                                        ) : col?.type === 'text_truncate' ? (
                                            <p className="mb-0 text-wrap">{truncateStart(row[col?.data_src], 20)}</p>
                                        ) : col?.type === 'link' ? (
                                            <LinkCell col={col} row={row} />
                                        ) : col?.type === 'boolean' ? (
                                            <BooleanCell col={col} row={row} />
                                        ) : col?.type === 'html' ? (
                                            <HTMLCell col={col} row={row} />
                                        ) : col?.type === 'datalist' ? (
                                            <DataListCell col={col} row={row} />
                                        ) : col?.type === 'actions' && (
                                            row?.actions && Object.keys(row?.actions)?.length > 0 && (
                                                <TableRowActions row={row} col={col} />
                                            )
                                        )}
                                    </>
                                )}
                            </div>
                        )
                    },
                }
            })
        }
    }
    return initialState
}

// Create context
const TableColumnsContext = createContext<any>(initialState);

export function useTableColumns() {
    return useContext(TableColumnsContext)
}

// Provider component
export default function TableColumnsProvider({ children }: any) {
    const [state, tableColumnsDispatcher] = useReducer(tableColumnsReducer, initialState);

    return (
        <TableColumnsContext.Provider value={{ ...state, tableColumnsDispatcher }}>
            {children}
        </TableColumnsContext.Provider>
    );
}

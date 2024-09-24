import * as React from "react";
import { createContext, useReducer, useContext } from 'react';

const initialState = {
    tableName: null,
    structureColumns: null,
    structureFilters: null,
    appliedFilters: [],
    renderedFilters: [],
    tableSorting: {},
    tableData: [],
    tableBindings: null,
    currentPage: 1,
    pageSize: 10,
    tablePagination: null,
    tableFetchingLoading: false
};

// Reducer function
function tableCoreReducer(state: any, action: any) {
    if (action.type === 'GET_TABLE_COMPONENTS') {
        return {
            ...state,
            tableName: action?.payload?.tableName,
            structureColumns: action?.payload?.columns,
            structureFilters: action?.payload?.filters,
        }
    }
    if (action.type === 'SET_APPLIED_FILTERS') {
        return {
            ...state,
            appliedFilters: action?.payload?.reduce((acc: any, curr: any) => {
                acc[curr.key] = curr;
                return acc;
            }, {})
        }
    }
    if (action.type === 'SET_RENDERED_FILTERS') {
        return {
            ...state,
            renderedFilters: action?.payload
        }
    }
    if (action.type === 'GET_TABLE_DATA') {
        return {
            ...state,
            tableData: action?.payload
        }
    }
    if (action.type === 'GET_TABLE_PAGINATION') {
        return {
            ...state,
            tablePagination: action?.payload
        }
    }
    if (action.type === 'GET_TABLE_BINDINGS') {
        return {
            ...state,
            tableBindings: action?.payload
        }
    }
    if (action.type === 'SET_TABLE_LOADING') {
        return {
            ...state,
            tableFetchingLoading: action?.payload
        }
    }
    if (action.type === 'SET_CURRENT_PAGE') {
        return {
            ...state,
            currentPage: action?.payload
        }
    }
    if (action.type === 'SET_TABLE_SORTING') {
        return {
            ...state,
            tableSorting: action?.payload
        }
    }
    if (action.type === 'CHANGE_PAGE_SIZE') {
        return {
            ...state,
            pageSize: action?.payload
        }
    }

    return initialState
}

// Create context
export const TableCoreContext = createContext<any>(initialState);

export function useTableCore() {
    return useContext(TableCoreContext)
}


// Provider component
export default function TableCoreProvider({ children }: any) {
    const [state, tableCoreDispatcher] = useReducer(tableCoreReducer, initialState);

    return (
        <TableCoreContext.Provider value={{ ...state, tableCoreDispatcher }}>
            {children}
        </TableCoreContext.Provider>
    );
}

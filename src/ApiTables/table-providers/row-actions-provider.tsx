import * as React from "react"
import { createContext, useReducer, useContext } from 'react';
import { downloadURL, objectToArrayValue } from "../table-utils/utils.tsx"
// import useAuth from '../../hooks/useAuth';
import { axiosPrivate } from '@/helper/axiosInstances';
// import { handleResponseErrors, handleNetworkErrors } from '../table-utils/errorHandling';
import { handleApiSuccess } from '@/helper/api-requests/handleApiSuccess';
import { handleApiError } from '@/helper/api-requests/handleApiError';
// import { toast } from 'react-toastify';
// import { router } from '@inertiajs/react';
import { useTableCore } from "./table-core-provider.tsx";
import { useTableColumns } from "./table-columns-provider.tsx";
import axios from 'axios';

const initialState = {
    structureRowActions: [],
    selectedRowActions: [],
    clickedRowAction: null,
    rowActionPostLoading: false,
    clickedRowActionResponse: null,
    customControlAction: null,
    actionsInRegularCells: false,
};

// Reducer function
function tableRowActionsReducer(state: any, action: any) {
    if (action.type === 'GET_STRUCTURE_ROW_ACTIONS') {
        return {
            ...state,
            structureRowActions: objectToArrayValue(action?.payload),
        }
    }
    if (action.type === 'CHECK_ACTIONS_IN_REGULAR_CELLS') {
        return {
            ...state,
            actionsInRegularCells: action.payload
        }
    }
    if (action.type === 'GET_SELECTED_ROW_ACTIONS') {
        return {
            ...state,
            selectedRowActions: objectToArrayValue(action?.payload)?.filter(action => action?.applicableAsBulkAction)
        }
    }
    if (action.type === 'SET_ROW_ACTION_POST_LOADING') {
        return {
            ...state,
            rowActionPostLoading: action?.payload
        }
    }
    if (action.type === 'GET_CLICKED_ROW_ACTION') {
        return {
            ...state,
            clickedRowAction: action?.payload
        }
    }
    if (action.type === 'GET_CLICKED_ROW_ACTION_RESPONSE') {
        return {
            ...state,
            clickedRowActionResponse: action?.payload
        }
    }
    if (action.type === 'GET_CUSTOM_CONTROL_REQUEST') {
        console.log("action in dispatch", action)
        return {
            ...state,
            customControlAction: action?.payload
        }
    }
    return initialState
}

// Create context
export const RowActionsContext = createContext<any>(initialState);

export function useTableRowActions() {
    return useContext(RowActionsContext)
}

// Provider component
export default function RowActionsProvider({ children }: any) {
    // const { axiosPrivate } = useAuth()
    const { tableData, tableCoreDispatcher } = useTableCore()
    const { tableColumnsDispatcher, toggledClearRows } = useTableColumns()
    const [state, rowActionsDispatcher] = useReducer(tableRowActionsReducer, initialState);

    // ... Function to reset the saved row action & its API response
    function resetClickedRowAction() {
        rowActionsDispatcher({ type: 'GET_CLICKED_ROW_ACTION', payload: null })
        rowActionsDispatcher({ type: 'GET_CLICKED_ROW_ACTION_RESPONSE', payload: null })
        rowActionsDispatcher({ type: 'GET_CUSTOM_CONTROL_REQUEST', payload: null })
        tableColumnsDispatcher({ type: 'SET_TOGGLED_CLEAR_ROW', payload: !toggledClearRows })
        tableColumnsDispatcher({ type: 'SET_SELECTED_ROWS', payload: [] })
    }

    function handleCommonCases(type: any, response: any) {
        if (type === 'deleteRow' || type === 'reload') {
            // router.reload()
            window.location.reload()
            resetClickedRowAction()
        } else if (type === 'refetchData') {
            tableCoreDispatcher({
                type: 'GET_TABLE_DATA',
                payload: tableData?.map((item: any) => {
                    const matchingItem = response?.items?.find(({ id }: any) => id === item?.id)
                    return matchingItem ? matchingItem : item;
                })
            })
            resetClickedRowAction()
        } else if (type === 'refetchRow') {
            tableCoreDispatcher({
                type: 'GET_TABLE_DATA',
                payload: tableData?.map((item: any) => {
                    if (item?.id !== response?.data?.row?.id) {
                        return item
                    } else {
                        return response?.data?.row
                    }
                })
            })
            resetClickedRowAction()
        } else if (type === 'downloadData') {
            downloadURL(response?.data?.file, response?.data?.name)
            resetClickedRowAction()
        }
    }

    // ... Function to take different actions on the table based on the row action reponse
    function handleRowActionRepsonse(action: any, response: any) {

        if (action?.isBulk) {
            handleCommonCases(action?.onBulkSuccess, response)
        } else {
            handleCommonCases(action?.onSuccess, response)
        }
    }

    // ... 🎯 Row Actions API Handler
    async function rowActionsPostHandler(method: any, url: any, payload: any, action: any, customHeader: any) {

        // . Start the inline loader
        rowActionsDispatcher({ type: 'SET_ROW_ACTION_POST_LOADING', payload: true })
        // . Save the clicked row action to a state
        rowActionsDispatcher({ type: 'GET_CLICKED_ROW_ACTION', payload: action })

        try {
            // const response = await axiosPrivate({
            //     method, url, data: { ...payload }, ...(customHeader && {
            //         headers: { ...customHeader }
            //     })
            // })

            const mockPayload = {
                success: true,
                payload: {
                    contractors_companies: ["Emaar, Amer"],
                },
                url: {
                    "web": "/add-new-project"
                },
                method: "post",
                onSuccess: "refetchRow"
            }

            console.log("actionnn", action)


            // Mock the correct return response of new row button action 
            if (action?.action_type !== 'custom_control') {
                rowActionsDispatcher({ type: 'GET_CLICKED_ROW_ACTION_RESPONSE', payload: mockPayload })
            } else if (action?.action_type === 'custom_control') {
                rowActionsDispatcher({ type: 'GET_CUSTOM_CONTROL_REQUEST', payload: mockPayload })
            }


            // . If a success response => save the reponse to a state & take an action on the table
            // handleResponseErrors(response, response?.data?.message, function () {
            //     if (action?.action_type !== 'custom_control') {
            //         rowActionsDispatcher({ type: 'GET_CLICKED_ROW_ACTION_RESPONSE', payload: response?.data })
            //     } else if (action?.action_type === 'custom_control') {
            //         rowActionsDispatcher({ type: 'GET_CUSTOM_CONTROL_REQUEST', payload: response?.data })
            //     }
            //     handleRowActionRepsonse(action, response?.data)

            //     // . In case of a fail response => Remove the row action from state
            // }, function () {
            //     resetClickedRowAction()
            // })

            // . If a success response => save the reponse to a state & take an action on the table

            // handleApiSuccess(response.data, true, '', function () {
            //     if (action?.action_type !== 'custom_control') {
            //         rowActionsDispatcher({ type: 'GET_CLICKED_ROW_ACTION_RESPONSE', payload: response?.data })
            //     } else if (action?.action_type === 'custom_control') {
            //         rowActionsDispatcher({ type: 'GET_CUSTOM_CONTROL_REQUEST', payload: response?.data })
            //     }
            //     handleRowActionRepsonse(action, response?.data)

            //     // . In case of a fail response => Remove the row action from state
            // })

            // // . In case of a fail response => Remove the row action from state
            // if (!response?.data?.success && response?.data?.message) {
            //     toast.error(response?.data?.message)
            //     resetClickedRowAction()
            // }

        } catch (err) {
            if (axios.isAxiosError(err) || (err instanceof Error)) {
                handleApiError(err, '', function () {
                    resetClickedRowAction()
                })
            } else {
                console.error(err)
            }
            // // // console.log(err)
            // // resetClickedRowAction()
            // handleNetworkErrors(err)

        } finally {
            // . End the inline loader
            rowActionsDispatcher({ type: 'SET_ROW_ACTION_POST_LOADING', payload: false })
        }
    }

    return (
        <RowActionsContext.Provider value={{ ...state, rowActionsDispatcher, rowActionsPostHandler, resetClickedRowAction }}>
            {children}
        </RowActionsContext.Provider>
    );

}

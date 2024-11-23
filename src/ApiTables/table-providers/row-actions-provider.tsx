import * as React from "react"
import { createContext, useReducer, useContext } from 'react';
import { downloadURL, objectToArrayValue } from "../table-utils/utils.tsx"
// import useAuth from '../../hooks/useAuth';
import { axiosPrivate } from '@/helper/api/axiosInstances.ts';
// import { handleResponseErrors, handleNetworkErrors } from '../table-utils/errorHandling';
import { handleApiSuccess } from '@/helper/api/handleApiSuccess.ts';
import { handleApiError } from '@/helper/api/handleApiError.ts';
// import { toast } from 'react-toastify';
// import { router } from '@inertiajs/react';
import { useTableCore } from "./table-core-provider.tsx";
import { useTableColumns } from "./table-columns-provider.tsx";
import axios from 'axios';
import { RowActionPostHandlerArgs } from "../types/table-actions.ts";

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
    const { tableData, tableCoreDispatcher, triggerTableFetcher } = useTableCore()
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

    function handleCommonCases(type: any, response: any, affectModalOpeningClosing: boolean) {
        // console.log("type", type)
        // console.log("response", response)
        if (type === 'deleteRow' || type === 'reload') {
            // router.reload()
            // window.location.reload()
            tableCoreDispatcher({
                type: 'TRIGGER_REFETCH_DATA'
            })
            affectModalOpeningClosing && resetClickedRowAction()
        } else if (type === 'refetchData') {
            tableCoreDispatcher({
                type: 'GET_TABLE_DATA',
                payload: tableData?.map((item: any) => {
                    const matchingItem = response?.items?.find(({ id }: any) => id === item?.id)
                    return matchingItem ? matchingItem : item;
                })
            })
            affectModalOpeningClosing && resetClickedRowAction()
        } else if (type === 'refetchRow') {
            console.log("type", type)
            console.log("response", response)

            tableCoreDispatcher({
                type: 'GET_TABLE_DATA',
                payload: tableData?.map((item: any) => {
                    1
                    if (item?.id !== response?.data?.row?.id) {
                        return item
                    } else {
                        return response?.data?.row
                    }
                })
            })
            affectModalOpeningClosing && resetClickedRowAction()
        } else if (type === 'downloadData') {
            downloadURL(response?.data?.file, response?.data?.name)
            affectModalOpeningClosing && resetClickedRowAction()
        }
    }

    // ... Function to take different actions on the table based on the row action reponse
    function handleRowActionRepsonse(action: any, response: any, affectModalOpeningClosing: boolean) {

        if (action?.isBulk) {
            handleCommonCases(action?.onBulkSuccess, response, affectModalOpeningClosing)
        } else {
            handleCommonCases(action?.onSuccess, response, affectModalOpeningClosing)
        }
    }

    // ... 🎯 Row Actions API Handler
    async function rowActionsPostHandler({ method, url, payload, action, customHeader = {}, showToast = false, customSuccessMsg = null, successCallback, errorCallBack, finalCallback, affectModalOpeningClosing = true }: RowActionPostHandlerArgs) {

        // . Start the inline loader
        rowActionsDispatcher({ type: 'SET_ROW_ACTION_POST_LOADING', payload: true })
        // . Save the clicked row action to a state
        rowActionsDispatcher({ type: 'GET_CLICKED_ROW_ACTION', payload: action })

        try {
            const response = await axiosPrivate({
                method, url, data: { ...payload }, ...(Object.keys(customHeader).length > 0 && {
                    headers: { ...customHeader }
                })
            })



            // const mockPayload = {
            //     success: true,
            //     payload: {
            //         contractors_companies: ["Emaar, Amer"],
            //     },
            //     url: {
            //         "web": "/add-new-project"
            //     },
            //     method: "post",
            //     onSuccess: "refetchRow"
            // }

            console.log("actionnn", action)


            // Mock the correct return response of new row button action 
            // if (action?.action_type !== 'custom_control') {
            //     rowActionsDispatcher({ type: 'GET_CLICKED_ROW_ACTION_RESPONSE', payload: mockPayload })
            // } else if (action?.action_type === 'custom_control') {
            //     rowActionsDispatcher({ type: 'GET_CUSTOM_CONTROL_REQUEST', payload: mockPayload })
            // }

            handleApiSuccess(response.data, showToast, customSuccessMsg, function () {

                // Some times i pass this as false, so it won't close the modal after submitting a request to api
                if (affectModalOpeningClosing) {

                    // This will store the action in a state
                    // This controls the opening and closing of the modal on screen
                    if (action?.action_type !== 'custom_control') {
                        rowActionsDispatcher({ type: 'GET_CLICKED_ROW_ACTION_RESPONSE', payload: response?.data })
                    } else if (action?.action_type === 'custom_control') {
                        rowActionsDispatcher({ type: 'GET_CUSTOM_CONTROL_REQUEST', payload: response?.data })
                    }

                }

                // This implement the onSuccess that is found in the "action" 
                handleRowActionRepsonse(action, response?.data, affectModalOpeningClosing)

                successCallback?.();

                // . In case of a fail response => Remove the row action from state
            })


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



            // // . In case of a fail response => Remove the row action from state
            // if (!response?.data?.success && response?.data?.message) {
            //     toast.error(response?.data?.message)
            //     resetClickedRowAction()
            // }

        } catch (err) {
            if (axios.isAxiosError(err) || (err instanceof Error)) {
                handleApiError(err, '', errorCallBack?.())
            } else {
                console.error(err)
            }
            // // // console.log(err)
            // // resetClickedRowAction()
            // handleNetworkErrors(err)

        } finally {
            // . End the inline loader
            rowActionsDispatcher({ type: 'SET_ROW_ACTION_POST_LOADING', payload: false })
            finalCallback?.()
        }
    }

    return (
        <RowActionsContext.Provider value={{ ...state, rowActionsDispatcher, rowActionsPostHandler, resetClickedRowAction }}>
            {children}
        </RowActionsContext.Provider>
    );

}

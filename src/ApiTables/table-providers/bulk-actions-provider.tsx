import * as React from "react"
import { createContext, useContext, useReducer } from 'react';
import { objectToArrayValue } from "../table-utils/utils"
// import useAuth from '../../hooks/useAuth';
import { axiosPrivate } from '@/helper/api/axiosInstances';
// import { handleResponseErrors, handleNetworkErrors } from '../table-utils/errorHandling';
import { handleApiSuccess } from '@/helper/api/handleApiSuccess';
import { handleApiError } from '@/helper/api/handleApiError';
import { FullPageLoader } from '@/hooks/app/types';
import { useApp } from '@/hooks/app/app-provider';
import axios from 'axios';
// import useApp from '../../hooks/useApp';
// import { router } from '@inertiajs/react';

const initialState = {
    bulkActions: [],
    selectedBulkAction: null,
    bulkActionPostLoading: false,
    bulkActionPostResponse: null
};

// Reducer function
function tableBulkActionsReducer(state: any, action: any) {
    if (action.type === 'GET_STRUCTURE_BULK_ACTIONS') {
        return {
            ...state,
            bulkActions: objectToArrayValue(action?.payload),
        }
    }
    if (action.type === 'GET_SELECTED_BULK_ACTION') {
        return {
            ...state,
            selectedBulkAction: action?.payload
        }
    }
    if (action.type === 'BULK_ACTION_POST_LOADING') {
        return {
            ...state,
            bulkActionPostLoading: action?.payload
        }
    }
    if (action.type === 'BULK_ACTION_POST_RESPONSE') {
        return {
            ...state,
            bulkActionPostResponse: action?.payload
        }
    }
    return initialState
}

// Create context
export const BulkActionsContext = createContext<any>(initialState);

export function useTableBulkActions() {
    return useContext(BulkActionsContext)
}

// Provider component
export default function BulkActionsProvider({ children }: any) {
    // const { axiosPrivate } = useAuth()
    // const { setMainLoader } = useApp()
    const { appState, appDispatch } = useApp();
    const [state, bulkActionsDispatcher] = useReducer(tableBulkActionsReducer, initialState);


    function handleBulkActionResponse(action: any) {

        // . If the response tells to Delete the Row or Reload the page => remove the action states
        if (action?.onSuccess === 'deleteRow' || action.onSuccess === 'reload') {

            // Replace this with page reload native function
            // router.reload({ only: ['auth'] })
            window.location.reload();

            bulkActionsDispatcher({ type: 'GET_SELECTED_BULK_ACTION', payload: null })
        }
    }



    // ... 🎯 Bulk Actions API Handler
    // async function bulkActionsPostHandler(method, url, payload, loaderInfo, action) {
    async function bulkActionsPostHandler(method: any, url: any, payload: any, fullPageLoader: FullPageLoader, action: any) {

        // . Start the inline loader
        bulkActionsDispatcher({ type: 'BULK_ACTION_POST_LOADING', payload: true })

        // Add full page loader to function
        // loaderInfo && setMainLoader(true, loaderInfo?.msg, loaderInfo?.icon)
        fullPageLoader && appDispatch({ type: "FULL_PAGE_LOADING", payload: { isLoading: fullPageLoader?.isLoading || false, loadingMsg: fullPageLoader?.loadingMsg || "Processing...", loadingIconName: fullPageLoader?.loadingIconName || "loader--1" } })


        try {
            const response = await axiosPrivate({ method, url, data: { ...payload } })
            // . If a success response => save the response data to a state

            handleApiSuccess(response.data, true, '', () => {
                bulkActionsDispatcher({ type: 'BULK_ACTION_POST_RESPONSE', payload: response?.data })
                handleBulkActionResponse(action)
            })

            // handleResponseErrors(response, response?.data?.message, function () {
            //     bulkActionsDispatcher({ type: 'BULK_ACTION_POST_RESPONSE', payload: response?.data })
            //     handleBulkActionResponse(action)
            // }, null)

        } catch (err) {
            // handleNetworkErrors(err)
            if (axios.isAxiosError(err) || err instanceof Error) {
                handleApiError(err)
            } else {
                console.log(err)
            }

        } finally {
            // . End the inline loader
            bulkActionsDispatcher({ type: 'BULK_ACTION_POST_LOADING', payload: false })
            // . Remove the selected bulk action state
            bulkActionsDispatcher({ type: 'GET_SELECTED_BULK_ACTION', payload: null })
            // . End full page loader
            fullPageLoader && appDispatch({ type: "FULL_PAGE_LOADING", payload: { ...appState, isLoading: false } })
        }
    }

    return (
        <BulkActionsContext.Provider value={{ ...state, bulkActionsDispatcher, bulkActionsPostHandler }}>
            {children}
        </BulkActionsContext.Provider>
    );

}

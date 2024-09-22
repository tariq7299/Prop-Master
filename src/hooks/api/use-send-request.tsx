import { useState } from "react"
import { handleApiError } from "@/helper/api-requests/handleApiError"
import { handleApiSuccess } from "@/helper/api-requests/handleApiSuccess"
import { useApp } from "../app/app-provider"
import { axiosPrivate } from "@/helper/axiosInstances"
import axios from "axios"
import { SendRequest } from "@/helper/api-requests/types"
import { FullPageLoader } from "../app/types"

function useSendRequest() {

    const { appDispatch } = useApp();

    const [isLoading, setIsLoading] = useState(false)

    // Add a generic type function that will make the useState be the type that I provide to it from useSendRequest()
    const [resData, setResData] = useState(null)

    // Add types to theeese parameters
    async function sendRequest({ reqOptions, apiResFuncArgs, fullPageLoader, finalCallback }: SendRequest) {

        console.log("apiResFuncArgs", apiResFuncArgs)
        console.log("reqOptions", reqOptions)
        console.log("fullPageLoader", fullPageLoader)

        setIsLoading(true)

        // Check if this will check if fullPageLoader is not empty of not
        // check if loadingIconName is of type 'progressBar' and if yes then add the value of this key to appDispatch
        // if (fullPageLoader) {
        appDispatch({ type: "FULL_PAGE_LOADING", payload: { isLoading: true, loadingMsg: fullPageLoader?.loadingMsg || "Processing...", loadingIconName: fullPageLoader?.loadingIconName || "3dLoader", ...(fullPageLoader?.loadingIconName === "progressBar" ? { progressBarValue: 100 } : {}) } })
        // }

        try {
            const response = await axiosPrivate({
                ...reqOptions,
                method: reqOptions?.method || 'POST'
            })
            handleApiSuccess(response?.data, apiResFuncArgs?.showToast || true, apiResFuncArgs?.customMsg || '', function () {
                setResData(response?.data)
                if (apiResFuncArgs?.successCallback && typeof apiResFuncArgs.successCallback === 'function') {
                    apiResFuncArgs.successCallback(response?.data)
                }
            })
        } catch (error) {
            if (axios.isAxiosError(error) || (error instanceof Error)) {
                handleApiError(error, apiResFuncArgs?.customMsg, function () {
                    if (apiResFuncArgs?.errorCallBack && typeof apiResFuncArgs.errorCallBack === 'function') {
                        apiResFuncArgs.errorCallBack(error)
                    }
                })
            } else {
                console.error(error)
            }
        } finally {
            finalCallback && finalCallback()
            setIsLoading(false)
            appDispatch({ type: "FULL_PAGE_LOADING", payload: { isLoading: false, loadingMsg: '', loadingIconName: '' } })
        }
    }


    return { resData, isLoading, sendRequest }

}


export default useSendRequest

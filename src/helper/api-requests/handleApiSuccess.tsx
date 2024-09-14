import type { ToastActionElement, ToastProps } from '@/components/ui/toast'
import { AxiosError } from 'axios';
import { toastErrors } from './toastApiMsgs';

type ToasterToast = ToastProps & {
    id: string
    title?: React.ReactNode
    description?: React.ReactNode
    action?: ToastActionElement
}
type Toast = Omit<ToasterToast, 'id'>

type SuccessCallback = () => void;

function handleApiSuccess(
    // Change this type to successResponse
    successResponse: AxiosError,
    toast: (props: Toast) => void,
    customSuccessMsg?: "string",
    successCallback?: SuccessCallback
) {
    const statusCode = successResponse?.status;
    let successMessage = customSuccessMsg || (successResponse?.data as any)?.msg || '';

    if (successResponse?.success) {
        switch (statusCode) {
            case 200 || 204:
                successMessage = successMessage || 'Successful! your request has successedded';
                break;
            case 201:
                successMessage = successMessage || 'Created: The resource was successfully created';
                break;
            case 202:
                successMessage = successMessage || 'Successful! your request is processing';
                break;
            default:
                if (statusCode && statusCode >= 200 && statusCode < 304) {
                    successMessage = successMessage || 'Successful! your request has successedded';
                } else {
                    threw Error(successMessage || 'An unknown error occurred, Please contact support!')
                }
        }
    } else {
        threw Error(successMessage || 'An unknown error occurred, Please contact support!')
    }



    toastErrors(successMessage, toast);
    successCallback?.();
}

export { handleApiSuccess }
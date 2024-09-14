import type { ToastActionElement, ToastProps } from '@/components/ui/toast'
import { SuccessApiResponse } from './types';
import { toastApiMsgs } from './toastApiMsgs';

// import { Toast } from '@/components/ui/toast';

type ToasterToast = ToastProps & {
    id: string
    title?: React.ReactNode
    description?: React.ReactNode
    action?: ToastActionElement
}
type Toast = Omit<ToasterToast, 'id'>

type SuccessCallback = () => void;

function handleApiSuccess(
    successResponse: SuccessApiResponse,
    toast: (props: Toast) => void,
    customSuccessMsg?: string,
    successCallback?: SuccessCallback
): void {
    const { code: statusCode, success, msg } = successResponse;
    let successMessage = customSuccessMsg || msg || '';

    if (!success) {
        throw new Error(successMessage || 'An unknown error occurred. Please contact support!');
    }

    const defaultMessages: Record<number, string> = {
        200: 'Successful! Your request has succeeded.',
        201: 'Created: The resource was successfully created.',
        202: 'Accepted: Your request is being processed.',
        204: 'Successful! The request was processed with no content to return.',
    };

    successMessage = successMessage || defaultMessages[statusCode] || 'Successful! Your request has succeeded.';

    if (statusCode < 200 || statusCode >= 300) {
        throw new Error(successMessage || 'An unexpected status code was received. Please contact support!');
    }

    toastApiMsgs(successMessage, toast, "success");
    successCallback?.();
}


export { handleApiSuccess };
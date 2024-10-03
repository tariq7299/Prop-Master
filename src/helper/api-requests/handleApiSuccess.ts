import { SuccessApiResponse } from './types';
import { toastApiMsgs } from './toastApiMsgs';
import { SuccessCallback } from './types';
import { toast } from '@/components/ui/use-toast'


function handleApiSuccess(
    successResponse: SuccessApiResponse,
    showToast: boolean = true,
    customSuccessMsg: string | null = null,
    successCallback?: SuccessCallback,
): void {


    const { code: statusCode, success, msg } = successResponse;

    if (!success) {
        throw new Error('An unknown error occurred. Please contact support!');
    }

    if (showToast) {

        let successMessage = customSuccessMsg || msg;
        const defaultMessages: Record<number, string> = {
            200: 'Successful! Your request has succeeded.',
            201: 'Created: The resource was successfully created.',
            202: 'Accepted: Your request is being processed.',
            204: 'Successful! The request was processed with no content to return.',
        };

        successMessage = successMessage || defaultMessages[statusCode] || 'Successful! Your request has succeeded.';

        if (statusCode < 200 || statusCode >= 300) {
            throw new Error('An unexpected status code was received. Please contact support!');
        }
        toastApiMsgs(successMessage, toast, "success");
    }

    successCallback?.();
}


export { handleApiSuccess };
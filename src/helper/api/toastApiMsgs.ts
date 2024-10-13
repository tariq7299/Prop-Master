
import type { ToastActionElement, ToastProps } from '@/components/ui/toast'
import { Messages } from './types';

type ToasterToast = ToastProps & {
    id: string
    title?: React.ReactNode
    description?: React.ReactNode
    action?: ToastActionElement
}
type Toast = Omit<ToasterToast, 'id'>
import { toast } from "sonner"

// type Messages = string | string[] | { [key: string]: string | string[] };
type ToastType = 'destructive' | 'success' | 'info' | 'warning';
type ToastVariant = 'message' | 'error' | 'success' | 'info' | 'warning';



function toastApiMsgs(messages: Messages, toastType: ToastType,
    toastVariant?: ToastVariant) {

    const titles = {
        destructive: ["Oops! Something went wrong", "Error encountered", "That didn't work as planned"],
        success: ["Success!", "Great job!", "Mission accomplished"],
        info: ["Just so you know", "Heads up", "FYI"],
        warning: ["Watch out", "Caution", "Heads up"]
    };


    const randomTitle = titles[toastType][Math.floor(Math.random() * titles[toastType].length)];

    const defaultVariant: ToastVariant =
        toastType === 'destructive' ? 'error' :
            toastType === 'success' ? 'success' :
                toastType === 'info' ? 'info' :
                    toastType === 'warning' ? 'warning' :
                        'message';

    // Handle single string error
    if (typeof messages === 'string') {
        const message = messages
        toast[toastVariant || defaultVariant](randomTitle, {
            // title: randomTitle,
            description: message,
            // variant: toastVariant || defaultVariant
        });
    }
    // Handle array of string messages
    else if (Array.isArray(messages)) {
        messages.forEach(message => {
            toast[toastVariant || defaultVariant](randomTitle, {
                // title: randomTitle,
                description: message,
                // variant: toastVariant || defaultVariant
            });
        });
    }
    // Handle object with dynamic keys
    else if (typeof messages === 'object' && messages !== null) {
        Object.keys(messages).forEach(key => {
            const messageValue = messages[key];

            if (Array.isArray(messageValue)) {
                // Handle array of strings within the object
                messageValue.forEach(message => {
                    toast[toastVariant || defaultVariant](randomTitle, {
                        // title: randomTitle,
                        description: message,
                        // variant: toastVariant || defaultVariant
                    });
                });
            } else if (typeof messageValue === 'string') {
                // Handle single string within the object
                toast[toastVariant || defaultVariant](randomTitle, {
                    // title: randomTitle,
                    description: messageValue,
                    // variant: toastVariant || defaultVariant
                });
            }
        });
    }
}

export { toastApiMsgs }


import type { ToastActionElement, ToastProps } from '@/components/ui/toast'
import { error } from 'console'

type ToasterToast = ToastProps & {
    id: string
    title?: React.ReactNode
    description?: React.ReactNode
    action?: ToastActionElement
}
type Toast = Omit<ToasterToast, 'id'>

// Single string error
type SingleErrorString = string;

// Array of string errors
type ArrayOfStringErrors = string[];

// Object with dynamic keys, each value being either a string or an array of strings
type ErrorsObject = {
    [key: string]: string | string[];
};

// Union type to represent all possible error formats
type Errors = SingleErrorString | ArrayOfStringErrors | ErrorsObject;


function toastErrors(errors: Errors, toast: (props: Toast) => void) {
    // Handle single string error
    if (typeof errors === 'string') {
        const errorMsg = errors
        toast({
            // variant: "destructive",
            description: errorMsg,
        });
    }
    // Handle array of string errors
    else if (Array.isArray(errors)) {
        errors.forEach(errorMsg => {
            toast({
                // variant: "destructive",
                description: errorMsg,
            });
        });
    }
    // Handle object with dynamic keys
    else if (typeof errors === 'object' && errors !== null) {
        Object.keys(errors).forEach(key => {
            const errorValue = errors[key];

            if (Array.isArray(errorValue)) {
                // Handle array of strings within the object
                errorValue.forEach(errorMsg => {
                    toast({
                        // variant: "destructive",
                        description: errorMsg,
                    });
                });
            } else if (typeof errorValue === 'string') {
                // Handle single string within the object
                toast({
                    // variant: "destructive",
                    description: errorValue,
                });
            }
        });
    }
}

export { toastErrors }

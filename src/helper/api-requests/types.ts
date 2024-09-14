import type { ToastActionElement, ToastProps } from '@/components/ui/toast'

export type Messages = string | string[] | { [key: string]: string | string[] };

export type SuccessApiResponse = {
    success: boolean;
    code: number;
    msg?: string;
    data: {
      [key: string]: any;
    };
}

export type ToasterToast = ToastProps & {
    id: string
    title?: React.ReactNode
    description?: React.ReactNode
    action?: ToastActionElement
}
export type Toast = Omit<ToasterToast, 'id'>

export type ErrorCallback = () => void;

export type SuccessCallback = () => void;
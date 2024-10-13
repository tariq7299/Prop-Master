import type { ToastActionElement, ToastProps } from '@/components/ui/toast'
import { FullPageLoader } from '@/hooks/app/types';
import { AxiosError } from 'axios';

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

export type ErrorCallback = (data?: any) => void;

export type SuccessCallback = (data?: any) => void;

export type ReqOptions = {
  method?: string,
  header?: {
    [key: string]: any;
  },
  url: string,
  data?: any,
  trigger?: boolean
}

export type ApiResFuncArgs = {
  apiResponse?: SuccessApiResponse | AxiosError | Error,
  customMsg?: string | null,
  showToast?: boolean,
  successCallback?: SuccessCallback,
  errorCallBack?: ErrorCallback,
}

export type SendRequest = {
  reqOptions: ReqOptions,
  apiResFuncArgs?: Partial<ApiResFuncArgs>
  fullPageLoader?: Partial<FullPageLoader>,
  finalCallback?: (arg0?: any) => void
}
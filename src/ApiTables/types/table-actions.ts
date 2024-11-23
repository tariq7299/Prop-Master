export type RowActionPostHandlerArgs = {
    method: "post" | "get"
    url: string
    payload: any
    action: any
    customHeader: {}
    showToast: boolean
    customSuccessMsg: string | null
    successCallback: (...args: any[]) => any
    errorCallBack: (...args: any[]) => any
    finalCallback: (...args: any[]) => any
    affectModalOpeningClosing: boolean
}

export type OnSuccess =
    | 'deleteRow'
    | 'reload'
    | 'refetchData'
    | 'refetchRow'
    | 'downloadData'
    | 'OpenModalForm';

export type CustomControlAction<T> = {
    success: boolean;
    message: string;
    action_key: string;
    payload: T;
    data: any;
    url: {
        web: string;
        api: string;
    };
    method: 'post' | 'get';
    onSuccess: OnSuccess;
};
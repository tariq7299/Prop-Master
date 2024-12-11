import { FullPageLoader } from "@/hooks/app/types"

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
    fullPageLoader: FullPageLoader
}

export type OnSuccess =
    | 'deleteRow'
    | 'reload'
    | 'refetchData'
    | 'refetchRow'
    | 'downloadData'
    | 'OpenModalForm';

export type ActionKey =
    | 'edit_project'
    | 'edit_project_image'
    | 'record_data';

export type ActionType =
    | 'custom_control'
    | 'normal';

export type ApplicableForRow = "showActionsBtns"

export type ClickedRowAction<T> = {
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

export interface RowAction {
    action_key: ActionKey
    action_type: ActionType,
    showInMobileApp: boolean,
    showInWeb: boolean,
    need_confirmation: boolean,
    applicableAsBulkAction: boolean,
    action: {
        api: string
        web: string
    }
    button: {
        label: string,
        btnClasses: string[]
    }
    method: "post" | "get"
    onSuccess: OnSuccess
    payload_keys: number[]
    applicableForRow: ApplicableForRow
}

export interface RowActonResponse {
    success: boolean;
    message: string;
    url: {
        web: string;
        api: string;
    };
    method: 'post' | 'get';
    onSuccess: OnSuccess;
};

export interface ClickedRowActionResponse<DataT> extends RowActonResponse {
    type: string
    data: DataT;
};

export interface CustomControlActionResponse<PayloadT> extends RowActonResponse {
    action_key: string;
    payload: PayloadT;
    data?: any;
    method: 'post' | 'get';
    onSuccess: OnSuccess;
};

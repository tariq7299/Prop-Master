export type AppState = {
    isLoading: boolean,
    loadingMsg: string,
    loadingIconName: string,
    progressBarValue?: number
}

export type AppContext = {
    appDispatch: (action: {type: string, payload: AppState}) => AppState | void,
    appState: AppState
}


const initialAppState = {
    isLoading: false,
    loadingMsg: 'Processing...',
    loadingIconName: "3dLoader",
    progressBarValue: 10
}


export {initialAppState}
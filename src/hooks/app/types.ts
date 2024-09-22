export type AppState = {
    isLoading: boolean,
    loadingMsg: string,
    loadingIconName: string,
}

export type FullPageLoader = {
    isLoading?: boolean,
    loadingMsg?: string,
    loadingIconName?: string,
}

export type AppContext = {
    appDispatch: (action: { type: string, payload: AppState }) => AppState | void,
    appState: AppState
}


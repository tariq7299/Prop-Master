export type AppState = {
    isLoading: boolean,
    loadingMsg: string,
    loadingIconName: string,
    

}

export type AppContext = {
    appDispatch: (action: {type: string, payload: AppState}) => AppState | void,
    appState: AppState
}


const initialAppState = {
    isLoading: true,
    loadingMsg: 'Processing...',
    loadingIconName: "progressBar", // Add default Icon name that will render a default icon
}


export {initialAppState}
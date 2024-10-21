import { useContext } from "react"
import AppContext from "./app-context"
// import { appState, appDispatch } from "./app-reducer"
import { useReducer } from "react"
import { appReducer } from "./app-reducer"

const initialAppState = {
    isLoading: false,
    loadingMsg: 'Processing...',
    loadingIconName: "loader--2",
}


const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [appState, appDispatch] = useReducer(appReducer, initialAppState)

    const contextValue = {
        appDispatch: appDispatch,
        appState: appState
    }

    return <AppContext.Provider value={contextValue} >{children}</AppContext.Provider>
}

export const useApp = () => {
    return useContext(AppContext)
}

export default AppProvider;
import { createContext } from "react"
// We added "type" becasue there is a value of AppContext with the same name
import { type AppContext } from "./types"

const initialAppState = {
    isLoading: false,
    loadingMsg: 'Processing...',
    loadingIconName: "loader--1",
}


const AppContext = createContext<AppContext>({
    appDispatch: () => { },
    appState: initialAppState
})

export default AppContext
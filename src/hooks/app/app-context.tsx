import { createContext } from "react"
// We added "type" becasue there is a value of AppContext with the same name
import { initialAppState, type AppContext } from "./types"

const AppContext = createContext<AppContext>({
    appDispatch: () => { },
    appState: initialAppState
})

export default AppContext
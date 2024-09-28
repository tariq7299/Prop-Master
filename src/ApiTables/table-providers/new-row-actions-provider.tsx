import * as React from "react"
import { objectToArrayValue } from "../table-utils/utils"


const initialState = {
    newRowActionsArray: []
}

const NewRowActionsContext = React.createContext<any>(initialState)

function newRowActionsReducer(state: any, action: any) {
    if (action.type === "EXTRACT_NEW_ROW_ACTIONS") {
        return {
            ...state,
            newRowActionsArray: objectToArrayValue(action.payload)
        }
    }
    return initialState
}

export function useTableNewRowActions() {
    return React.useContext(NewRowActionsContext)
}


export default function NewRowActionsProvider({ children }: any) {
    const [state, newRowActionsDispatcher] = React.useReducer(newRowActionsReducer, initialState)

    return (
        <NewRowActionsContext.Provider value={{ ...state, newRowActionsDispatcher }}>
            {children}
        </NewRowActionsContext.Provider>
    )
}


import type { AppState } from "./types"


const appReducer = (state: AppState, action: { type: string, payload: AppState }) => {
    switch (action.type) {
        case "FULL_PAGE_LOADING":
            return { ...state, isLoading: action.payload.isLoading, loadingMsg: action.payload.loadingMsg, loadingIconName: action.payload.loadingIconName }
        default:
            throw new Error("Unknown action");
    }
}

export { appReducer }
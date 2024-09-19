import { useState } from "react"
import { Progress } from "../ui/progress"
import { useApp } from "@/hooks/app/app-provider";

function FullPageLoading() {
    const [progressValue, setProgressValue] = useState(10);
    const { appState, appDispatch } = useApp()

    return (
        <div className="w-full h-full bg-slate-300">
            {appState.loadingIconName === "progressBar" && (
                <>
                    <h1>{appState.loadingMsg}</h1>
                    <Progress className="w-[60vw]" value={progressValue} >
                    </Progress>
                </>
            )}

        </div>
    )
}

export default FullPageLoading
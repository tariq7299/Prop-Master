import { Progress } from "../ui/progress"
import { useApp } from "@/hooks/app/app-provider";

function FullPageLoading() {
    const { appState } = useApp()

    return (
        <div className="fixed top-0 left-0 w-full bg-background/80 h-full z-50  flex flex-col justify-center items-center ">
            {/* // <div className="fixed inset-0 flex items-center justify-center bg-slate-300 bg-opacity-75 z-50"> */}
            {appState.loadingIconName === "progressBar" ? (
                <>
                    <h1 className="mb-4 text-xl font-bold">{appState.loadingMsg}</h1>
                    {/* Add max width to progress bar */}
                    <Progress className="w-[50vw] h-6 max-w-[450px] " value={85} >
                    </Progress>
                </>
            ) : appState.loadingIconName === "loader--1" ? (
                <>
                    <h1 className="mb-4 text-xl font-bold">{appState.loadingMsg}</h1>
                    <div className="loader--1" />
                </>
            ) : appState.loadingIconName === "loader--2" ? (
                <>
                    <h1 className="mb-4 text-xl font-bold">{appState.loadingMsg}</h1>
                    <div className="loader--2" />
                </>
            ) : (
                <>
                    {/* {throw new Error("")} */}
                </>
            )}

        </div>
    )
}

export default FullPageLoading
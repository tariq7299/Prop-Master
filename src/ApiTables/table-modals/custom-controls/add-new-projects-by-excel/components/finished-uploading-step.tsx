import * as React from "react";
import { FileCheck } from 'lucide-react';
import { Badge } from "@/components/ui/badge";


export default function FinishedUploadingStep() {
    const [timeRemaining, setTimeRemaining] = React.useState(3);

    React.useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime === 0) {
                    clearInterval(timerInterval);
                    // Perform actions when the timer reaches zero
                    console.log('Countdown complete!');
                    return 0;
                } else {
                    return prevTime - 1;
                }
            });
        }, 1000);
        // Cleanup the interval when the component unmounts
        return () => clearInterval(timerInterval);
    }, []);



    return (
        <div className="flex flex-col justify-center items-center py-24 gap-2">

            <FileCheck className="w-1/3 h-auto max-w-40 text-success"></FileCheck>
            <p className="md:text-lg font-bold tracking-wider text-success-600">File uploaded successfully!</p>

            <p className="italic text-warning-600 text-sm">
                You will be redirected to the <span className="font-bold tracking-wider">Upload History</span> page in
                <span className=" font-bold text-warning-600"> {timeRemaining} seconds</span>.
                Please wait...
            </p>

        </div>
    )
}
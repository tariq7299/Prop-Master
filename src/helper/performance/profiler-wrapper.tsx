import * as React from "react";

// Wrapper for React Profiler API
export const ProfilingWrapper = ({ id, children, onProfile }) => {

    const handleProfile = (
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions
    ) => {
        console.log({
            componentId: id,
            phase,
            actualDuration,
            baseDuration,
            startTime,
            commitTime
        });

        if (onProfile) {
            onProfile({
                actualDuration,
                baseDuration,
                startTime,
                commitTime
            });
        }

    };

    return (
        <React.Profiler id={id} onRender={handleProfile}>
            {children}
        </React.Profiler>
    );
};
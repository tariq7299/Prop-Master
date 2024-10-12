import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const StepsProgress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn(
            "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
            className
        )}
        {...props}
    >
        <div className="absolute left-0 rounded-full w-20 h-20 bg-primary-200"></div>
        <ProgressPrimitive.Indicator
            className=" h-full w-full flex-1 bg-current transition-all"
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        >
        </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
))
StepsProgress.displayName = ProgressPrimitive.Root.displayName

export { StepsProgress }

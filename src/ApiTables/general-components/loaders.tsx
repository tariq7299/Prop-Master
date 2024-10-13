import * as React from "react"
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Skeleton } from "@/components/ui/skeleton";

export function TableLoader({ count }: any) {

    console.log("count", count)

    return (

        <div className="grid items-center gap-2 w-full py-3 bg-background">
            {Array.from({ length: count }, (_, index) => {
                return (

                    <Skeleton key={index} className="h-12 w-full bg-muted-foreground/20  " />
                )
            })}
        </div>
    );
}

// export function TableLoader({ count }: any) {
//     return (

//         <SkeletonTheme
//             baseColor='#f5f5f5' highlightColor='#eee'
//         >
//             <div className='w-100 P-4'>
//                 <p className='mb-0 p-2'>
//                     <Skeleton count={count} height={50} />
//                 </p>
//             </div>
//         </SkeletonTheme>
//     );
// }



import * as React from "react"

export default function DrawerTest({ open, children, modalTitle, modalDescription }) {


    return (

        <>
            {
                // open && (

                <div className={`transition-all duration-300 ease-in-out fixed inset-0 z-50 bg-black/80 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <div className={`transition-all duration-300 ease-in-out transform fixed inset-x-0 bottom-0 z-50 mt-24 flex flex-col rounded-t-[10px] border bg-background max-h-[98%] p-4 pt-0 ${open ? "translate-y-0" : "translate-y-full"} `}>
                        <div className="grid gap-1.5 sm:text-left py-4 text-left"><h2 id="radix-:rg:" className="text-lg font-semibold leading-none tracking-tight">{modalTitle}</h2><p id="radix-:rh:" className="text-sm text-muted-foreground">{modalDescription}</p>
                        </div>
                        {children}
                    </div>
                </div>
                // )
            }
        </>

    )
}



import * as React from "react"

export default function DrawerTest({ open, onOpenChange, children }) {

    // const [open, setOpen] = React.useState(false);







    return (

        <>
            {
                open && (

                    <div className="fixed inset-0 z-50 bg-black/80">
                        <div className="fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background max-h-[85%] p-4 pt-0">
                            <div className="grid gap-1.5 sm:text-left py-4 text-left"><h2 id="radix-:rg:" className="text-lg font-semibold leading-none tracking-tight"><p className="text-xl">Add New Project</p></h2><p id="radix-:rh:" className="text-sm text-muted-foreground">Fill in the details of the new project</p>
                            </div>
                            <div id="drawer-content">
                                {children}
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    )
}



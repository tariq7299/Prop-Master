import * as React from "react"

import { useMediaQuery } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogOverlay,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import DrawerTest from "./DrawerTest";

// import Drawer from 'react-modern-drawer'


export default function DrawerDialog({ status, handleCloseModal, modalTitle, modalDescription, modalFooter, children, hasCloseButton, className }: any) {
    // const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")


    // Change this to custom min width ! using useMediaQuery
    if (isDesktop) {
        return (
            <Dialog open={status} onOpenChange={handleCloseModal}>
                <DialogContent className={className} hasCloseButton={hasCloseButton} onPointerDownOutside={(e) => e.preventDefault()} onInteractOutside={() => { }}>
                    <DialogHeader>
                        <DialogTitle>{modalTitle}</DialogTitle>
                        <DialogDescription>{modalDescription}</DialogDescription>
                    </DialogHeader>
                    {children}
                    {/* <DialogFooter className="pt-2">
                        {modalFooter}
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter> */}
                </DialogContent>
            </Dialog>
        )
    }

    return (

        <DrawerTest open={status} onOpenChange={handleCloseModal} modalTitle={modalTitle} modalDescription={modalDescription} hasCloseButton={hasCloseButton} >
            {children}
        </DrawerTest>



        // <Drawer open={status} onOpenChange={handleCloseModal} >

        //     <DrawerContent className="">
        //         <DrawerHeader className="text-left">
        //             <DrawerTitle>{modalTitle}</DrawerTitle>
        //             <DrawerDescription>{modalDescription}</DrawerDescription>
        //         </DrawerHeader>
        //         {/* {children} */}
        //         {/* <DrawerFooter className="pt-2">
        //             {modalFooter}
        //             <DrawerClose asChild >
        //                 <Button variant="outline">Cancel</Button>
        //             </DrawerClose>
        //         </DrawerFooter> */}
        //     </DrawerContent>
        // </Drawer>
    )
}


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import React, { Dispatch, SetStateAction, ReactNode } from "react";


// generic interface for the alert status
export interface ConfirmationAlertStatus<T> {
    isOpen: boolean;
    itemToRemove: T | null;
}

// Generic type for the component props
type ConfirmationAlertProps<T> = React.HTMLAttributes<HTMLDivElement> & {
    confirmationAlertStatus: ConfirmationAlertStatus<T>;
    setConfirmationAlertStatus: Dispatch<SetStateAction<ConfirmationAlertStatus<T>>>;
    // Or you can write it like this
    // setConfirmationAlertStatus: (confirmationAlertStatus: ConfirmationAlertStatus<T>) => void;
    handleConfirmation: (item: T | null) => void;
    alertTitle?: string | ReactNode;
    discription?: string;
}


// The generic component
function ConfirmationAlert<T>({
    setConfirmationAlertStatus,
    confirmationAlertStatus,
    className = "",
    handleConfirmation,
    alertTitle = "Confirm Deletion",
    discription = "Are you sure you want to delete this item?"
}: ConfirmationAlertProps<T>) {

    const handleConfirm = () => {
        handleConfirmation(confirmationAlertStatus.itemToRemove);
    };

    const handleCancel = () => {
        setConfirmationAlertStatus({ isOpen: false, itemToRemove: null });
    };


    return (
        <AlertDialog open={confirmationAlertStatus?.isOpen}>
            <AlertDialogContent className={className} >
                <AlertDialogHeader>
                    <AlertDialogTitle className="">{alertTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {discription}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive hover:bg-destructive/80" onClick={handleConfirm}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )

}
export { ConfirmationAlert };
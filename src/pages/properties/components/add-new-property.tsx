import * as React from "react";
import { useTableCore } from "@/ApiTables/table-providers/table-core-provider";
import PropertyDetailsForm from "./property-details-form";

// Write types
export default function AddNewProperty({ action, handleCloseModal }: any) {

    const { tableCoreDispatcher } = useTableCore()


    return (
        <PropertyDetailsForm />
    )
}
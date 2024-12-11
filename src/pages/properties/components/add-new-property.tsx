import * as React from "react";
import PropertyDetailsForm from "./property-details-form";

// Write types
export default function AddNewProperty({ handleCloseModal }: any) {


    return (
        <PropertyDetailsForm handleCloseModal={handleCloseModal} />
    )
}
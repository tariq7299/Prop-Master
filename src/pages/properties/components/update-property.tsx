
import { useEffect } from "react";
import PropertyDetailsForm from "./property-details-form";


function UpdateProperty({ handleCloseModal }) {

    const customControlAction = {
        success: true,
        message: null,
        action_key: "edit_property",
        payload: {
            property: {
                id: 82,
                project_id: 6,
                features:
                {
                    TypeOfUnit: "townhouse",
                    NoRooms: 3,
                    Area: 10,
                    price_from: 11000,
                    price_to: 1000044
                },
                delivery_year: 2024,
                delivery_quarter: 4,
                installment_details: [
                    {
                        "down_payment_from": 434,
                        "down_payment_to": 500,
                        "amount_from": 1000,
                        "amount_to": 2000,
                        "currency": "EGP",
                        "freq": "1",
                        "duration": "1",
                        "is_default": false
                    },
                    {
                        "down_payment_from": 10,
                        "down_payment_to": 20,
                        "amount_from": 30,
                        "amount_to": 100,
                        "currency": "EGP",
                        "freq": 4,
                        "duration": 5,
                        "is_default": false
                    },
                    {
                        "down_payment_from": 10,
                        "down_payment_to": 20,
                        "amount_from": 30,
                        "amount_to": 100,
                        "currency": "EGP",
                        "freq": 4,
                        "duration": 5,
                        "is_default": true
                    },
                    {
                        "down_payment_from": 10,
                        "down_payment_to": 20,
                        "amount_from": 30,
                        "amount_to": 100,
                        "currency": "EGP",
                        "freq": 4,
                        "duration": 5,
                        "is_default": false
                    }
                ]
            }
        },
        "url": {
            "web": "/admin/properties/82"
        },
        "method": "post",
        "onSuccess": "refetchRow"
    }

    useEffect(() => console.log("renderingUpdate Property"), [])

    return (
        <PropertyDetailsForm handleCloseModal={handleCloseModal} customControlAction={customControlAction} formType="update" />
    )
}

export { UpdateProperty }
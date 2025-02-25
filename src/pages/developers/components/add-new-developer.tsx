import { DeveloperDetailsForm } from "./developer-details.form"
import { useTableRowActions } from "@/ApiTables/table-providers/row-actions-provider";

const AddNewDeveloper = () => {


    //    const { clickedRowAction, clickedRowActionResponse, rowActionsDispatcher, customControlAction, rowActionPostLoading } = useTableRowActions()

    return (
        <>
            <DeveloperDetailsForm />
        </>
    )
}


export default AddNewDeveloper;
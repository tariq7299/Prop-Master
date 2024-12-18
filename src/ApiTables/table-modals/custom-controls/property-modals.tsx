
import DrawerDialog from "@/components/custom/drawer-dialog.tsx"
import AddNewProperty from "@/pages/properties/components/add-new-property"
import { useTableRowActions } from "@/ApiTables/table-providers/row-actions-provider"
import { CustomControlModalProps } from "@/ApiTables/types/table-modals"
import { UpdateProperty } from "@/pages/properties/components/update-property"

{/* All Properties page Modals */ }
export default function PropertyModals({ handleCloseModal }: CustomControlModalProps) {

    const { customControlAction, clickedRowAction } = useTableRowActions()

    return (
        <>
            <DrawerDialog
                className="w-[60%]"
                handleCloseModal={handleCloseModal}
                status={customControlAction?.action_key === "add_new_property"}
                modalTitle={(<p className="text-xl font-raleway">{customControlAction?.button?.label}</p>)} modalDescription="Fill in the details of the new property"
                hasCloseButton={false}
            >
                <AddNewProperty handleCloseModal={handleCloseModal} />
            </DrawerDialog >

            {/* Update property */}
            <DrawerDialog
                className="w-[60%]"
                handleCloseModal={handleCloseModal}
                status={clickedRowAction?.action_key === "edit_property"}
                modalTitle={(<p className="text-xl font-raleway">{clickedRowAction?.button?.label}</p>)} modalDescription="Fill in the details of property"
                hasCloseButton={false}
            >
                <UpdateProperty handleCloseModal={handleCloseModal} />
            </DrawerDialog >
        </>
    )
}
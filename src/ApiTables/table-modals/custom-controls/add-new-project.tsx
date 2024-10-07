import * as React from "react";
import ImageUpload from "@/components/custom/image-upload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/custom/date-picker";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { Button } from "../../../components/custom/button";
import { CirclePlus, Building2, Image, CalendarClock, Activity, LandPlot, Warehouse, MapPinHouse, ImagePlus } from 'lucide-react';
import useSendRequest from "@/hooks/api/use-send-request";
import { axiosPrivate } from "@/helper/axiosInstances";
import { handleApiError } from "@/helper/api-requests/handleApiError";
import { handleApiSuccess } from "@/helper/api-requests/handleApiSuccess";
import axios from "axios";

export default function AddNewProject() {

    const form = useForm()
    const { handleSubmit, register, control, setValue, resetField, watch, formState: { dirtyFields } } = form

    // See how to add types to this
    const [contractors, setContractors] = React.useState([{ id: "1", name: "Emaar" }, { id: "2", name: "Amer Group" }, { id: "3", name: "New Address" }, { id: "4", name: "Nawy" }, { id: "5", name: "Madint Masr" }])
    const [destinations, setDestinations] = React.useState([{ id: "1", name: "Alamin" }, { id: "2", name: "New Cairo" }, { id: "3", name: "fifth" }, { id: "4", name: "Nasr City" }, { id: "5", name: "Misr Elgededah" }])




    // const {resData, isLoading, sendRequest} = useSendRequest();

    // React.useEffect(() => {

    //     const getAllContractors = async () => {

    //         try {

    //             const contractorsRes = await axiosPrivate("/client/contract-company")

    //             handleApiSuccess(contractorsRes?.data, false, '', () => {
    //                 console.log("contractorsRes?.data", contractorsRes?.data)
    //                 // setContractors()
    //             })



    //         } catch (error) {
    //             if (axios.isAxiosError(error) || error instanceof Error) {
    //                 handleApiError(error)

    //             }

    //         }
    //     }

    //     const getAllDestinations = async () => {

    //         try {

    //             const destinationsRes = await axiosPrivate("/client/destination")

    //             handleApiSuccess(destinationsRes?.data, false, '', () => {
    //                 console.log("destinationsRes?.data", destinationsRes?.data)
    //                 // setContractors()
    //             })



    //         } catch (error) {
    //             if (axios.isAxiosError(error) || error instanceof Error) {
    //                 handleApiError(error)

    //             }

    //         }
    //     }

    //     getAllContractors()

    //     getAllDestinations()


    // }, [])


    return (
        <>


            <div className="overflow-y-auto p-4 flex flex-col gap-y-10 items-start lg:items-center">
                {/* <h2 className="text-2xl font-medium tracking-tight">New Project</h2> */}

                <div className="space-y-2 w-full max-w-sm">
                    <div className="flex items-center space-x-2"><Label className="text-md font-medium ">Project Name</Label> <Building2 className="h-5 w-5 text-secondary" /></div>
                    <Input className=" " name="name" type="text"></Input>
                </div>

                <ImageUpload
                    title={"Upload Project Images"}
                    description={"Drag and drop your images here or click the button to select files."}
                    imagePlaceHolderText={"Drag and drop your images hepre"}
                    titleIcon={(<Image className="h-5 w-5 text-secondary" />)}
                    imagePlaceHolderIcon={(<ImagePlus className="w-6 h-6 text-muted-foreground" />)}
                />

                <div className="space-y-2 w-full max-w-sm">
                    <div className="flex items-center space-x-2"><Label className="block text-md font-medium">Delivery Time</Label><CalendarClock className="h-5 w-5 text-secondary" />
                    </div>
                    <DatePicker></DatePicker>
                </div >


                <div className="space-y-2 w-full max-w-sm">
                    <div className="flex items-center space-x-2"><Label className="text-md font-medium">Status</Label><Activity className="h-5 w-5 text-secondary" />
                    </div>

                    <Select
                    >
                        <SelectTrigger className="w-full" >
                            <SelectValue placeholder="Choose project status">
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Choose Status</SelectLabel>
                                <SelectItem value="active" >Active</SelectItem>
                                <SelectItem value="not-active" >Not active</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2 w-full max-w-sm">
                    <div className="flex items-center space-x-2"><Label className="text-md font-medium">Number of Acres</Label><LandPlot className="h-5 w-5 text-secondary" />
                    </div>

                    <Input className="" name="acres" type="number"></Input>
                </div>

                <div className="space-y-2 w-full max-w-sm ">
                    <div className="flex items-center space-x-2"><Label className="text-md font-medium">Contractor Company</Label><Warehouse className="h-5 w-5 text-secondary" />
                    </div>

                    <div className="flex justify-center items-center gap-2 ">
                        <Select
                        >
                            <SelectTrigger className=" flex-grow">
                                <SelectValue placeholder="Choose Contractor">
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Conractor Company</SelectLabel>
                                    {contractors.map((contractor) => {
                                        return (
                                            <SelectItem key={contractor.id} value={contractor.id} >{contractor.name}</SelectItem>
                                        )
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button className="bg-foreground text-background space-x-1 text-nowrap  " size="sm"><CirclePlus className="h-4 w-4" /><span className="sr-only md:not-sr-only text-nowrap  ">New Contractor</span></Button>
                    </div>
                </div>

                <div className="space-y-2 w-full max-w-sm">
                    <div className="flex items-center space-x-2"><Label className="text-md font-medium">Destination</Label><MapPinHouse className="h-5 w-5 text-secondary" />
                    </div>

                    <Select
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose">
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Destination</SelectLabel>
                                {destinations.map((destination) => {
                                    return (
                                        <SelectItem key={destination.id} value={destination.id} >{destination.name}</SelectItem>
                                    )
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

            </div >
        </>
    )
}
import * as React from "react";
import ImageUpload from "@/components/custom/image-upload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
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

export default function AddNewProject() {

    const form = useForm()
    const { handleSubmit, register, control, setValue, resetField, watch, formState: { dirtyFields } } = form

    return (
        <>


            <div className="overflow-y-auto p-4 flex flex-col gap-y-10 items-start">
                {/* <h2 className="text-2xl font-medium tracking-tight">New Project</h2> */}

                <div className="space-y-2 w-full">
                    <Label className="text-md font-medium ">Project Name</Label>
                    <Input className=" max-w-sm" name="name" type="text"></Input>
                </div>

                <ImageUpload></ImageUpload>

                <div className="space-y-2 w-full">
                    <Label className="block text-md font-medium">Delivery Time</Label>
                    <DatePicker></DatePicker>
                </div >


                <div className="space-y-2 w-full">
                    <Label className="text-md font-medium">Status</Label>
                    <Select
                    >
                        <SelectTrigger className="max-w-sm" >
                            <SelectValue placeholder="Choose">
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel></SelectLabel>
                                <SelectItem value="active" >Active</SelectItem>
                                <SelectItem value="not-active" >Not active</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2 w-full">
                    <Label className="text-md font-medium">Number of Acres</Label>
                    <Input className="max-w-sm" name="acres" type="number"></Input>
                </div>

                <div className="space-y-2 w-full">
                    <Label className="text-md font-medium">Contractor Company</Label>
                    <Select
                    >
                        <SelectTrigger className="max-w-sm">
                            <SelectValue placeholder="Choose">
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Conractor Company</SelectLabel>
                                <SelectItem value="Emmar" >Emmar</SelectItem>
                                <SelectItem value="Amer" >Amer</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2 w-full">
                    <Label className="text-md font-medium">Destination</Label>
                    <Select
                    >
                        <SelectTrigger className="max-w-sm">
                            <SelectValue placeholder="Choose">
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Destination</SelectLabel>
                                <SelectItem value="new-cairo" >Emmar</SelectItem>
                                <SelectItem value="Amer" >Amer</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

            </div >
        </>
    )
}
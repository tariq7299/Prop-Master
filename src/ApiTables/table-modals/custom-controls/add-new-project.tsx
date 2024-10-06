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


            <div className="overflow-y-auto p-4 flex flex-col gap-y-5 ">
                {/* <h2 className="text-2xl font-bold tracking-tight">New Project</h2> */}
                <Label>Name</Label>
                <Input name="name" type="text"></Input>

                <ImageUpload></ImageUpload>

                <Label>Delivery Time</Label>
                <DatePicker></DatePicker>



                <Label>Status</Label>
                <Select
                >
                    <SelectTrigger >
                        <SelectValue placeholder="Choose">
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel></SelectLabel>
                            <SelectItem value="active" >Active</SelectItem>
                            <SelectItem value="not-active" >Active</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>


                <Label>Number of Acres</Label>
                <Input name="acres" type="number"></Input>

                <Label>Contractor Company</Label>
                <Select
                >
                    <SelectTrigger >
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

                <Label>Destination</Label>
                <Select
                >
                    <SelectTrigger >
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


                <Button className="">Add Project</Button>
            </div>
        </>
    )
}
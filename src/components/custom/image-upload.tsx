
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "./button"
import { ImagePlus } from 'lucide-react';

export default function ImageUpload() {
    return (
        <div className="grid gap-4 max-w-2xl mx-auto md:p-6">
            <div className="grid gap-2">
                <h2 className="text-lg font-bold">Upload Project Images</h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Drag and drop your images here or click the button to select files.
                </p>
            </div>
            <Card>
                <CardContent className="grid gap-4 p-6">
                    <div>
                        <div>
                            <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-700 transition-colors group-[.drag-over]:border-primary group-[.drag-over]:bg-primary/10">
                                <UploadIcon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Drag and drop your images here</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button as="label" htmlFor="file-input" size="sm">
                            <UploadIcon className="mr-2 h-4 w-4" />
                            Select Files
                        </Button>
                        <input id="file-input" type="file" multiple className="hidden" />
                    </div>
                </CardContent>
            </Card>
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">

                <div className="flex justify-center items-center w-[100px] h-[100px] bg-neutral-300 rounded-lg">
                    <ImagePlus className="w-6 h-6 text-neutral-400" />
                </div>
                <div className="flex justify-center items-center w-[100px] h-[100px] bg-neutral-300 rounded-lg">
                    <ImagePlus className="w-6 h-6 text-neutral-400" />
                </div>
                <div className="flex justify-center items-center w-[100px] h-[100px] bg-neutral-300 rounded-lg">
                    <ImagePlus className="w-6 h-6 text-neutral-400" />
                </div>
                <div className="flex justify-center items-center w-[100px] h-[100px] bg-neutral-300 rounded-lg">
                    <ImagePlus className="w-6 h-6 text-neutral-400" />
                </div>
                <div className="flex justify-center items-center w-[100px] h-[100px] bg-neutral-300 rounded-lg">
                    <ImagePlus className="w-6 h-6 text-neutral-400" />
                </div>
                <div className="flex justify-center items-center w-[100px] h-[100px] bg-neutral-300 rounded-lg">
                    <ImagePlus className="w-6 h-6 text-neutral-400" />
                </div>

            </div>
        </div>
    )
}

function UploadIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    )
}
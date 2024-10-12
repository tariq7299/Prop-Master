import * as React from "react";
import { Button } from "@/components/custom/button";
import { Separator } from '@/components/ui/separator';
import { defineStepper } from '@stepperize/react';
import ProjectDetailsStep from "./components/project-details-step";
import ProjectImagesUploadStep from "./components/project-images-upload-step";


const { useStepper, steps } = defineStepper(
    { id: 'proejctDetails', label: 'Project Details' },
    { id: 'projectImages', label: 'Project Images' },
    { id: 'complete', label: 'Complete' }
);

export default function AddNewProject({ handleCloseModal }: any) {

    const stepper = useStepper();




    return (
        <>
            <nav aria-label="Checkout Steps" className="group my-4">
                <ol
                    className="flex items-center justify-between gap-2 overflow-auto "
                    aria-orientation="horizontal"
                >
                    {stepper.all.map((step, index, array) => (
                        <React.Fragment key={step.id}>
                            <li className="flex items-center gap-4 flex-shrink-0">
                                <Button
                                    type="button"
                                    role="tab"
                                    variant={
                                        index <= stepper.current.index ? 'default' : 'secondary'
                                    }
                                    aria-current={
                                        stepper.current.id === step.id ? 'step' : undefined
                                    }
                                    aria-posinset={index + 1}
                                    aria-setsize={steps.length}
                                    aria-selected={stepper.current.id === step.id}
                                    className="flex size-10 items-center justify-center rounded-full"
                                    onClick={() => stepper.goTo(step.id)}
                                >
                                    {index + 1}
                                </Button>
                                <span className="text-sm font-medium">{step.label}</span>
                            </li>
                            {index < array.length - 1 && (
                                <Separator
                                    className={`flex-shrink flex-grow w-20 ${index < stepper.current.index ? 'bg-primary' : 'bg-muted'
                                        }`}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </ol>
            </nav>
            <div className="space-y-4">
                {stepper.switch({
                    proejctDetails: () => <ProjectDetailsStep handleCloseModal={handleCloseModal} />,
                    projectImages: () => <ProjectImagesUploadStep handleCloseModal={handleCloseModal} />,
                    complete: () => <p>COMPLELET</p>,
                })}
                {/* {!stepper.isLast ? (
                    <div className="flex justify-end gap-4">
                        <Button
                            variant="secondary"
                            onClick={stepper.prev}
                            disabled={stepper.isFirst}
                        >
                            Back
                        </Button>
                        <Button type="submit">
                            {stepper.isLast ? 'Complete' : 'Next'}
                        </Button>
                    </div>
                ) : (
                    <Button onClick={stepper.reset}>Reset</Button>
                )} */}
            </div>
        </>
    )
}
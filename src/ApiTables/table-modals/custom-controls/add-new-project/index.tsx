import * as React from "react";
import { Button } from "@/components/custom/button";
import { Separator } from '@/components/ui/separator';
import { defineStepper } from '@stepperize/react';
import ProjectDetailsStep from "./components/project-details-step";
import ProjectImagesUploadStep from "./components/project-images-upload-step";
import { Check } from 'lucide-react';
import useSendRequest from "@/hooks/api/use-send-request";



const { useStepper, Scoped, steps } = defineStepper(
    { id: 'proejctDetails', label: 'Project Details' },
    { id: 'projectImages', label: 'Project Images' },
    { id: 'completed', label: 'Completed' },
);

// Write types
export default function AddNewProject({ handleCloseModal }: any) {

    const stepper = useStepper();

    // Create an array of refs using useRef
    // Write types
    const stepsRefs = React.useRef(Array.from({ length: stepper.all.length }, () => React.createRef()));


    React.useEffect(() => {
        if (stepsRefs.current) {
            stepsRefs.current[stepper.current.index].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [stepper.current.id])

    // Write comments
    const { resData: newProject, isLoading: isSubmittingNewProject, sendRequest: addNewProject } = useSendRequest();







    return (
        <Scoped>
            <nav aria-label="Checkout Steps" className="group my-3 md:my-4">
                <ol
                    className="flex items-center justify-between gap-2 overflow-auto no-scrollbar snap-x px-4 snap-mandatory "
                    aria-orientation="horizontal"
                >
                    {stepper.all.map((step, index, array) => (
                        <React.Fragment key={step.id}>
                            <li className="snap-always snap-center flex items-center gap-4 flex-shrink-0" ref={stepsRefs.current[index]}>
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
                                    className="flex size-10 items-center justify-center rounded-full cursor-default"
                                // onClick={() => stepper.goTo(step.id)}
                                >
                                    {index + 1}
                                </Button>
                                <span className="text-sm font-medium">{step.label}</span>
                            </li>
                            {index < array.length - 1 && (
                                <Separator
                                    className={`flex-shrink flex-grow md:w-20 ${index < stepper.current.index ? 'bg-primary' : 'bg-muted'
                                        }`}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </ol>
            </nav>
            <div className="space-y-4 overflow-auto h-full">
                {stepper.switch({
                    proejctDetails: () => <ProjectDetailsStep addNewProject={addNewProject} isSubmittingNewProject={isSubmittingNewProject} newProject={newProject} handleCloseModal={handleCloseModal} stepper={stepper} />,
                    projectImages: () => <ProjectImagesUploadStep newProject={newProject} handleCloseModal={handleCloseModal} stepper={stepper} />,
                    completed: () => <div className="flex flex-col justify-center items-center py-6 gap-y-2">

                        <Check className="w-1/4 h-auto rounded-full  text-success " />
                        <p className="md:text-lg font-bold tracking-wider text-success-600">Project Added</p>


                    </div>,
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
                {stepper.isLast && (
                    <div className="flex justify-end gap-2">
                        <Button className="" onClick={stepper.reset}>Add new project</Button>
                        <Button type="button" onClick={handleCloseModal} variant="outline">Cancel</Button>
                    </div>
                )
                }
            </div>
        </Scoped>
    )
}
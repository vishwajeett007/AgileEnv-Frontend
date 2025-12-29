"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogPortal,
    DialogTitle,
    DialogTrigger
} from "../../../components/ui/dialog"
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import OnboardingWizard from "./onboarding-wizard";
import { cn } from "@/lib/utils";

export default function WorkSpaceSetUp() {

    const [open, setOpen] = useState(true);
    const [step, setStep] = useState(0);



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Open</Button>
            </DialogTrigger>
            <DialogPortal>
                <DialogContent className={cn(
                    "w-full transition-all duration-300 lg:max-w-[46rem] xl:max-w-[45rem]  lg:px-16",
                    step === 2 ? "p-1 lg:max-w-[64rem] xl:max-w-[64rem]" : "lg:max-w-[32rem]"
                )}
                    showCloseButton={true}//change it later
                    onInteractOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle><VisuallyHidden>WorkSpace Setup</VisuallyHidden></DialogTitle>
                    </DialogHeader>
                    <OnboardingWizard step={step} onStepChange={setStep} />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}
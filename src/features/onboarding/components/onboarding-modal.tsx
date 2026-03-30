"use client"

import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogPortal,
    DialogTitle
} from "../../../components/ui/dialog"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import OnboardingWizard from "./onboarding-wizard";
import { cn } from "@/shared/utils";

interface WorkSpaceSetUpProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export default function WorkSpaceSetUp({ open: controlledOpen, onOpenChange }: WorkSpaceSetUpProps) {

    const [internalOpen, setInternalOpen] = useState(true);
    const [step, setStep] = useState(0);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    useEffect(() => {
        if (!open) {
            setStep(0);
        }
    }, [open]);

    const handleOpenChange = (nextOpen: boolean) => {
        if (!isControlled) {
            setInternalOpen(nextOpen);
        }

        onOpenChange?.(nextOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogPortal>
                <DialogContent className={cn(
                    "w-full transition-all duration-300 lg:max-w-[46rem] xl:max-w-[45rem] lg:px-16",
                    step === 2 ? "p-1 lg:max-w-[64rem] xl:max-w-[64rem]" : "lg:max-w-[32rem]"
                )}
                    showCloseButton={true}
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

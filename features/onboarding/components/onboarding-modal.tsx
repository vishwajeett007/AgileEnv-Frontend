"use client"

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger
} from "../../../components/ui/dialog"
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import OnboardingWizard from "./onboarding-wizard";

export default function WorkSpaceSetUp() {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true)
    }, [])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Open</Button>
            </DialogTrigger>
            <DialogPortal>
                <DialogContent className="w-full lg:max-w-[46rem] xl:max-w-[48rem] overflow-auto"
                    showCloseButton={false}
                >
                    <DialogHeader>
                        <DialogTitle><VisuallyHidden>WorkSpace Setup</VisuallyHidden></DialogTitle>
                    </DialogHeader>
                    <OnboardingWizard />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}
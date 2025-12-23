"use client"

import { useState } from "react"
import { WorkspaceStepName } from "./steps/workspaceName-step"
import { WorkspaceStepWork } from "./steps/work-option"
import { WorkspaceStepFeature } from "./steps/feature-option"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type OnboardingData = {
    workspaceName: string
}

interface OnboardingWizardProps {
    step: number;
    onStepChange: (step: number) => void;
}

export default function OnboardingWizard({ step, onStepChange }: OnboardingWizardProps) {
    const [data, setData] = useState<OnboardingData>({
        workspaceName: "",
    })

    const nextStep = () => onStepChange(step + 1)
    const prevStep = () => onStepChange(step - 1)

    const updateData = (newData: Partial<OnboardingData>) => {
        setData((prev) => ({ ...prev, ...newData }))
    }

    const handleWorkspaceSubmit = (workspaceData: { name: string }) => {
        updateData({ workspaceName: workspaceData.name })
        nextStep()
    }

    return (
        <div className={cn(
            "w-full pb-[3rem] pt-[2rem]",
            step === 2 ? "sm:px-[6rem]" : "px-6"
        )}>

            {step === 0 && (
                <WorkspaceStepName
                    onNext={handleWorkspaceSubmit}
                    initialData={{ name: data.workspaceName }}
                />
            )}
            {step === 1 && (
                <WorkspaceStepWork
                    onNext={handleWorkspaceSubmit}
                    onBack={prevStep}
                    initialData={{ name: data.workspaceName }}
                />
            )}

            {step === 2 && (
                <WorkspaceStepFeature
                    onNext={handleWorkspaceSubmit}
                    onBack={prevStep}
                    initialData={{ name: data.workspaceName }}
                />
            )}
        </div>
    )
}

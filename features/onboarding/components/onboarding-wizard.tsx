"use client"

import { WorkspaceStepName } from "./steps/workspaceName-step"
import { WorkspaceStepWork } from "./steps/work-option"
import { WorkspaceStepFeature } from "./steps/feature-option"
import { cn } from "@/lib/utils"

interface OnboardingWizardProps {
    step: number;
    onStepChange: (step: number) => void;
}

export default function OnboardingWizard({ step, onStepChange }: OnboardingWizardProps) {

    const nextStep = () => onStepChange(step + 1)
    const prevStep = () => onStepChange(step - 1)



    return (
        <div className={cn(
            "w-full pb-[3rem] pt-[2rem] px-1",
            step === 2 ? "sm:px-[6rem]" : "px-1"
        )}>

            {step === 0 && (
                <WorkspaceStepName
                    onNext={nextStep}
                />
            )}
            {step === 1 && (
                <WorkspaceStepWork
                    onNext={nextStep}
                    onBack={prevStep}
                />
            )}

            {step === 2 && (
                <WorkspaceStepFeature
                    onBack={prevStep}
                />
            )}
        </div>
    )
}

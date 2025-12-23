"use client"

import { useState } from "react"
import { WorkspaceStepName } from "./steps/workspaceName-step"
import { WorkspaceStepWork } from "./steps/work-option"
import { WorkspaceStepFeature } from "./steps/feature-option"
import { Button } from "@/components/ui/button"

type OnboardingData = {
    workspaceName: string
}

export default function OnboardingWizard() {
    const [step, setStep] = useState(0)
    const [data, setData] = useState<OnboardingData>({
        workspaceName: "",
    })

    const nextStep = () => setStep((prev) => prev + 1)
    const prevStep = () => setStep((prev) => prev - 1)

    const updateData = (newData: Partial<OnboardingData>) => {
        setData((prev) => ({ ...prev, ...newData }))
    }

    const handleWorkspaceSubmit = (workspaceData: { name: string }) => {
        updateData({ workspaceName: workspaceData.name })
        nextStep()
    }

    return (
        <div className="w-full sm:px-[6rem] pb-[3rem] pt-[2rem]">

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

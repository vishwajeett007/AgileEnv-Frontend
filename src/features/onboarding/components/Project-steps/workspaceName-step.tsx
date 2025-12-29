"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setWorkspaceName } from "@/lib/features/onboarding/onboarding-Slice"

interface WorkspaceStepProps {
    onNext: () => void
}

export function WorkspaceStepName({ onNext }: WorkspaceStepProps) {

    const dispatch = useAppDispatch();
    const { workspaceName } = useAppSelector((state) => state.onboarding)

    const handleNext = () => {
        if (workspaceName.trim()) {
            onNext()
        }
    }

    return (
        <div className="flex flex-col gap-6 px-1 lg:px-10">
            {/* <div className="flex flex-col gap-4"> */}
            <div className="flex items-center justify-center gap-1">
                <Image
                    src="/Images/logo.svg"
                    alt="logo"
                    width={60}
                    height={60}
                />
                <h2 className="text-3xl font-medium text-blue-600 pb-1">Agile</h2>
            </div>

            <div className="flex flex-col gap-3 py-4 items-center justify-center">
                <h1 className="font-medium text-4xl text-center">Let’s set up your workspace</h1>
                <p className="text-center text-md tracking-[0.02rem] text-muted-foreground font-roboto">
                    Your workspace will be the hub for all your projects, tasks, and team collaboration. Start by giving it a name
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <Input
                    id="workspace-name"
                    placeholder="Workspace Name"
                    value={workspaceName}
                    onChange={(e) => dispatch(setWorkspaceName(e.target.value))}
                    className="h-12 px-5 bg-gray-100 placeholder:text-gray-400"
                    autoFocus
                />
                <p className="text-sm text-muted-foreground">
                    You can change this later
                </p>
            </div>

            <div className="flex items-center justify-center">
                <Button
                    className="w-full hover:bg-blue-800 bg-blue-700 py-6 text-lg text-white font-light"
                    onClick={handleNext} disabled={!workspaceName.trim()}>
                    Continue
                </Button>
            </div>
        </div>
    )
}

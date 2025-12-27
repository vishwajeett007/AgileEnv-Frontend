"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { setWorkspaceRole } from "@/lib/features/onboarding/onboarding-Slice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"

interface WorkspaceStepProps {
    onNext: () => void
    onBack: () => void
}

export function WorkspaceStepWork({ onNext, onBack }: WorkspaceStepProps) {
    const dispatch = useAppDispatch()
    const { workspaceRole } = useAppSelector((state) => state.onboarding)


    const WORK_MODES = [
        { id: "projects", label: "Plan Projects", link: "/Images/ChartBar.svg", active: "/Images/ChartBar1.svg" },
        { id: "sprints", label: "Run Sprints", link: "/Images/kanban.svg", active: "/Images/kanban1.svg" },
        { id: "tasks", label: "Manage Tasks", link: "/Images/message.svg", active: "/Images/message1.svg" },
        { id: "collaboration", label: "Team Collaboration", link: "/Images/folder.svg", active: "/Images/folder1.svg" },
    ] as const

    const handleOption = (mode: typeof WORK_MODES[number]) => {
        dispatch(setWorkspaceRole(mode.id))
    }

    return (
        <div className="flex flex-col gap-6 ">

            <div className="flex items-center justify-center gap-1">
                <Image
                    src="/Images/logo.svg"
                    alt="logo"
                    width={60}
                    height={60}
                />
                <h2 className="text-3xl font-medium text-blue-600 pb-1">Agile</h2>
            </div>

            <div className="flex flex-col gap-3 pb-4 pt-2 items-center justify-center">
                <h1 className="font-medium text-4xl text-center">How do you want to work?</h1>
                <p className="text-center text-md tracking-[0.02rem] text-muted-foreground font-roboto">
                    This helps us set up the right templates and views.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {WORK_MODES.map((mode) => (
                    <button
                        key={mode.id}
                        type="button"
                        onClick={() => handleOption(mode)}
                        className={cn(
                            "flex items-center gap-3 rounded-lg border p-3 text-left transition-all duration-300 ease-out",
                            workspaceRole === mode.id
                                ? "border-blue-500 border-2 scale-105 bg-blue-50"
                                : "border-gray-400 hover:scale-105 hover:border-blue-400"
                        )}
                    >
                        <Image
                            src={workspaceRole === mode.id ? mode.active : mode.link}
                            alt={mode.id}
                            height={30}
                            width={30}
                            className={cn(
                                "transistion-transform duration-300",
                                workspaceRole === mode.id && "scale-110"
                            )}
                        />
                        <span className="font-medium text-gray-700">{mode.label}</span>
                    </button>

                ))}
            </div>

            <div className="flex items-center justify-center gap-2">
                <Button
                    className="flex-1 hover:bg-gray-100 bg-transparent py-6 text-lg text-blue-700 font-light border border-blue-700 border-2"
                    onClick={onBack}>
                    Back
                </Button>
                <Button
                    className="flex-1 hover:bg-blue-800 bg-blue-700 py-6 text-lg text-white font-light border border-2 border-blue-700"
                    onClick={onNext} disabled={!workspaceRole}>
                    Continue
                </Button>
            </div>
        </div>
    )
}
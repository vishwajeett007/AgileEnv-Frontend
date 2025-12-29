"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setSelectedTools, setActiveTool, resetOnboarding } from "@/lib/features/onboarding/onboarding-Slice"
import { DialogClose } from "@radix-ui/react-dialog"


interface WorkspaceStepProps {
    onBack: () => void
}

export function WorkspaceStepFeature({ onBack }: WorkspaceStepProps) {
    const dispatch = useAppDispatch()
    const { selectedTools, activeTool, } = useAppSelector((state) => state.onboarding)
    const [flipped, setFlipped] = useState(false)


    const TOOLS = [
        { id: "Kanban", label: "Kanban Board" },
        { id: "Calendar", label: "Calendar" },
        { id: "Gantt", label: "Gantt Timeline" },
        { id: "List", label: "List view" },
        { id: "Chat", label: "Chat & Comments" },
        { id: "Reports", label: "Reports & Analytics" },
    ] as const


    const TOOL_IMAGES: Record<string, string> = {
        Kanban: "/Images/KanbanView.svg",
        Calendar: "/Images/CalendarView.svg",
        Gantt: "/Images/GanttView.svg",
        List: "/Images/ListView.svg",
        Chat: "/Images/ChatView.svg",
        Reports: "/Images/ReportView.svg",
    }

    const toggleTool = (id: string) => {
        const isSelected = selectedTools.includes(id)
        let nextTools: string[]
        let nextActive = activeTool

        if (isSelected) {
            nextTools = selectedTools.filter((t) => t !== id)
            if (id === activeTool && nextTools.length > 0) {
                nextActive = nextTools[nextTools.length - 1]
            }
        } else {
            nextTools = [...selectedTools, id]
            nextActive = id
        }

        dispatch(setSelectedTools(nextTools))
        dispatch(setActiveTool(nextActive))
        setFlipped((prev) => !prev)
    }

    const onFinish = () => {
        dispatch(resetOnboarding())
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12 w-full items-center">
            <div className="hidden md:flex justify-center perspective">
                <div
                    className={cn(
                        "relative transition-transform duration-1000 ease-in-out transform-style-preserve-3d",
                        flipped && "rotate-y-180"
                    )}
                >
                    <Image
                        key={activeTool}
                        src={TOOL_IMAGES[activeTool] || '/Images/KanbanView.svg'}
                        alt={activeTool}
                        width={420}
                        height={320}
                        className=""
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-center gap-1">
                    <Image
                        src="/Images/logo.svg"
                        alt="logo"
                        width={45}
                        height={45}
                    />
                    <h2 className="text-2xl font-medium text-blue-600 pb-1">Agile</h2>
                </div>

                <div className="flex flex-col gap-2 py-3 items-center justify-center">
                    <h1 className="font-medium text-xl text-left leading-tight">Pick the tools you want <br /> in your workspace</h1>
                    <p className="text-left text-sm tracking-[0.02rem] text-muted-foreground font-roboto">
                        Select the features you’ll use most. You can always add more later.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    {TOOLS.map((tool) => {
                        const checked = selectedTools.includes(tool.id)
                        return (
                            <button
                                key={tool.id}
                                type="button"
                                onClick={() => toggleTool(tool.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 rounded-lg border px-4 py-2 text-left transition-all",
                                    checked
                                        ? "border-blue-600 bg-blue-50"
                                        : "border-gray-300 hover:border-blue-400"
                                )}
                            >
                                <div
                                    className={cn(
                                        "h-4 w-4 rounded border flex items-center justify-center",
                                        checked ? "bg-blue-600 border-blue-600" : "border-gray-400"
                                    )}
                                >
                                    {checked && (
                                        <div className="h-2 w-2 bg-white rounded-sm" />
                                    )}
                                </div>

                                <span className="text-sm font-medium">{tool.label}</span>

                            </button>
                        )
                    })}
                </div>

                <div className="flex items-center mt-2 justify-center gap-2">
                    <Button
                        className="flex-1 hover:bg-gray-100 bg-transparent py-4 text-lg text-blue-700 font-light border border-blue-700 border-2 m-0"
                        onClick={onBack}>
                        Back
                    </Button>
                    <DialogClose
                        className="flex-1 hover:bg-blue-800 bg-blue-700 text-lg text-white font-light border border-blue-700 border-3 rounded-lg h-9 text-center px-2 m-0"
                        onClick={onFinish} >
                        Finish
                    </DialogClose>

                </div>
            </div>
        </div>
    )
}

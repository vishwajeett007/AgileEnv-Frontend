"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { id } from "zod/v4/locales"

interface WorkspaceStepProps {
    onNext: (data: { name: string }) => void
    onBack: () => void
    initialData?: { name: string }
}

export function WorkspaceStepFeature({ onNext, onBack, initialData }: WorkspaceStepProps) {
    const [name, setName] = useState(initialData?.name || "")
    const [selectedTools, setSelectedTools] = useState<string[]>(["kanban"])
    const [activeTool, setActiveTool] = useState<string>("Kanban")

    const handleNext = () => {
        if (name.trim()) {
            onNext({ name })
        }
    }
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
        setSelectedTools((prev) => {
            const isSelected = prev.includes(id)

            if (isSelected) {
                const next = prev.filter((t) => t !== id)

                if (id === activeTool && next.length > 0) {
                    setActiveTool(next[next.length - 1])
                }

                return next
            } else {
                setActiveTool(id)
                return [...prev, id]
            }
        })
    }



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mx-auto ">

            <div className="flex justify-center" key={activeTool}>
                <Image
                    src={TOOL_IMAGES[activeTool]}
                    alt="Workspace tools"
                    width={420}
                    height={320}
                    className="max-w-full transition-all duration-300" />
            </div>
            <div>
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
                    <h1 className="font-medium text-2xl text-left">Pick the tools you want <br /> in your workspace</h1>
                    <p className="text-left text-md tracking-[0.02rem] text-muted-foreground font-roboto">
                        Select the features you’ll use most. You can always add more later.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    {TOOLS.map((tool) => {
                        const checked = selectedTools.includes(tool.id)
                        return (
                            <button
                                key={tool.id}
                                type="button"
                                onClick={() => toggleTool(tool.id)}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all",
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

                <div className="flex items-center mt-3 justify-center gap-2">
                    <Button
                        className="flex-1 hover:bg-gray-100 bg-transparent py-6 text-lg text-blue-700 font-light border border-blue-700 border-2"
                        onClick={onBack} disabled={!name.trim()}>
                        Back
                    </Button>
                    <Button
                        className="flex-1 hover:bg-blue-800 bg-blue-700 py-6 text-lg text-white font-light border border-blue-700 border-2"
                        onClick={handleNext} disabled={!name.trim()}>
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

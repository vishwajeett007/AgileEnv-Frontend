"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface WorkspaceStepProps {
    onNext: (data: { name: string }) => void
    onBack: () => void
    initialData?: { name: string }
}

export function WorkspaceStepFeature({ onNext, onBack, initialData }: WorkspaceStepProps) {
    const [name, setName] = useState(initialData?.name || "")
    const [selectedTools, setSelectedTools] = useState<string[]>(["Kanban"])
    const [activeTool, setActiveTool] = useState<string>("Kanban")
    const [flipped, setFlipped] = useState(false)


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

    useEffect(() => {
        const storedActiveTool = localStorage.getItem("activeTool")
        const storedSelectedTools = localStorage.getItem("selectedTools")
        if (storedActiveTool) {
            setActiveTool(storedActiveTool)
        }
        if (storedSelectedTools) {
            setSelectedTools(JSON.parse(storedSelectedTools))
        }
    }, [])

    const toggleTool = (id: string) => {
        setSelectedTools((prev) => {
            const isSelected = prev.includes(id)

            if (isSelected) {
                const next = prev.filter((t) => t !== id)
                if (id === activeTool && next.length > 0) {
                    setActiveTool(next[next.length - 1])
                    localStorage.setItem("selectedTools", JSON.stringify(next))
                    localStorage.setItem("activeTool", next[next.length - 1])
                }

                return next
            } else {
                localStorage.setItem("selectedTools", JSON.stringify([...prev, id]))
                setActiveTool(id)
                localStorage.setItem("activeTool", id)
                return [...prev, id]
            }
        })
        setFlipped((prev) => !prev)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12 w-full items-center">
            <div className="hidden md:flex justify-center perspective">
                <div
                    className={cn(
                        "relative transition-all duration-500 ease-in-out",
                        flipped ? "scale-105 opacity-90" : "scale-100 opacity-100"
                    )}
                >
                    <Image
                        key={activeTool}
                        src={TOOL_IMAGES[activeTool] || '/Images/KanbanView.svg'}
                        alt={activeTool}
                        width={420}
                        height={320}
                        className="rounded-xl shadow-2xl border border-gray-100 bg-white"
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
                        className="flex-1 hover:bg-gray-100 bg-transparent py-4 text-lg text-blue-700 font-light border border-blue-700 border-2"
                        onClick={onBack}>
                        Back
                    </Button>
                    <Button
                        className="flex-1 hover:bg-blue-800 bg-blue-700 py-4 text-lg text-white font-light border border-blue-700 border-2"
                        onClick={handleNext} disabled={selectedTools.length === 0}>
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

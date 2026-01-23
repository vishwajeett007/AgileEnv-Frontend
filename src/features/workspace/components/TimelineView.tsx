"use client"

import { Info, Settings2, Download, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/lib/hooks"
import { useParams } from "next/navigation"

export default function TimelineView() {
    const params = useParams()
    const workspaceId = params.workspaceId as string

    const workspace = useAppSelector(state =>
        state.workspace.workspaces.find(w => w.id === workspaceId)
    )

    if (!workspace) return null

    const days = Array.from({ length: 14 }).map((_, i) => ({
        day: 20 + i,
        name: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"][(i + 1) % 7]
    }))

    // Use issues as timeline items
    const timelineItems = workspace.issues.slice(0, 4).map((issue, idx) => ({
        title: issue.summary,
        color: idx % 4 === 0 ? "blue" : idx % 4 === 1 ? "purple" : idx % 4 === 2 ? "green" : "red",
        start: idx,
        width: 3 + idx,
        user: issue.assignee
    }))

    return (
        <div className="flex flex-col h-full bg-[#FAFBFC] p-8 overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 text-wrap gap-4">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-[#172B4D] tracking-tight flex items-center gap-2">
                        Project Timeline
                        <Info size={16} className="text-[#6B778C] cursor-help" />
                    </h2>
                    <p className="text-sm text-[#6B778C]">Visualize and schedule project releases and milestones</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-9 gap-2 font-semibold font-roboto">
                        <Download size={14} />
                        Export
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 gap-2 font-semibold font-roboto">
                        <Settings2 size={14} />
                        Configure
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-[#6B778C]">
                        <Maximize2 size={16} />
                    </Button>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-2xl border border-[#DFE1E6] shadow-xl overflow-hidden flex flex-col">
                {/* Header / Calendar */}
                <div className="h-14 border-b bg-gray-50/50 flex items-center">
                    <div className="w-56 border-r h-full flex items-center px-6 font-bold text-[11px] text-[#6B778C] uppercase tracking-widest bg-white">Work Item</div>
                    <div className="flex-1 h-full flex items-center divide-x border-[#DFE1E6]">
                        {days.map((d, i) => (
                            <div key={i} className="flex-1 h-full flex flex-col items-center justify-center bg-white/30">
                                <span className="text-[9px] font-bold text-[#6B778C]">{d.name}</span>
                                <span className={cn("text-xs font-bold mt-0.5 w-6 h-6 flex items-center justify-center rounded-full transition-colors font-roboto", d.day === 23 ? "bg-blue-600 text-white shadow-md" : "text-[#172B4D]")}>
                                    {d.day}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Grid Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar relative">
                    {/* Background Vertical Grid Lines */}
                    <div className="absolute inset-0 flex divide-x pointer-events-none opacity-50">
                        <div className="w-56" />
                        {days.map((_, i) => (
                            <div key={i} className="flex-1 h-full" />
                        ))}
                    </div>

                    {timelineItems.map((row, idx) => (
                        <div key={idx} className="h-16 flex items-center border-b hover:bg-[#F4F5F7]/30 transition-colors group relative z-10">
                            <div className="w-56 px-6 border-r h-full flex items-center text-sm font-semibold text-[#172B4D] bg-white group-hover:bg-[#F4F5F7]/10 truncate font-roboto">{row.title}</div>
                            <div className="flex-1 px-2 h-full flex items-center relative">
                                <div
                                    className={cn(
                                        "h-8 rounded-lg shadow-sm border flex items-center px-3 relative group/bar cursor-pointer transition-all hover:shadow-lg active:scale-[0.99]",
                                        getBarColors(row.color)
                                    )}
                                    style={{ marginLeft: `${(row.start / 14) * 100}%`, width: `${(row.width / 14) * 100}%` }}
                                >
                                    <span className="text-[10px] font-bold truncate leading-none font-roboto">{row.title}</span>
                                    <div className="ml-auto w-5 h-5 rounded-full bg-white/50 border border-white/50 flex items-center justify-center text-[8px] font-bold shadow-inner font-roboto">
                                        {row.user}
                                    </div>
                                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full border shadow-sm opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function getBarColors(color: string) {
    const map: Record<string, string> = {
        blue: "bg-blue-500 border-blue-600/50 text-white",
        purple: "bg-purple-500 border-purple-600/50 text-white",
        green: "bg-green-500 border-green-600/50 text-white",
        red: "bg-red-500 border-red-600/50 text-white"
    }
    return map[color] || map.blue
}

function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

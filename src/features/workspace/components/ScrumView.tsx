"use client"

import { Play, AlertCircle, TrendingUp, Filter, ListFilter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/lib/hooks"
import { useParams } from "next/navigation"

export default function ScrumView() {
    const params = useParams()
    const workspaceId = params.workspaceId as string

    const workspace = useAppSelector(state =>
        state.workspace.workspaces.find(w => w.id === workspaceId)
    )

    if (!workspace) return null

    const completedIssues = workspace.issues.filter(i => i.status === "Done")
    const remainingIssues = workspace.issues.filter(i => i.status !== "Done")

    return (
        <div className="flex flex-col h-full bg-[#FAFBFC] p-8 overflow-y-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-[#172B4D] tracking-tight flex items-center gap-3">
                        Scrum Board
                        <span className="bg-[#DEEBFF] text-[#0747A6] text-xs font-bold px-2 py-1 rounded">Active</span>
                    </h2>
                    <p className="text-sm text-[#6B778C] mt-1">Sprint 24 • Ends in 4 days</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-9 gap-2 font-semibold">
                        <Filter size={14} />
                        Filter
                    </Button>
                    <Button className="h-9 bg-[#0052CC] hover:bg-[#0747A6] gap-2 font-semibold">
                        <Play size={14} fill="currentColor" />
                        Complete Sprint
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                    { label: "Completed", val: completedIssues.length.toString().padStart(2, '0'), color: "text-[#36B37E]", bg: "bg-[#E3FCEF]" },
                    { label: "Remaining", val: remainingIssues.length.toString().padStart(2, '0'), color: "text-[#FFAB00]", bg: "bg-[#FFFAE6]" },
                    { label: "Total Issues", val: workspace.issues.length.toString().padStart(2, '0'), color: "text-[#0052CC]", bg: "bg-[#DEEBFF]" }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl border border-[#DFE1E6] shadow-sm flex items-center gap-4">
                        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center shadow-inner", stat.bg)}>
                            <TrendingUp size={20} className={stat.color} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[#172B4D]">{stat.val}</div>
                            <div className="text-xs font-bold text-[#6B778C] uppercase tracking-wider">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-[#DFE1E6] shadow-sm overflow-hidden mb-12">
                <div className="px-6 py-4 border-b border-[#DFE1E6] bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-bold">S</div>
                        <span className="text-sm font-bold text-[#172B4D]">Current Backlog (Sprint 24)</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 gap-2 text-[#6B778C]">
                        <ListFilter size={14} />
                        Sort
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#FAFBFC] border-b text-xs font-bold text-[#6B778C] uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Key</th>
                                <th className="px-6 py-3">Summary</th>
                                <th className="px-6 py-3 text-center">Priority</th>
                                <th className="px-6 py-3 text-center">Status</th>
                                <th className="px-6 py-3">Assignee</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DFE1E6]">
                            {workspace.issues.map((issue) => (
                                <tr key={issue.id} className="hover:bg-[#F4F5F7] transition-colors cursor-pointer group">
                                    <td className="px-6 py-4">
                                        <div className={cn("w-4 h-4 rounded-sm flex items-center justify-center", issue.type === "Bug" ? "bg-red-500" : "bg-blue-500")}>
                                            {issue.type === "Bug" ? <AlertCircle size={10} className="text-white" /> : <div className="w-2 h-2 bg-white rounded-full" />}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-[#0052CC] text-xs hover:underline">{issue.key}</td>
                                    <td className="px-6 py-4 font-medium text-[#172B4D] truncate max-w-[300px]">{issue.summary}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className={cn("inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight shadow-sm",
                                            issue.priority === "Highest" ? "bg-red-100 text-red-700" :
                                                issue.priority === "High" ? "bg-orange-100 text-orange-700" :
                                                    issue.priority === "Medium" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                                        )}>
                                            {issue.priority}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Badge status={issue.status} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-[10px] font-bold text-blue-700 shadow-sm">{issue.assignee}</div>
                                            <span className="text-xs font-semibold text-[#42526E] group-hover:text-[#172B4D]">{issue.assignee === "VS" ? "Vishwajeet S." : "Other User"}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function Badge({ status }: { status: string }) {
    const variants: Record<string, string> = {
        "Done": "bg-[#E3FCEF] text-[#006644]",
        "In Progress": "bg-[#DEEBFF] text-[#0747A6]",
        "Review": "bg-[#FFFAE6] text-[#FF8B00]",
        "To Do": "bg-[#F4F5F7] text-[#42526E]"
    }
    return (
        <span className={cn("px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider", variants[status] || variants["To Do"])}>
            {status}
        </span>
    )
}

function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

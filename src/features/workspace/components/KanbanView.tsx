"use client"

import { MoreHorizontal, Clock, MessageSquare, Tag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useParams } from "next/navigation"
import { deleteIssue, moveIssue } from "@/lib/features/workspace/workspace-Slice"
import CreateIssueModal from "@/features/workspace/components/CreateIssueModal"

export default function KanbanView() {
    const params = useParams()
    const workspaceId = params.workspaceId as string
    const dispatch = useAppDispatch()

    const workspace = useAppSelector(state =>
        state.workspace.workspaces.find(w => w.id === workspaceId)
    )

    if (!workspace) return null

    const columns = ["To Do", "In Progress", "Review", "Done"]

    const getIssuesByStatus = (status: string) => {
        return workspace.issues.filter(issue => issue.status === status)
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "Highest": return "bg-red-100 text-red-700 font-bold"
            case "High": return "bg-orange-100 text-orange-700 font-bold"
            case "Medium": return "bg-blue-100 text-blue-700 font-bold"
            case "Low": return "bg-green-100 text-green-700 font-bold"
            default: return "bg-gray-100 text-gray-700 font-bold"
        }
    }

    const onDragStart = (e: React.DragEvent, issueId: string) => {
        e.dataTransfer.setData("issueId", issueId)
    }

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const onDrop = (e: React.DragEvent, newStatus: string, newIndex: number) => {
        const issueId = e.dataTransfer.getData("issueId")
        dispatch(moveIssue({ workspaceId, issueId, newStatus, newIndex }))
    }

    const handleDelete = (e: React.MouseEvent, issueId: string) => {
        e.stopPropagation()
        if (confirm("Are you sure you want to delete this issue?")) {
            dispatch(deleteIssue({ workspaceId, issueId }))
        }
    }

    return (
        <div className="flex flex-col h-full bg-[#FAFBFC] p-6">
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-[#172B4D] tracking-tight">Kanban Board</h2>
                    <p className="text-sm text-[#6B778C]">Track and manage your project issues through stages</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-9 gap-2 font-semibold">
                        <Tag size={14} />
                        Labels
                    </Button>
                    <CreateIssueModal workspaceId={workspaceId} status="To Do" buttonVariant="default" />
                </div>
            </div>

            <div className="flex gap-6 overflow-x-auto h-full pb-6 no-scrollbar">
                {columns.map(columnTitle => {
                    const columnIssues = getIssuesByStatus(columnTitle)
                    return (
                        <div key={columnTitle} className="min-w-[300px] w-[300px] flex flex-col group">
                            <div className="flex items-center justify-between mb-3 px-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-bold text-[#6B778C] uppercase tracking-widest">{columnTitle}</span>
                                    <span className="bg-[#EBECF0] text-[#42526E] text-[10px] font-bold px-2 py-0.5 rounded-full">{columnIssues.length}</span>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-[#6B778C] opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal size={14} />
                                </Button>
                            </div>

                            <div
                                className="flex-1 flex flex-col gap-3 bg-[#F4F5F7]/50 rounded-lg p-2 border-2 border-transparent transition-all hover:bg-[#F4F5F7]"
                                onDragOver={onDragOver}
                                onDrop={(e) => onDrop(e, columnTitle, columnIssues.length)}
                            >
                                {columnIssues.map((issue, index) => (
                                    <div
                                        key={issue.id}
                                        draggable
                                        onDragStart={(e) => onDragStart(e, issue.id)}
                                        onDragOver={onDragOver}
                                        onDrop={(e) => {
                                            e.stopPropagation()
                                            onDrop(e, columnTitle, index)
                                        }}
                                        className="bg-white p-4 rounded-lg shadow-sm border border-[#DFE1E6] flex flex-col gap-3 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-blue-400 transition-all group/card relative"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="text-[10px] font-bold text-[#42526E] tracking-tighter uppercase">{issue.key}</div>
                                            <div className="flex items-center gap-1">
                                                <div className={cn("text-[8px] px-1.5 py-0.5 rounded uppercase tracking-tighter", getPriorityColor(issue.priority))}>
                                                    {issue.priority}
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-[#6B778C] hover:text-red-600 hover:bg-red-50 opacity-0 group-hover/card:opacity-100 transition-opacity"
                                                    onClick={(e) => handleDelete(e, issue.id)}
                                                >
                                                    <Trash2 size={12} />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium text-[#172B4D] leading-tight">{issue.summary}</div>
                                        <div className="flex justify-between items-center mt-2">
                                            <div className="flex items-center gap-2 text-[#6B778C]">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={12} />
                                                    <span className="text-[10px]">2d</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MessageSquare size={12} />
                                                    <span className="text-[10px]">3</span>
                                                </div>
                                            </div>
                                            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[8px] font-bold text-white shadow-sm ring-2 ring-white">
                                                {issue.assignee}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <CreateIssueModal workspaceId={workspaceId} status={columnTitle} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

"use client"

import { Plus, Search, FileText, Clock, User, MoreHorizontal, Grid2X2, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useParams } from "next/navigation"
import { addNote } from "@/lib/features/workspace/workspace-Slice"

export default function NotesView() {
    const params = useParams()
    const workspaceId = params.workspaceId as string
    const dispatch = useAppDispatch()

    const workspace = useAppSelector(state =>
        state.workspace.workspaces.find(w => w.id === workspaceId)
    )

    if (!workspace) return null

    const handleAddNote = () => {
        const newNote = {
            id: Math.random().toString(36).substr(2, 9),
            title: "New Research Note",
            content: "Added a new note from the UI to show dynamic capabilities...",
            date: "Just now",
            author: "VS"
        }
        dispatch(addNote({ workspaceId, note: newNote }))
    }

    const getNoteColor = (i: number) => {
        const colors = [
            "bg-yellow-50 border-yellow-200 shadow-yellow-100",
            "bg-white border-blue-100 shadow-blue-50",
            "bg-green-50 border-green-200 shadow-green-100",
            "bg-white border-[#DFE1E6]"
        ]
        return colors[i % colors.length]
    }

    return (
        <div className="flex flex-col h-full bg-[#FAFBFC] p-8 overflow-y-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-[#172B4D] tracking-tight flex items-center gap-2">
                        Project Notes
                        <FileText size={20} className="text-blue-600" />
                    </h2>
                    <p className="text-sm text-[#6B778C]">Capture ideas, meeting minutes, and project documentation</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B778C]" />
                        <Input
                            placeholder="Search notes..."
                            className="h-10 pl-10 bg-white border-[#DFE1E6] focus:border-blue-500 transition-all rounded-lg"
                        />
                    </div>
                    <Button variant="ghost" size="icon" className="h-10 w-10 border bg-white">
                        <Grid2X2 size={18} className="text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 border bg-white">
                        <List size={18} className="text-[#6B778C]" />
                    </Button>
                    <Button className="h-10 bg-blue-600 hover:bg-blue-700 gap-2 font-semibold shadow-lg shadow-blue-200 px-4" onClick={handleAddNote}>
                        <Plus size={18} />
                        New Note
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {workspace.notes.map((note, i) => (
                    <div key={note.id} className={cn(
                        "group border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col min-h-[220px]",
                        getNoteColor(i)
                    )}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-8 h-8 rounded-lg bg-white/80 border border-inherit flex items-center justify-center shadow-sm">
                                <FileText size={16} className="text-[#172B4D]" />
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#6B778C] opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal size={14} />
                            </Button>
                        </div>
                        <h3 className="font-bold text-[#172B4D] text-lg mb-2 leading-tight group-hover:text-blue-700 transition-colors uppercase tracking-tight">{note.title}</h3>
                        <p className="text-sm text-[#42526E] line-clamp-3 mb-6 flex-1 italic leading-relaxed">&quot;{note.content}&quot;</p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-inherit">
                            <div className="flex items-center gap-2 text-[#6B778C]">
                                <Clock size={12} />
                                <span className="text-[10px] font-bold uppercase tracking-tighter">{note.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-bold text-[#172B4D]">{note.author}</span>
                                <div className="w-6 h-6 rounded-full bg-white border shadow-sm flex items-center justify-center text-[8px] font-bold text-blue-600">
                                    <User size={10} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="border-2 border-dashed border-[#DFE1E6] rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer min-h-[220px] group" onClick={handleAddNote}>
                    <div className="w-12 h-12 rounded-full bg-[#EBECF0] flex items-center justify-center text-[#6B778C] group-hover:bg-blue-100 group-hover:text-blue-600 transition-all shadow-inner">
                        <Plus size={24} />
                    </div>
                    <span className="font-bold text-[#42526E] group-hover:text-blue-700">Add Quick Note</span>
                </div>
            </div>
        </div>
    )
}

function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

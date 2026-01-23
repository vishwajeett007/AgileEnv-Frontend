"use client"

import { useAppSelector } from "@/lib/hooks"
import {
    LayoutDashboard,
    Settings,
    Users,
    FolderRoot,
    Star,
    ChevronDown,
    Plus,
    Hash,
    Layers
} from "lucide-react"
import { useParams } from "next/navigation"

export default function WorkspaceSidebar() {
    const params = useParams()
    const workspaceId = params.workspaceId as string
    const { workspaces } = useAppSelector((state) => state.workspace)
    const workspace = workspaces.find(w => w.id === workspaceId)

    if (!workspace) return null

    const navSection = (title: string, icon: React.ReactNode = null) => (
        <div className="flex items-center justify-between px-3 py-2 mt-4 mb-1 group cursor-pointer hover:bg-[#EBECF0] rounded-md transition-all">
            <div className="flex items-center gap-2">
                {icon && <span className="text-[#42526E]">{icon}</span>}
                <span className="text-[11px] font-bold text-[#6B778C] uppercase tracking-wider">{title}</span>
            </div>
            <ChevronDown size={14} className="text-[#6B778C] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    )

    return (
        <div className="hidden md:flex w-64 h-full bg-[#F4F5F7] border-r border-[#DFE1E6] flex-col overflow-hidden select-none">
            {/* Workspace Header */}
            <div className="px-4 py-6 border-b border-[#DFE1E6] bg-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold shadow-md transform rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                        {workspace.name.charAt(0)}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <div className="font-bold text-[#172B4D] truncate leading-tight flex items-center gap-1.5">
                            {workspace.name}
                            <Star size={12} className="text-yellow-500 fill-yellow-500" />
                        </div>
                        <div className="text-[10px] text-[#6B778C] font-medium uppercase truncate tracking-tighter">Team Managed Project</div>
                    </div>
                </div>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto px-2 py-4 no-scrollbar">
                {/* Planning Section */}
                {navSection("Planning", <Layers size={14} />)}
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-3 px-3 py-2 text-sm text-[#42526E] hover:bg-[#EBECF0] rounded-md cursor-pointer transition-all active:scale-[0.98]">
                        <LayoutDashboard size={18} className="text-[#0052CC]" />
                        <span className="font-medium">Summary</span>
                    </div>
                    {workspace.projects.map(project => (
                        <div key={project.id} className="flex items-center justify-between px-3 py-2 text-sm text-[#42526E] hover:bg-[#EBECF0] rounded-md cursor-pointer group transition-all active:scale-[0.98]">
                            <div className="flex items-center gap-3">
                                <FolderRoot size={18} className="text-[#6554C0]" />
                                <span className="font-medium truncate max-w-[140px] tracking-tight">{project.name}</span>
                            </div>
                            <Plus size={14} className="opacity-0 group-hover:opacity-100 text-[#6B778C] hover:text-blue-600 transition-all" />
                        </div>
                    ))}
                </div>

                {/* Development Section */}
                {navSection("Development", <Hash size={14} />)}
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-3 px-3 py-2 text-sm text-[#42526E] hover:bg-[#EBECF0] rounded-md cursor-pointer transition-all active:scale-[0.98]">
                        <LayoutDashboard size={18} className="text-[#00A3BF]" />
                        <span className="font-medium">Board</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 text-sm text-[#42526E] hover:bg-[#EBECF0] rounded-md cursor-pointer transition-all active:scale-[0.98]">
                        <Star size={18} className="text-[#FFAB00]" />
                        <span className="font-medium">Releases</span>
                    </div>
                </div>

                {/* Team Section */}
                {navSection("Team")}
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-3 px-3 py-2 text-sm text-[#42526E] hover:bg-[#EBECF0] rounded-md cursor-pointer transition-all">
                        <Users size={18} className="text-[#36B37E]" />
                        <span className="font-medium">Members</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-[#DFE1E6]">
                <div className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#42526E] hover:bg-[#EBECF0] rounded-md cursor-pointer transition-all group font-medium">
                    <Settings size={18} className="text-[#6B778C] group-hover:rotate-45 transition-transform duration-500" />
                    <span>Project settings</span>
                </div>
            </div>
        </div>
    )
}

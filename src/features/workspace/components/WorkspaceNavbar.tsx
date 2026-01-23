"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { Kanban, ListTodo, CalendarDays, NotebookText, ChevronRight, Share2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WorkspaceNavbar() {
    const params = useParams()
    const pathname = usePathname()
    const workspaceId = params.workspaceId as string

    const navItems = [
        { name: "Kanban", href: `/workspace/${workspaceId}/kanban`, icon: Kanban },
        { name: "Scrum Sprint", href: `/workspace/${workspaceId}/scrum`, icon: ListTodo },
        { name: "Timeline", href: `/workspace/${workspaceId}/timeline`, icon: CalendarDays },
        { name: "Notes", href: `/workspace/${workspaceId}/notes`, icon: NotebookText },
    ]

    return (
        <div className="flex flex-col border-b border-[#DFE1E6] bg-white sticky top-0 z-10">
            {/* Top Bar / Breadcrumbs */}
            <div className="h-14 flex items-center justify-between px-6 gap-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-[#6B778C] hover:text-[#0052CC] cursor-pointer transition-colors">Projects</span>
                    <ChevronRight size={14} className="text-[#6B778C]" />
                    <span className="text-[#6B778C] hover:text-[#0052CC] cursor-pointer transition-colors">Default Workspace</span>
                    <ChevronRight size={14} className="text-[#6B778C]" />
                    <span className="text-[#172B4D] font-bold">Project Overview</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-1 border-r border-[#DFE1E6] pr-4 mr-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full bg-[#EBECF0] border border-white flex items-center justify-center text-[8px] font-bold text-[#42526E]">
                                U{i}
                            </div>
                        ))}
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 gap-2 text-[#42526E] font-medium">
                        <Share2 size={14} />
                        Share
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#42526E]">
                        <MoreHorizontal size={16} />
                    </Button>
                </div>
            </div>

            {/* Bottom Bar / Nav Items */}
            <div className="h-10 flex items-center px-6 gap-4 overflow-x-auto no-scrollbar">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2 h-full px-2 text-[13px] font-semibold transition-all border-b-2 relative",
                                isActive
                                    ? "text-[#0052CC] border-[#0052CC]"
                                    : "text-[#42526E] border-transparent hover:text-[#0052CC] hover:bg-gray-50"
                            )}
                        >
                            <Icon size={16} className={cn(isActive ? "text-[#0052CC]" : "text-[#6B778C]")} />
                            {item.name}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

"use client"
import { useState } from 'react'
import { LayoutDashboard, Layers, ClipboardPlus, Settings, Users } from "lucide-react";
import Link from 'next/link'

function ProjectSidebar({ workspaceId, projectId }: { workspaceId: string, projectId: string }) {
  const [collapsed, setCollapsed] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>("ActiveView");

  return (
    <aside className={`${collapsed ? 'w-16' : 'sm:w-56'} transition-all duration-200 relative h-[calc(100vh-4rem)] border-r p-4`}>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-0.5 right-0 font-bold text-xl">
        {collapsed ? "▶" : "◀"}
      </button>
      {/* Navigation */}
      <ul className="space-y-1 mt-6">
        <li className="flex justify-start items-center h-10 hover:bg-muted rounded-sm p-1">
        <Link title='Dashboard' href={`/workspace/${workspaceId}`}><LayoutDashboard className="inline w-6 h-6 mr-2" />
            {!collapsed && <span className="ml-2">Dashboard</span>}
        </Link></li>
        <li onClick={() => (setOpenMenuId("ActiveView"))} className= {`flex justify-start items-center h-10 ${openMenuId === "ActiveView" ? "bg-blue-100/70" : "hover:bg-muted"} rounded-sm p-1`}>
          <Link title='Active Sprints' href={`/workspace/${workspaceId}/project/${projectId}/board`} className="flex items-center gap-2">
           <Layers className="inline w-6 h-6 mr-2" />
           {!collapsed && <span className="ml-2">Active View</span>}
           </Link></li>
        <li onClick={() => (setOpenMenuId("Reports"))} className= {`flex justify-start items-center h-10 ${openMenuId === "Reports" ? "bg-blue-100/70" : "hover:bg-muted"} rounded-sm p-1`}>
          <Link title='Reports' href={`/workspace/${workspaceId}/project/${projectId}/reports`} className="flex items-center gap-2">
            <ClipboardPlus className="inline w-6 h-6 mr-2" />
            {!collapsed && <span className="ml-2">Reports</span>}
          </Link>
        </li>
      </ul>

      {/* Team */}
      <p className={`text-lg font-bold my-4`}>{!collapsed && <span className="ml-2">Team</span>}</p>

      <ul className="space-y-1">
        <li onClick={() => (setOpenMenuId("Team"))} className= {`flex justify-start items-center h-10 ${openMenuId === "Team" ? "bg-blue-100/70" : "hover:bg-muted"} rounded-sm p-1`}>
          <Link title='Team' href={`/workspace/${workspaceId}/project/${projectId}/team`} className="flex items-center gap-2">
            <Users className="inline w-6 h-6 mr-2" />
                {!collapsed && <span className="ml-2">Team</span>}
          </Link>
        </li>
        <li onClick={() => (setOpenMenuId("Settings"))} className= {`flex justify-start items-center h-10 ${openMenuId === "Settings" ? "bg-blue-100/70" : "hover:bg-muted"} rounded-sm p-1`}>
          <Link title='Settings'   href={`/workspace/${workspaceId}/project/${projectId}/settings`} className="flex items-center gap-2">
            <Settings className="inline w-6 h-6 mr-2" />
            {!collapsed && <span className="ml-2">Settings</span>}
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default ProjectSidebar;
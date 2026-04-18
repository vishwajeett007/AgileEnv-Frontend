"use client";
import Link from 'next/link';
import { Kanban, GitGraph, Calendar, List } from 'lucide-react';
import { usePathname } from "next/navigation";

function ProjectHeader({ workspaceId, projectId}: { workspaceId: string; projectId: string; }) {
  const pathname = usePathname();

  const segments = pathname.split('/');
  const selected = segments[segments.length - 1];

  return (
    <div className="sticky top-0 bg-white border-b px-6 py-3 z-10">
          <div className="flex gap-6 text-sm">
            <Link href={`/workspace/${workspaceId}/project/${projectId}/board`} className={`p-1 px-2 ${selected === 'board' ? 'font-medium' : 'text-muted-foreground'} hover:bg-gray-200 rounded-sm`}
            >
             <Kanban className="inline w-5 h-5 mr-1"/>
              Board
            </Link>
            <Link href={`/workspace/${workspaceId}/project/${projectId}/backlog`} className={`p-1 px-2 ${selected === 'backlog' ? 'font-medium' : 'text-muted-foreground'} hover:bg-gray-200 rounded-sm`}
            >
                <GitGraph className="inline w-5 h-5 mr-1" />
              Backlog
            </Link>
            <Link href={`/workspace/${workspaceId}/project/${projectId}/timeline`} className={`p-1 px-2 ${selected === 'timeline' ? 'font-medium' : 'text-muted-foreground'} hover:bg-gray-200 rounded-sm`}
            >
              <Calendar className="inline w-5 h-5 mr-1" />
              Timeline
            </Link>
            <Link href={`/workspace/${workspaceId}/project/${projectId}/list`} className={`p-1 px-2 ${selected === 'list' ? 'font-medium' : 'text-muted-foreground'} hover:bg-gray-200 rounded-sm`}
            >
              <List className="inline w-5 h-5 mr-1"/>
              List
            </Link>
          </div>

        </div>
  )
}

export default ProjectHeader;
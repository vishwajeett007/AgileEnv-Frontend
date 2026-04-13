import  Link  from "next/link";
import ProjectHeader from "@/features/project/components/project-header";
import{ LayoutDashboard , Layers , ClipboardPlus , Settings, Users} from "lucide-react";

export default async function ProjectLayout({
  children, params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string; projectId: string }>;
}) {
  const { workspaceId, projectId } = await params;
  return (
    <div className="flex flex-col md:flex-row h-full">
      
      {/* Sidebar */}
      <aside className="hidden md:block w-full h-[calc(100vh-4rem)] max-w-64 border-r p-4">
        <ul className="space-y-1 mt-6">
          <li className="flex justify-start items-center h-10 hover:bg-muted rounded-sm p-2"><Link href={`/workspace/${workspaceId}`}><LayoutDashboard className="inline w-6 h-6 mr-2"/>Dashboard</Link></li>
          <li className="flex justify-start items-center h-10 hover:bg-muted rounded-sm p-2"><Link href={`/workspace/${workspaceId}/project/${projectId}/sprints`}> <Layers className="inline w-6 h-6 mr-2"/>Active Sprints</Link></li>
          <li className="flex justify-start items-center h-10 hover:bg-muted rounded-sm p-2"><Link href={`/workspace/${workspaceId}/project/${projectId}/reports`}>  <ClipboardPlus className="inline w-6 h-6 mr-2"/> Reports</Link></li>
        </ul>

        {/* Team */}
        <p className="text-lg font-bold my-4">Team</p>
        <ul className="space-y-1">
          <li className="flex justify-start items-center h-10 hover:bg-muted rounded-sm p-2">
            <Link href={`/workspace/${workspaceId}/project/${projectId}/team`} className="flex items-center gap-2">
              <Users className="inline w-6 h-6 mr-2" />
              Members
            </Link>
          </li>
          <li className="flex justify-start items-center h-10 hover:bg-muted rounded-sm p-2">
            <Link href={`/workspace/${workspaceId}/project/${projectId}/settings`}> <Settings className="inline w-6 h-6 mr-2"/>Settings</Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">

        <ProjectHeader workspaceId={workspaceId} projectId={projectId} />
        {/* Page Content */}
        <div>
          {children}
        </div>

      </main>

    </div>
  );
}
import ProjectHeader from "@/features/project/components/project-header";
import ProjectSidebar from "@/features/project/components/project-sidebar";
import { ProjectViewProvider } from "@/features/project/components/project-view-context";

export default async function ProjectLayout({
  children, params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string; projectId: string }>;
}) {
  const { workspaceId, projectId } = await params;
  return (
    <ProjectViewProvider>
      <div className="flex h-full overflow-hidden">
        {/* Sidebar */}
        <ProjectSidebar workspaceId={workspaceId} projectId={projectId} />

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <ProjectHeader workspaceId={workspaceId} projectId={projectId} />
          {/* Page Content */}
          <div>{children}</div>
        </main>
      </div>
    </ProjectViewProvider>
  );
}
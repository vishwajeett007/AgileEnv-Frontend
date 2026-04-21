import { LogoutButton } from "@/features/auth/components/logout-button";

import type { DashboardWorkspace } from "../types";
import { WorkspaceListItem } from "./workspace-list-item";

interface WorkspaceListProps {
  workspaces: DashboardWorkspace[];
  selectedWorkspaceId: string;
  onCreateWorkspace: () => void;
  onSelectWorkspace: (workspaceId: string) => void;
}

export function WorkspaceList({
  workspaces,
  selectedWorkspaceId,
  onCreateWorkspace,
  onSelectWorkspace,
}: WorkspaceListProps) {
  return (
    <main className="h-full py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Workspaces</h1>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-md bg-[#0057E5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0046b8]"
            onClick={onCreateWorkspace}
          >
            + New Workspace
          </button>
          <LogoutButton />
        </div>
      </div>

      <div className="border-t border-border py-4 overflow-auto">
        {workspaces.map((workspace) => (
          <WorkspaceListItem
            key={workspace.id}
            workspace={workspace}
            isSelected={selectedWorkspaceId === workspace.id}
            onSelect={onSelectWorkspace}
          />
        ))}
      </div>
    </main>
  );
}

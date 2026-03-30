import { cn } from "@/shared/utils";

import type { DashboardWorkspace } from "../types";

interface WorkspaceListItemProps {
  workspace: DashboardWorkspace;
  isSelected: boolean;
  onSelect: (workspaceId: string) => void;
}

export function WorkspaceListItem({
  workspace,
  isSelected,
  onSelect,
}: WorkspaceListItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(workspace.id)}
      className={cn(
        "mt-4 flex w-full items-start justify-between gap-6 border-b px-4 py-8 text-left",
        isSelected && "border-l-4 border-[#0057E5] bg-[#DAE9FA]/50 pl-4"
      )}
    >
      <div className="space-y-1">
        <h3 className="text-xl text-foreground">
          {workspace.title}
          {workspace.status ? (
            <span className="ml-2 rounded bg-blue-200 px-1 py-0.5 text-xs font-semibold text-[#0057E5]">
              {workspace.status}
            </span>
          ) : null}
        </h3>
        <p className="text-sm text-muted-foreground">{workspace.description}</p>
      </div>

      <div className="flex shrink-0 items-center gap-4 text-sm text-muted-foreground">
        <span>{workspace.lastUpdated}</span>
        <span
          className={cn(
            "rounded px-2 py-1 text-xs",
            workspace.visibility === "PUBLIC"
              ? "bg-[#DAE9FA] text-[#0057E5]"
              : "bg-muted text-muted-foreground"
          )}
        >
          {workspace.visibility}
        </span>
      </div>
    </button>
  );
}

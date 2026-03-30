"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import WorkSpaceSetUp from "@/features/onboarding/components/onboarding-modal";

import { dashboardProfile, dashboardWorkspaces } from "../constants";
import { DashboardProfile } from "./dashboard-profile";
import { WorkspaceList } from "./workspace-list";

export default function Dashboard() {
  const router = useRouter();
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(
    dashboardWorkspaces[0]?.id ?? ""
  );
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleSelectWorkspace = (workspaceId: string) => {
    setSelectedWorkspaceId(workspaceId);
    router.push(`/workspace/${workspaceId}`);
  };

  return (
    <div className="min-h-screen w-full bg-background px-6 lg:px-15 xl:px-20">
      <div className="grid min-h-screen grid-cols-1 gap-10 lg:grid-cols-[35%_1fr]">
        <DashboardProfile profile={dashboardProfile} />
        <WorkspaceList
          workspaces={dashboardWorkspaces}
          selectedWorkspaceId={selectedWorkspaceId}
          onCreateWorkspace={() => setShowOnboarding(true)}
          onSelectWorkspace={handleSelectWorkspace}
        />
      </div>
      <WorkSpaceSetUp open={showOnboarding} onOpenChange={setShowOnboarding} />
    </div>
  );
}

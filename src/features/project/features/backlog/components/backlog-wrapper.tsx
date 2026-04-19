"use client";

import { useState } from "react";
import BacklogCenterPanel from "./backlog-center-panel";
import BacklogRightPanel from "./backlog-right-panel";
import { Issue } from "../../board/types/kanban";

export default function BacklogWrapper() {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  return (
    <div className="flex h-[calc(100vh-120px)] w-full overflow-hidden bg-gray-50">
      {/* Center */}
      <BacklogCenterPanel
        onSelectIssue={setSelectedIssue}
        selectedIssue={selectedIssue}
      />

      {/* Right Panel */}
      <div
        className={`transition-all duration-300 ease-in-out  ${
          selectedIssue ? "w-90" : "w-0"
        }`}
      >
        {selectedIssue && (
          <BacklogRightPanel
            issue={selectedIssue}
            onClose={() => setSelectedIssue(null)}
          />
        )}
      </div>
    </div>
  );
}
"use client"
import IssueModal from "@/features/project/components/issue-modal";
import BacklogRightPanel from "@/features/project/features/backlog/components/backlog-right-panel";
import { Issue } from "../../board/types/kanban";
import { useAppSelector } from '@/store/hooks';
import { useEffect, useState } from "react";

function ListView() {
  const columns = useAppSelector((state) => state.board.columns);
  const allIssues = columns.flatMap(col =>
    col.id !== 'backlog' ? col.issues : []
  );

  const [isOpen, setIsOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [filtered, setFilter] = useState("high");

  const handleSelectIssue = (issue: Issue) => {
    setSelectedIssue(issue);
  };

 const filteredIssues = allIssues.filter(issue => {
  if (filtered === "high") return issue.priority === "high";
  if (filtered === "open") return issue.category !== "done";
  if (filtered === "all") return true;
  return true;
});

  return (
    <div className="flex h-[calc(100vh-120px)] w-full overflow-hidden bg-gray-50">

      {/* LEFT SIDE */}
      <div className="relative w-full flex flex-col flex-1 bg-white text-gray-800">

        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 border-b">
          <ul className="flex gap-3 [&>li]:px-3 [&>li]:py-1 [&>li]:rounded-md [&>li]:cursor-pointer [&>li]:hover:bg-blue-100">
            <li onClick={() => (setFilter("all"))} className={`${filtered === "all" ? "bg-gray-200/70" : ""} font-medium`}>
              All Issues
            </li>
            <li onClick={() => (setFilter("my"))} className={`${filtered === "my" ? "bg-gray-200/70" : ""} font-medium`}>
              My Issues
            </li>
            <li onClick={() => (setFilter("high"))} className={`
              ${filtered === "high" ? "bg-gray-200/70" : ""} font-medium flex items-center gap-2
            `}>
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              High Priority
            </li>
            <li onClick={() => (setFilter("open"))} className={`${filtered === "open" ? "bg-gray-200/70" : ""} font-medium`}>
              Open
            </li>
          </ul>

          <span className="text-xs text-gray-500">
            Displaying {filteredIssues.length} issues
          </span>
        </header>

        {/* Table Header */}
        <div className="grid grid-cols-6 px-6 py-3 text-xs font-semibold text-gray-500 border-b bg-gray-50">
          <span>ID</span>
          <span className="col-span-2">TITLE</span>
          <span>PRIORITY</span>
          <span>STATUS</span>
          <span>DUE DATE</span>
        </div>

        {/* SCROLL AREA */}
        <ul className="flex-1 overflow-y-auto divide-y">
          {filteredIssues.map((issue: Issue) => (
            <li
              key={issue.id}
              onClick={() => handleSelectIssue(issue)}
              className="grid grid-cols-6 px-6 py-4 items-center hover:bg-gray-100 transition cursor-pointer"
            >
              <span className="text-gray-500">{issue.id}</span>

              <span className="col-span-2 font-medium text-gray-900">
                {issue.title}
              </span>

              {/* Priority */}
              <span>
                <span className={`
                  px-2 py-1 text-xs rounded font-medium
                  ${issue.priority === "high" && "text-red-600"}
                  ${issue.priority === "medium" && "text-yellow-700"}
                  ${issue.priority === "low" && "text-gray-600"}
                `}>
                  {issue.priority}
                </span>
              </span>

              {/* Status */}
              <span>
                <span className={`
                  px-2 py-1 text-xs rounded font-medium
                  ${issue.category === "in-progress" && "bg-blue-100 text-blue-600"}
                  ${issue.category === "todo" && "bg-gray-100 text-gray-600"}
                  ${issue.category === "done" && "bg-green-100 text-green-600"}
                `}>
                  {issue.category}
                </span>
              </span>

              <span className="text-gray-500">--</span>
            </li>
          ))}
        </ul>

        {/* FLOATING BUTTON */}
        <button
          onClick={() => setIsOpen(true)}
          className="absolute bottom-6 right-6 bg-linear-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white w-14 h-14 rounded-xl shadow-lg flex items-center justify-center text-2xl transition hover:scale-105"
        >
          +
        </button>

        {isOpen && (
          <IssueModal
            issueId=""
            columnId="todo"
            onClose={() => setIsOpen(false)}
            handleCreate={true}
          />
        )}
      </div>

      {/* RIGHT PANEL */}
      <div
        className={`overflow-hidden transition-[width] duration-300 ease-in-out shrink-0 ${
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

export default ListView;
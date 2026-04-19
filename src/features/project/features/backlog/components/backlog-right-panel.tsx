import { useState } from "react";
import { Column, Issue } from "../../board/types/kanban";
import Image from "next/image";
import { Edit } from "lucide-react";
import IssueModal from "@/features/project/components/issue-modal";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { updateIssue } from "../../board/store/board-slice";

export default function BacklogRightPanel({
  issue,
  onClose,
}: {
  issue: Issue ;
  onClose: () => void;
}) {
  const [edits, setEdits] = useState(false);
  const columns = useAppSelector((state) => state.board.columns);
  const allIssues = columns.flatMap(col => col.issues);
  const selectedIssue = allIssues.find(i => i.id === issue.id) || issue;
  const dispatch = useAppDispatch();

  const handleChange = (field: string, value: string) => {
    if (field === 'category') {
      dispatch(updateIssue({ issueId: selectedIssue.id, columnId: selectedIssue.category, updatedData: { ...selectedIssue, category: value } }));
    } else if (field === 'priority') {
      dispatch(updateIssue({ issueId: selectedIssue.id, columnId: selectedIssue.category, updatedData: { ...selectedIssue, priority: value, } }));
    } else if (field === 'label') {
      dispatch(updateIssue({ issueId: selectedIssue.id, columnId: selectedIssue.category, updatedData: { ...selectedIssue, label: value, } }));
    } else {
      dispatch(updateIssue({ issueId: selectedIssue.id, columnId: selectedIssue.category, updatedData: { ...selectedIssue, points: Number(value), } }));
    }
  }

  return (
    <div className="w-full sm:w-90 h-full bg-white border-l p-5 flex flex-col animate-slide-in">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-xs text-gray-400 uppercase">
            Issue Details
          </p>
          <p className="text-xs text-gray-400">{selectedIssue.id}</p>
          <h2 className="font-semibold mt-1">{selectedIssue.title}</h2>
        </div>
        <div className="flex gap-3 items-center text-gray-400 hover:text-gray-600">
          <Edit onClick={() => (setEdits(true))} className="w-5 h-5 text-blue-600 text-sm transition-all hover:scale-110 cursor-pointer" /> <span onClick={onClose}>✕</span>
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-xs text-gray-400">Status</p>
          <select
            title="status"
            value={selectedIssue.category}
            onChange={(e) => (handleChange('category', e.target.value))}
            className="bg-gray-100 p-2 rounded-md text-sm">
            <option value="backlog">Backlog</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <p className="text-xs text-gray-400">Priority</p>
          <select
            title="priority"
            value={selectedIssue.priority}
            onChange={(e) => (handleChange('priority', e.target.value))}
            className="bg-gray-100 p-2 rounded-md text-sm">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-xs text-gray-400">Label</p>
          <select
            title="label"
            value={selectedIssue.label}
            onChange={(e) => (handleChange('label', e.target.value))}
            className="bg-gray-100 p-2 rounded-md text-sm">
            <option value="ENG">ENG</option>
            <option value="DES">DES</option>
            <option value="QA">QA</option>
            <option value="DEVOPS">DEVOPS</option>
            <option value="PRODUCT">PRODUCT</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>

        <div>
          <p className="text-xs text-gray-400">Points</p>
          <input
            title="points"
            type="number"
            value={selectedIssue.points}
            onChange={(e) => (handleChange('points', e.target.value))}
            className="w-20 bg-gray-100 p-2 rounded-md text-sm"/>
        </div>
      </div>

      {/* Assignee */}
      <div className="mb-4">
        <p className="text-xs text-gray-400 mb-1">Assignee</p>
        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md">
          <Image
            src={selectedIssue.assignees[0].avatar}
            alt="avatar"
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="text-sm">Alex</span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-xs text-gray-400 mb-2">Description</p>
        <p className="text-sm text-gray-700">
          Improve performance and structure of authentication middleware.
        </p>
      </div>

      {/* Comment */}
      <div className="mt-auto">
        <input
          placeholder="Add a comment..."
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
        <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md text-sm">
          Post
        </button>
      </div>
      {edits && <IssueModal issueId={selectedIssue.id} columnId={selectedIssue.category} onClose={() => setEdits(false)} handleCreate={false} />}
    </div>
  );
}
import { Issue } from "./backlog-wrapper";
import Image from "next/image";

export default function BacklogRightPanel({
  issue,
  onClose,
}: {
  issue: Issue;
  onClose: () => void;
}) {
  return (
    <div className="w-full sm:w-90 h-full bg-white border-l p-5 flex flex-col animate-slide-in">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-xs text-gray-400 uppercase">
            Issue Details
          </p>
          <p className="text-xs text-gray-400">{issue.id}</p>
          <h2 className="font-semibold mt-1">{issue.title}</h2>
        </div>

        <button onClick={onClose}>✕</button>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-xs text-gray-400">Status</p>
          <div className="bg-gray-100 p-2 rounded-md text-sm">
            In Progress
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-400">Priority</p>
          <div className="bg-gray-100 p-2 rounded-md text-sm">
            High
          </div>
        </div>
      </div>

      {/* Assignee */}
      <div className="mb-4">
        <p className="text-xs text-gray-400 mb-1">Assignee</p>
        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md">
          <Image
            src="https://i.pravatar.cc/40"
            alt="avatar"
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="text-sm">Alex Rivera</span>
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
    </div>
  );
}
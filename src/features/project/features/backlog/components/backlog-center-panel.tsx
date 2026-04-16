import Image from "next/image";
import { Issue } from "./backlog-wrapper";

const Images = [
  { src: "https://i.pravatar.cc/49?img=5" },
  { src: "https://i.pravatar.cc/49?img=4" },
  { src: "https://i.pravatar.cc/49?img=3" },
];

const sprintItems: Issue[] = [
  {
    id: "PHX-1024",
    title: "Refactor data persistence layer for edge nodes",
    tag: "Core Engine",
    points: 8,
  },
  {
    id: "PHX-1025",
    title: "Race condition in multi-tenant authentication",
    points: 13,
  },
  {
    id: "PHX-1028",
    title: "Add telemetry for cold-start latency tracking",
    points: 3,
  },
];

const backlogItems: Issue[] = [
  {
    id: "PHX-988",
    title: "Implement shard-aware query routing",
    tag: "Infrastructure",
    points: 21,
  },
  {
    id: "PHX-992",
    title: "Dark mode toggle for admin dashboard",
    tag: "UI/UX",
    points: 5,
  },
  {
    id: "PHX-1001",
    title: "Secure WebSocket handshake for real-time fleet updates",
    tag: "Security",
    points: 8,
  },
];

function AvatarGroup() {
  return (
    <div className="flex items-center">
      {Images.map((img, i) => (
        <Image
          key={i}
          src={img.src}
          alt="avatar"
          width={24}
          height={24}
          className="w-6 h-6 rounded-md border border-white -ml-2 first:ml-0"
        />
      ))}
      <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-md">
        +12
      </span>
    </div>
  );
}

function Item({
  item,
  onClick,
  isSelected,
}: {
  item: Issue;
  onClick: (i: Issue) => void;
  isSelected: boolean;
}) {
  return (
    <div
      onClick={() => onClick(item)}
      className={`flex justify-between items-center py-3 px-3 rounded-md cursor-pointer transition
        ${isSelected ? "bg-blue-50" : "hover:bg-gray-100"}
      `}
    >
      <div>
        <p className="text-xs text-gray-400">{item.id}</p>
        <p className="text-sm font-medium">{item.title}</p>
      </div>

      <div className="flex items-center gap-3">
        {item.tag && (
          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-md">
            {item.tag}
          </span>
        )}
        <span className="text-sm font-semibold">{item.points}</span>
      </div>
    </div>
  );
}

export default function BacklogCenterPanel({
  onSelectIssue,
  selectedIssue,
}: {
  onSelectIssue: (issue: Issue) => void;
  selectedIssue: Issue | null;
}) {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Phoenix Platform</h1>
          <p className="text-sm text-gray-500">
            High-performance engine for distributed logistics.
          </p>
        </div>
        <AvatarGroup />
      </div>

      {/* Sprint */}
      <div className="mb-6">
        <div className="flex justify-between mb-3">
          <div className="flex gap-2 items-center">
            <h2 className="font-semibold">Sprint 12</h2>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 rounded">
              ACTIVE
            </span>
          </div>
          <button className="bg-gray-900 text-white px-3 py-1 rounded-md text-sm">
            Complete Sprint
          </button>
        </div>

        <div className="bg-white border rounded-xl p-3 space-y-1">
          {sprintItems.map((item) => (
            <Item
              key={item.id}
              item={item}
              onClick={onSelectIssue}
              isSelected={selectedIssue?.id === item.id}
            />
          ))}
        </div>
      </div>

      {/* Backlog */}
      <div>
        <div className="flex justify-between mb-3">
          <h2 className="font-semibold">Backlog</h2>
          <button className="text-blue-600 text-sm">
            Create Sprint
          </button>
        </div>

        <div className="bg-white border rounded-xl p-3 space-y-1">
          {backlogItems.map((item) => (
            <Item
              key={item.id}
              item={item}
              onClick={onSelectIssue}
              isSelected={selectedIssue?.id === item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
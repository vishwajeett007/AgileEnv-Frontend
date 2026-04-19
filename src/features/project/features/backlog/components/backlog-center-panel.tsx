import Image from "next/image";
import { Issue } from "../../board/types/kanban";
import CreateIssueModal from "@/features/project/components/issue-modal";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { move } from "../../board/store/board-slice";


const Images = [
  { src: "https://i.pravatar.cc/49?img=5" },
  { src: "https://i.pravatar.cc/49?img=4" },
  { src: "https://i.pravatar.cc/49?img=3" },
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
      <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-md">
        +12
      </span>
    </div>
  );
}

function Item({
  item,
  onClick,
  isSelected,
  dragData,
}: {
  item: Issue;
  onClick: (i: Issue) => void;
  isSelected: boolean;
  dragData: React.RefObject<{ issueId: string; columnId: string } | null>;
}) {
  const handleDrag = (
    e: React.DragEvent,
    issueId: string,
    columnId: string
  ) => {
    dragData.current = { issueId, columnId };
  };
  return (
    <div
    draggable
    onDragStart={(e) => handleDrag(e, item.id, item.category)}
    onClick={() => onClick(item)}
    className={`flex justify-between items-center py-2 px-3 rounded-md cursor-pointer transition border-b
      ${isSelected ? "bg-blue-50" : "hover:bg-gray-100"}
      `}
      >
      <div>
        <p className="text-xs text-gray-400">{item.id}</p>
        <span className="text-sm font-medium mr-1">{item.title}</span>
        <span className="text-xs bg-blue-200 rounded-[4px] text-white px-1 py-0.5">
          {item.category}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {item.label && (
          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-md">
            {item.label}
          </span>
        )}
        <span className={`text-xs px-2 py-0.5 rounded-md ${item.priority === 'high' ? 'bg-red-100 text-red-600' : item.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
          {item.priority}
        </span>
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
  const columns = useAppSelector((state) => state.board.columns);
  const backlogItems: Issue[] = columns.find(col => col.id === 'backlog')?.issues || [];
  const allIssues = columns.flatMap(col => col.issues && col.id !== 'backlog' ? col.issues : []);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpand, setIsExpand] = useState(true);
  const dispatch = useAppDispatch();
  const dragData = useRef<{ issueId: string; columnId: string } | null>(null);

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
     const { issueId, columnId: sourceColumnId } = dragData.current || {};
         
         if (!issueId || !sourceColumnId) return;
    
        if (sourceColumnId === targetColumnId) return;
    
        dispatch(move({ issueId, sourceColumnId, targetColumnId }));
  }

  return (
    <>
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

      {/* Kanban Issues */}
      <div className={`mb-6`}>
        <div className="flex justify-between mb-3">
          <div className="flex gap-2 items-center">
            <h2 className="font-semibold">Board</h2>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 rounded">
              ACTIVE
            </span>
            <span onClick={() => setIsExpand(!isExpand)} className="cursor-pointer">
              {isExpand ? <ChevronDown /> : <ChevronUp />}
            </span>
          </div>
          {/* <button className="bg-gray-900 text-white px-3 py-1 rounded-md text-sm">
            Complete Sprint
          </button> */}
        </div>

        <div 
        onDragOver={(e) => (e.preventDefault())}
        onDrop={(e) => handleDrop(e, 'todo')}
        className={`transition-max-height duration-500 ${isExpand ? 'max-h-96' : 'max-h-45'} bg-white border rounded-xl p-3 space-y-1 overflow-auto no-scrollbar`}>
          {allIssues.map((item , index) => (
            <Item
              dragData={dragData}
              key={index}
              item={item}
              onClick={() => onSelectIssue(item)}
              isSelected={selectedIssue?.id === item.id}
            />
          ))}
        </div>
      </div>

      {/* Backlog */}
      <div>
        <div className="flex justify-between mb-3">
          <h2 className="font-semibold">Backlog</h2>
          <button className="text-blue-600 text-sm transition-all hover:scale-110 cursor-pointer"
          onClick={() => (setIsOpen(true))}
          >
            Create Issue
          </button>
        </div>

        <div 
        onDragOver={(e) => (e.preventDefault())}
        onDrop={(e) => handleDrop(e, 'backlog')}
        className="bg-white border rounded-xl p-3 space-y-1">
          {backlogItems.map((item) => (
            <Item
              dragData={dragData}
              key={item.id}
              item={item}
              onClick={onSelectIssue}
              isSelected={selectedIssue?.id === item.id}
            />
          ))}
        </div>
      </div>
    </div>
   {isOpen && <CreateIssueModal issueId=""  columnId="backlog" onClose={()=> (setIsOpen(false))} handleCreate={true} />}
    </>
  );
}
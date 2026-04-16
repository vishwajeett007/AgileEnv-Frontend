"use client"
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import IssueModal from '../../../components/issue-modal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { move, deleteIssue, updateIssue } from '../store/board-slice';

function KanbanBoard() {

  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) => state.board.columns);
  
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<{ issueId: string; columnId: string } | null>(null);
  const [createIssue, setCreateIssue] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const dragData = useRef<{ issueId: string; columnId: string } | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [])

  // handle drag start
  const handleDragStart = (
    e: React.DragEvent,
    issueId: string,
    columnId: string
  ) => {
    dragData.current = { issueId, columnId };
  };

  // handle drop
  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
     const { issueId, columnId: sourceColumnId } = dragData.current || {};
     
     if (!issueId || !sourceColumnId) return;

    if (sourceColumnId === targetColumnId) return;

    dispatch(move({ issueId, sourceColumnId, targetColumnId }));
  };

  // handle delete
  const deleteIssueHandler = (issueId: string, columnId: string) => {
    dispatch(deleteIssue({ issueId, columnId }));
  };


  return (
    <div className='flex justify-around p-4 bg-gray-50 lg:px-20 xl:px-30 overflow-x-auto'>
      {/* Column */}
      {columns.map((column) => (
        <div
          key={column.id}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, column.id)}
          className='w-1/3 min-w-60 rounded p-4 overflow-hidden'>

          {/* Column header */}
          <div className={`flex ${column.id === 'todo' ? 'justify-between' : 'justify-center'}`}>
          <div className='flex flex-col w-full'>
            <h3 className='font-bold mb-2'>{column.title}</h3>
            <p className='text-sm text-muted-foreground mb-3'>{column.count} issues</p>
          </div>
          <div className={`h-8 flex w-full sm:max-w-1/3 justify-center items-center text-white text-sm ${column.id === 'todo' ? 'block' : 'hidden'} bg-blue-400 rounded-sm`}
          onClick={() => setCreateIssue(true)}
          >+ Add Issue</div>
          </div>

          {/* Issues box */}
          <div className='max-h-[calc(100vh-250px)] overflow-y-auto no-scrollbar'>
            {column.issues.map((issue) => (
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, issue.id, column.id)}
                className='group p-2 bg-gray-100 rounded shadow space-y-5 mb-5 '
                key={issue.id}>
                {/* Issue header */}
                <div className='flex justify-between mb-2 relative'>
                  <h2 className='font-bold line-clamp-2 pr-10'>{issue.title}</h2>
                  <div
                    onClick={() =>
                      setOpenMenuId(openMenuId === issue.id ? null : issue.id)
                    }
                    className="relative p-1 rounded"
                  >
                    <MoreHorizontal className={`w-5 h-5 mb-6 transition ${openMenuId === issue.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`} />
                  </div>
                  {/* Dropdown */}
                  {openMenuId === issue.id && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 top-8 w-32 bg-white border rounded shadow-md z-10 animate-fade-in">
                      <ul className="text-sm">
                        <li className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                          onClick={() => setSelectedIssue({ issueId: issue.id, columnId: column.id })}
                        >
                          <Edit className="w-4 h-4 inline mr-1" />
                          Edit
                        </li>
                        <li className="px-3 py-2 hover:bg-red-100 cursor-pointer"
                          onClick={() => deleteIssueHandler(issue.id, column.id)}
                        >
                          <Trash2 className="w-4 h-4 inline mr-1" />
                          Delete
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Issue details (id & label) */}
                <div className='flex justify-between items-center gap-2'>
                  <div className='flex gap-2'>
                    <div className='text-xs px-1 rounded-xs bg-gray-100 text-muted-foreground'>{issue.id}</div>
                    <div className='text-xs px-1 rounded-xs bg-gray-100 text-muted-foreground'>
                      {issue.label}
                    </div>
                  </div>

                  {/* Priority */}
                  <div className='flex items-center gap-1'>
                    {issue.priority === 'high' && <span className='text-red-500 text-xs'>High</span>}
                    {issue.priority === 'medium' && <span className='text-yellow-500 text-xs'>Medium</span>}
                    {issue.priority === 'low' && <span className='text-green-500 text-xs'>Low</span>}

                    {/* Images */}
                    <div className='flex justify-end shrink-0'>{issue.assignees.map((assignee, index) => (
                      <Image width={6}
                        height={6}
                        key={assignee.name}
                        src={assignee.avatar}
                        alt={assignee.name}
                        className="w-6 h-6 rounded-full border-2 border-white -ml-2 first:ml-0"
                        style={{ zIndex: issue.assignees.length - index }}
                      />
                    ))}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {selectedIssue && <IssueModal
        issueId={selectedIssue.issueId}
        columnId={selectedIssue.columnId}
        onClose={() => setSelectedIssue(null)}
        handleCreate={false}
      />}
      {createIssue && <IssueModal
        issueId={""}
        columnId={"todo"}
        onClose={() => setCreateIssue(false)}
        handleCreate={true}
      />}
    </div>
  )
}

export default KanbanBoard;
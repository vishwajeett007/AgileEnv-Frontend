"use client"
import {useState} from 'react'
// import { Draggable, Droppable } from 'react-beautiful-dnd';
import Image from 'next/image';
import { Column, Issue, Assignee } from '../types/kanban';

function KanbanBoard() {

  const data: { columns: Column[] } = {
    "columns": [
      {
        "id": "todo",
        "title": "TODO",
        "count": 4,
        "issues": [
          {
            "id": "AF-128",
            "title": "Implement OAuth2 provider with Refresh Tokens",
            "label": "ENG",
            "priority": "high",
            "comments": 3,
            "assignees": [
              {
                "name": "John Doe",
                "avatar": "https://i.pravatar.cc/40?img=1"
              }
            ]
          },
          {
            "id": "AF-142",
            "title": "Review dark mode contrast ratios in settings",
            "label": "DESIGN",
            "priority": "medium",
            "comments": 0,
            "assignees": [
              {
                "name": "Sarah Kim",
                "avatar": "https://i.pravatar.cc/40?img=5"
              }
            ]
          }
        ]
      },
      {
        "id": "in-progress",
        "title": "IN PROGRESS",
        "count": 2,
        "issues": [
          {
            "id": "AF-104",
            "title": "Migrate Kubernetes cluster to v1.28 nodes",
            "label": "DEVOPS",
            "priority": "high",
            "comments": 2,
            "assignees": [
              {
                "name": "Alex Chen",
                "avatar": "https://i.pravatar.cc/40?img=3"
              },
              {
                "name": "Emma Watson",
                "avatar": "https://i.pravatar.cc/40?img=8"
              }
            ]
          }
        ]
      },
      {
        "id": "done",
        "title": "DONE",
        "count": 3,
        "issues": [
          {
            "id": "AF-099",
            "title": "Setup project repository and CI pipeline",
            "label": "DEVOPS",
            "priority": "low",
            "comments": 1,
            "assignees": [
              {
                "name": "Mike Ross",
                "avatar": "https://i.pravatar.cc/40?img=7"
              }
            ]
          },
          {
            "id": "AF-087",
            "title": "Create login and signup pages",
            "label": "ENG",
            "priority": "medium",
            "comments": 4,
            "assignees": [
              {
                "name": "Rachel Green",
                "avatar": "https://i.pravatar.cc/40?img=9"
              }
            ]
          }
        ]
      }
    ]
  }
  const [columns, setColumns] = useState<Column[]>(data.columns);

const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
  const issueId = e.dataTransfer.getData("issueId");
  const sourceColumnId = e.dataTransfer.getData("sourceColumnId");

  if (sourceColumnId === targetColumnId) return;

  const newColumns = [...columns];

  const sourceColumn = newColumns.find(col => col.id === sourceColumnId);
  const targetColumn = newColumns.find(col => col.id === targetColumnId);

  if (!sourceColumn || !targetColumn) return;

  const issue = sourceColumn.issues.find(i => i.id === issueId);
  if (!issue) return;

  // remove from source
  sourceColumn.issues = sourceColumn.issues.filter(i => i.id !== issueId);

  // add to target
  targetColumn.issues.push(issue);

  setColumns(newColumns);
};
  const handleDragStart = (
  e: React.DragEvent,
  issueId: string,
  columnId: string
) => {
  e.dataTransfer.setData("issueId", issueId);
  e.dataTransfer.setData("sourceColumnId", columnId);
};
  return (
    <div className='flex justify-around p-4 lg:px-20 xl:px-30 overflow-x-auto'>
      {/* Column */}
      {columns.map((column) => (
        <div 
         key={column.id}
         onDragOver={(e) => e.preventDefault()} // VERY IMPORTANT
         onDrop={(e) => handleDrop(e, column.id)}
         className='w-1/3 min-w-60 md:min-w-75 rounded p-4'>
          {/* Column header */}
          <h3 className='font-bold mb-2'>{column.title}</h3>
          <p className='text-sm text-muted-foreground mb-3'>{column.count} issues</p>

          {/* Issues box */}
          {column.issues.map((issue) => (
            <div 
            draggable 
            onDragStart={(e) => handleDragStart(e, issue.id, column.id)}
            className='p-2 bg-gray-200 rounded shadow mb-2 space-y-5 mb-5' key={issue.id}>
              <div className='flex justify-between items-center mb-2'>
                <h2 className='font-bold'>{issue.title}</h2>

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

              {/* Issue details (id & label) */}
              <div className='flex justify-between items-center gap-2'>
                <div className='flex gap-2'>
                  <div className='text-xs px-1 rounded-xs bg-gray-100 text-muted-foreground'>{issue.id}</div>
                  <div className='text-xs px-1 rounded-xs bg-gray-100 text-muted-foreground'>
                    {issue.label}
                  </div>
                </div>
                {/* Priority */}
                <div>
                  {issue.priority === 'high' && <span className='text-red-500 text-xs'>High</span>}
                  {issue.priority === 'medium' && <span className='text-yellow-500 text-xs'>Medium</span>}
                  {issue.priority === 'low' && <span className='text-green-500 text-xs'>Low</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default KanbanBoard;
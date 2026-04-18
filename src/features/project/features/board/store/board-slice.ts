import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Column } from '../types/kanban'

const data: { columns: Column[] } = {
    "columns": [
        {
            "id": "backlog",
            "title": "BACKLOG",
            "count": 3,
            "issues": [
                {
                    "id": "AF-160",
                    "title": "Research new authentication strategies",
                    "label": "ENG",
                    "category": "backlog",
                    "priority": "medium",
                    "points": 5,
                    "comments": 0,
                    "assignees": [
                        {
                            "name": "Peter Parker",
                            "avatar": "https://i.pravatar.cc/40?img=11"
                        }
                    ]
                },
                {
                    "id": "AF-161",
                    "title": "Explore dashboard analytics improvements",
                    "label": "PRODUCT",
                    "category": "backlog",
                    "priority": "low",
                    "points": 3,
                    "comments": 0,
                    "assignees": [
                        {
                            "name": "Natasha Romanoff",
                            "avatar": "https://i.pravatar.cc/40?img=20"
                        }
                    ]
                },
                {
                    "id": "AF-162",
                    "title": "Audit accessibility compliance (WCAG)",
                    "label": "DESIGN",
                    "category": "backlog",
                    "priority": "high",
                    "points": 8,
                    "comments": 1,
                    "assignees": [
                        {
                            "name": "Steve Rogers",
                            "avatar": "https://i.pravatar.cc/40?img=13"
                        }
                    ]
                }
            ]
        },
        {
            "id": "todo",
            "title": "TODO",
            "count": 4,
            "issues": [
                {
                    "id": "AF-128",
                    "title": "Implement OAuth2 provider with Refresh Tokens",
                    "category": "todo",
                    "label": "ENG",
                    "priority": "high",
                    "points": 8,
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
                    "category": "todo",
                    "priority": "medium",
                    "points": 5,
                    "comments": 0,
                    "assignees": [
                        {
                            "name": "Sarah Kim",
                            "avatar": "https://i.pravatar.cc/40?img=5"
                        }
                    ]
                },
                {
                    "id": "AF-104",
                    "title": "Migrate Kubernetes cluster to v1.28 nodes",
                    "label": "DEVOPS",
                    "category": "todo",
                    "priority": "high",
                    "points": 13,
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
                },
                {
                    "id": "AF-143",
                    "title": "Implement OAuth2 provider with Refresh Tokens",
                    "label": "ENG",
                    "category": "todo",
                    "priority": "high",
                    "points": 8,
                    "comments": 3,
                    "assignees": [
                        {
                            "name": "John Doe",
                            "avatar": "https://i.pravatar.cc/40?img=1"
                        }
                    ]
                },
            ]
        },
        {
            "id": "in-progress",
            "title": "IN PROGRESS",
            "count": 3,
            "issues": [
                {
                    "id": "AF-140",
                    "title": "Review dark mode contrast ratios in settings",
                    "label": "DESIGN",
                    "category": "in-progress",
                    "priority": "medium",
                    "points": 5,
                    "comments": 0,
                    "assignees": [
                        {
                            "name": "Sarah Kim",
                            "avatar": "https://i.pravatar.cc/40?img=5"
                        }
                    ]
                },

                // ➕ NEW ISSUES
                {
                    "id": "AF-150",
                    "title": "Fix login API error handling",
                    "label": "ENG",
                    "category": "in-progress",
                    "priority": "high",
                    "points": 8,
                    "comments": 1,
                    "assignees": [
                        {
                            "name": "Tony Stark",
                            "avatar": "https://i.pravatar.cc/40?img=12"
                        }
                    ]
                },
                {
                    "id": "AF-151",
                    "title": "Update UI spacing in dashboard",
                    "label": "DESIGN",
                    "category": "in-progress",
                    "priority": "low",
                    "points": 3,
                    "comments": 0,
                    "assignees": [
                        {
                            "name": "Bruce Wayne",
                            "avatar": "https://i.pravatar.cc/40?img=15"
                        }
                    ]
                }
            ]
        },
        {
            "id": "done",
            "title": "DONE",
            "count": 2,
            "issues": [
                {
                    "id": "AF-099",
                    "title": "Setup project repository and CI pipeline",
                    "label": "DEVOPS",
                    "category": "done",
                    "priority": "low",
                    "points": 5,
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
                    "category": "done",
                    "priority": "medium",
                    "points": 8,
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
interface BoardState {
    columns: Column[];
}

const initialState: BoardState = {
    columns: data.columns
}

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setColumns: (state, action: PayloadAction<Column[]>) => {
            state.columns = action.payload;
        },

        createIssue: (state, action: PayloadAction<{ issue: any, columnId: string }>) => {
            const { issue, columnId } = action.payload;
            const column = state.columns.find(c => c.id === columnId);
            if (column) {
                column.issues.push(issue);
                column.count = column.issues.length;
            }
        },

        move: (state, action: PayloadAction<{ issueId: string, sourceColumnId: string, targetColumnId: string }>) => {
            const { issueId, sourceColumnId, targetColumnId } = action.payload;

            if (sourceColumnId === targetColumnId) return;
            const sourceColumn = state.columns.find(col => col.id === sourceColumnId);
            const targetColumn = state.columns.find(col => col.id === targetColumnId);
            if (!sourceColumn || !targetColumn) return;

            const issue = sourceColumn.issues.find(i => i.id === issueId);
            if (!issue) return;

            if (sourceColumnId === 'backlog' && targetColumnId !== 'backlog') {
                if(targetColumnId === 'todo') {
                    issue.category = 'todo';
                }
                if(targetColumnId === 'in-progress') {
                    issue.category = 'in-progress';
                }
                if(targetColumnId === 'done') {  
                issue.category = 'done';
            }
        } 
            if (targetColumnId === 'backlog') {
                issue.category = 'backlog';
            }
            // remove from source
            sourceColumn.issues = sourceColumn.issues.filter(i => i.id !== issueId);
            sourceColumn.count = sourceColumn.issues.length;
            // add to target
            targetColumn.issues.push(issue);
            targetColumn.count = targetColumn.issues.length;
        },
        deleteIssue: (
            state,
            action: PayloadAction<{ issueId: string; columnId: string }>
        ) => {
            const { issueId, columnId } = action.payload;

            const column = state.columns.find(c => c.id === columnId);
            if (!column) return;

            column.issues = column.issues.filter(i => i.id !== issueId);
            column.count = column.issues.length;
        },
        updateIssue: (
            state,
            action: PayloadAction<{
                issueId: string;
                columnId: string;
                updatedData: Partial<{ title: string; priority: string; label: string; assignees: any[]; category: string; points: number; }>;
            }>
        ) => {
            const { issueId, columnId, updatedData } = action.payload;

            const column = state.columns.find(c => c.id === columnId);
            if (!column) return;

            const issue = column.issues.find(i => i.id === issueId);
            if (!issue) return;

            if(updatedData.category && updatedData.category !== columnId) {
                const targetColumn = state.columns.find(c => c.id === updatedData.category);
                if(targetColumn){
                    column.issues = column.issues.filter(i => i.id !== issueId);
                    targetColumn.issues.push(issue);
                }
            }

            Object.assign(issue, updatedData);
        },
    }
})

export const { setColumns, move, deleteIssue, updateIssue, createIssue } = boardSlice.actions;// Export the action creators
export default boardSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Project {
    id: string
    name: string
}

export interface Issue {
    id: string
    key: string
    summary: string
    status: string // "To Do", "In Progress", "Review", "Done"
    priority: string // "Highest", "High", "Medium", "Low"
    assignee: string
    type: "Task" | "Bug"
}

export interface Note {
    id: string
    title: string
    content: string
    date: string
    author: string
}

export interface Workspace {
    id: string
    name: string
    role: string
    tools: string[]
    projects: Project[]
    issues: Issue[]
    notes: Note[]
}

interface WorkspaceState {
    workspaces: Workspace[]
    activeWorkspaceId: string | null
}

const initialState: WorkspaceState = {
    workspaces: [
        {
            id: "1",
            name: "Default Workspace",
            role: "Owner",
            tools: ["Kanban", "Scrum", "Timeline", "Notes"],
            projects: [
                { id: "p1", name: "Alpha Project" },
                { id: "p2", name: "Beta Project" },
            ],
            issues: [
                { id: "i1", key: "AD-101", summary: "Implement workspace layout", status: "In Progress", priority: "High", assignee: "VS", type: "Task" },
                { id: "i2", key: "AD-102", summary: "Fix sidebar layout responsiveness", status: "To Do", priority: "Highest", assignee: "VS", type: "Bug" },
                { id: "i3", key: "AD-103", summary: "Initial database configuration", status: "Done", priority: "Low", assignee: "JS", type: "Task" },
            ],
            notes: [
                { id: "n1", title: "Sprint 24 Goals", content: "Focus on finalizing the workspace layout and integrating Redux...", date: "2 hours ago", author: "VS" },
            ]
        }
    ],
    activeWorkspaceId: "1",
}

const workspaceSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        addWorkspace: (state, action: PayloadAction<Workspace>) => {
            state.workspaces.push(action.payload)
        },
        setActiveWorkspace: (state, action: PayloadAction<string>) => {
            state.activeWorkspaceId = action.payload
        },
        addProjectToWorkspace: (state, action: PayloadAction<{ workspaceId: string, project: Project }>) => {
            const workspace = state.workspaces.find(w => w.id === action.payload.workspaceId)
            if (workspace) {
                workspace.projects.push(action.payload.project)
            }
        },
        addIssue: (state, action: PayloadAction<{ workspaceId: string, issue: Issue }>) => {
            const workspace = state.workspaces.find(w => w.id === action.payload.workspaceId)
            if (workspace) {
                workspace.issues.push(action.payload.issue)
            }
        },
        updateIssueStatus: (state, action: PayloadAction<{ workspaceId: string, issueId: string, status: string }>) => {
            const workspace = state.workspaces.find(w => w.id === action.payload.workspaceId)
            if (workspace) {
                const issue = workspace.issues.find(i => i.id === action.payload.issueId)
                if (issue) {
                    issue.status = action.payload.status
                }
            }
        },
        deleteIssue: (state, action: PayloadAction<{ workspaceId: string, issueId: string }>) => {
            const workspace = state.workspaces.find(w => w.id === action.payload.workspaceId)
            if (workspace) {
                workspace.issues = workspace.issues.filter(i => i.id !== action.payload.issueId)
            }
        },
        moveIssue: (state, action: PayloadAction<{
            workspaceId: string,
            issueId: string,
            newStatus: string,
            newIndex: number
        }>) => {
            const workspace = state.workspaces.find(w => w.id === action.payload.workspaceId)
            if (!workspace) return

            const issueIndex = workspace.issues.findIndex(i => i.id === action.payload.issueId)
            if (issueIndex === -1) return

            const [issue] = workspace.issues.splice(issueIndex, 1)
            issue.status = action.payload.newStatus

            // Find all issues in the destination column
            const destColumnIssues = workspace.issues.filter(i => i.status === action.payload.newStatus)

            // Find the global index where we should insert the issue
            // We want to insert it at newIndex within the destColumnIssues
            let globalInsertIndex = workspace.issues.length // default to end

            if (destColumnIssues.length > 0 && action.payload.newIndex < destColumnIssues.length) {
                const targetIssueInColumn = destColumnIssues[action.payload.newIndex]
                globalInsertIndex = workspace.issues.indexOf(targetIssueInColumn)
            } else if (destColumnIssues.length > 0) {
                // Insert after the last issue in that column
                const lastIssueInColumn = destColumnIssues[destColumnIssues.length - 1]
                globalInsertIndex = workspace.issues.indexOf(lastIssueInColumn) + 1
            } else {
                // If column is empty, we can just push it or find the best spot
                // For simplicity, let's just push it to the end if we can't find a better spot
            }

            workspace.issues.splice(globalInsertIndex, 0, issue)
        },
        addNote: (state, action: PayloadAction<{ workspaceId: string, note: Note }>) => {
            const workspace = state.workspaces.find(w => w.id === action.payload.workspaceId)
            if (workspace) {
                workspace.notes.push(action.payload.note)
            }
        }
    },
})

export const {
    addWorkspace,
    setActiveWorkspace,
    addProjectToWorkspace,
    addIssue,
    updateIssueStatus,
    deleteIssue,
    moveIssue,
    addNote
} = workspaceSlice.actions
export default workspaceSlice.reducer

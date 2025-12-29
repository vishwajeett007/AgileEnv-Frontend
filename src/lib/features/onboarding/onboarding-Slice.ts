import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OnboardingState {
    workspaceName: string
    workspaceRole: string
    selectedTools: string[]
    activeTool: string
}

const initialState: OnboardingState = {
    workspaceName: "",
    workspaceRole: "",
    selectedTools: ["Kanban"],
    activeTool: "Kanban",
}

const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState,
    reducers: {
        setWorkspaceName: (state, action: PayloadAction<string>) => {
            state.workspaceName = action.payload
        },
        setWorkspaceRole: (state, action: PayloadAction<string>) => {
            state.workspaceRole = action.payload
        },
        setSelectedTools: (state, action: PayloadAction<string[]>) => {
            state.selectedTools = action.payload
        },
        setActiveTool: (state, action: PayloadAction<string>) => {
            state.activeTool = action.payload
        },
        updateOnboardingData: (state, action: PayloadAction<Partial<OnboardingState>>) => {
            return { ...state, ...action.payload }
        },
        resetOnboarding: () => initialState,
    },
})

export const {
    setWorkspaceName,
    setWorkspaceRole,
    setSelectedTools,
    setActiveTool,
    updateOnboardingData,
    resetOnboarding
} = onboardingSlice.actions
export default onboardingSlice.reducer

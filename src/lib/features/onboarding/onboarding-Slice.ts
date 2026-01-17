import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OnboardingState {
    workspaceName: string
    workspaceRole: string
    selectedTools: string[]
    activeTool: string
    profileWorkRole: string  
    workPreferences: string[]
    fullname:string
}

const initialState: OnboardingState = {
    workspaceName: "",
    workspaceRole: "",
    selectedTools: ["Kanban"],
    activeTool: "Kanban",
    profileWorkRole: "",      
    workPreferences: [],
    fullname:""
}

const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState,
    reducers: {
        setFullName: (state, action: PayloadAction<string>) => {
            state.fullname = action.payload
        },
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
        setProfileWorkRole: (state, action: PayloadAction<string>) => {  // Add this
            state.profileWorkRole = action.payload
        },
        setWorkPreferences: (state, action: PayloadAction<string[]>) => {  // Add this
            state.workPreferences = action.payload
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
    setProfileWorkRole,    
    setWorkPreferences, 
    updateOnboardingData,
    resetOnboarding,
    setFullName
} = onboardingSlice.actions
export default onboardingSlice.reducer
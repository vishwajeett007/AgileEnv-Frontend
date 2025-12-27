import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    user: any | null
    isAuthenticated: boolean
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: any }>
        ) => {
            const { user } = action.payload
            state.user = user
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
        },
    },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    user: any | null
    accessToken: string | null
    refreshToken: string | null
    isAuthenticated: boolean
}

const loadFromStorage = (): Partial<AuthState> => {
    if (typeof window === 'undefined') return {}
    try {
        const user = localStorage.getItem('user')
        const accessToken = localStorage.getItem('access_token')
        const refreshToken = localStorage.getItem('refresh_token')
        return {
            user: user ? JSON.parse(user) : null,
            accessToken,
            refreshToken,
            isAuthenticated: !!accessToken,
        }
    } catch {
        return {}
    }
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    ...loadFromStorage(),
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{
                user: any
                accessToken: string
                refreshToken: string
            }>
        ) => {
            const { user, accessToken, refreshToken } = action.payload
            state.user = user
            state.accessToken = accessToken
            state.refreshToken = refreshToken
            state.isAuthenticated = true

            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('access_token', accessToken)
                localStorage.setItem('refresh_token', refreshToken)
            }
        },
        updateTokens: (
            state,
            action: PayloadAction<{
                accessToken: string
                refreshToken: string
            }>
        ) => {
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken

            if (typeof window !== 'undefined') {
                localStorage.setItem('access_token', action.payload.accessToken)
                localStorage.setItem('refresh_token', action.payload.refreshToken)
            }
        },
        logout: (state) => {
            state.user = null
            state.accessToken = null
            state.refreshToken = null
            state.isAuthenticated = false

            if (typeof window !== 'undefined') {
                localStorage.removeItem('user')
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                localStorage.removeItem('otpAllowed')
                localStorage.removeItem('otpAllowedForget')
            }
        },
    },
})

export const { setCredentials, updateTokens, logout } = authSlice.actions
export default authSlice.reducer

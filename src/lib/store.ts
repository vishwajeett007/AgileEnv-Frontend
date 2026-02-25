import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/auth-Slice'
import onboardingReducer from './features/onboarding/onboarding-Slice'
import { saveAuthToStorage, clearAuthStorage } from './features/auth/authStorage'

export const makeStore = () => {
    const store = configureStore({
        reducer: {
            auth: authReducer,
            onboarding: onboardingReducer,
        },
    })

    // Subscribe to auth state changes and sync to localStorage
    store.subscribe(() => {
        const state = store.getState()
        const { auth } = state

        if (auth.isAuthenticated && auth.user && auth.accessToken && auth.refreshToken) {
            saveAuthToStorage({
                user: auth.user,
                accessToken: auth.accessToken,
                refreshToken: auth.refreshToken,
                rememberMe: auth.rememberMe,
            })
        } else if (!auth.isAuthenticated) {
            clearAuthStorage()
        }
    })

    return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
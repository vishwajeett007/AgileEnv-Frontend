import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/auth-Slice'
import onboardingReducer from './features/onboarding/onboarding-Slice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            onboarding: onboardingReducer,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
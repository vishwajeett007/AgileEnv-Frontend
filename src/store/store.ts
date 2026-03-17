import { configureStore } from '@reduxjs/toolkit'
import onboardingReducer from '../features/onboarding/store/onboarding-Slice'

export const makeStore = () => {
    const store = configureStore({
        reducer: {
            onboarding: onboardingReducer,
        },
    })

    return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
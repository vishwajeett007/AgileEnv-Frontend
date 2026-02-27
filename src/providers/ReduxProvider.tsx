'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/store/store'
import { hydrateAuth } from '@/features/auth/store/auth-Slice'
import { loadAuthFromStorage } from '@/features/auth/store/authStorage'

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>(undefined)
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
        
        // Hydrate auth state from localStorage
        const savedAuth = loadAuthFromStorage()
        if (savedAuth) {
            storeRef.current.dispatch(hydrateAuth(savedAuth))
        }
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}
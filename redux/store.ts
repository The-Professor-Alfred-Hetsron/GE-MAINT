'use client'

import { configureStore } from '@reduxjs/toolkit'
import authenticationUserReducer from '@/redux/features/authentication/authenticatedUserSlice'
import alertsReducer from '@/redux/features/alerts/alertsSlice'

export const store = configureStore({
  reducer: {
    authentication: authenticationUserReducer,
    alerts: alertsReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
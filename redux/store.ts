'use client'

import { configureStore } from '@reduxjs/toolkit'
import authenticationUserReducer from '@/redux/features/authentication/authenticatedUserSlice'

export const store = configureStore({
  reducer: {
    authentication: authenticationUserReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
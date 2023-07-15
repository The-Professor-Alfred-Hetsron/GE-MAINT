'use client'

import { configureStore } from '@reduxjs/toolkit'
import ActiveDashboardPageReducer from '@/redux/features/dashboard/activePageSlice'
import sidebarExtendionReducer from '@/redux/features/dashboard/sidebarSlice'

export const store = configureStore({
  reducer: {
    ActiveDashboardPage: ActiveDashboardPageReducer,
    sidebarExtended: sidebarExtendionReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
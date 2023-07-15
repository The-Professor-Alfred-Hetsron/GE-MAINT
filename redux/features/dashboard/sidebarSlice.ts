import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface sideBarExtended {
  isExtended: boolean
}

const initialState: sideBarExtended = {
    isExtended: true
}

export const sidebarExtendionSlice = createSlice({
  name: 'ActiveDashboardPage',
  initialState,
  reducers: {
    setExtension: (state, action: PayloadAction<boolean>) => {
      state.isExtended = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setExtension } = sidebarExtendionSlice.actions

export default sidebarExtendionSlice.reducer
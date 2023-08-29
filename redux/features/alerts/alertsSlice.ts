// authenticatedUserSlice.ts
import { IICard } from '@/components/InfoCard'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: IICard[] = []

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<IICard>) => {
        const alert = {
            type: action.payload.type,
            message: action.payload.message,
            index: state.length
        }
        console.log(alert)
        state.push(alert)
    },
    removeAlert: (state, action: PayloadAction<number>) => {
        state.splice(action.payload, 1)
    },
    // Ajout d'une action spéciale de redux-persist pour le réducteur
    _persist: (state) => state,
  },
})

export const { addAlert, removeAlert, _persist } = alertsSlice.actions

export default alertsSlice.reducer

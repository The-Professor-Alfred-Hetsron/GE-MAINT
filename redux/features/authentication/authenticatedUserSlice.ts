// authenticatedUserSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface User { 
    id: number;
    nom: string;
    email: string;
    matricule: string;
    role: string;
}

const initialState: User = {
    id: 0,
    nom: '',
    email: '',
    matricule: '',
    role: '',
}

export const authenticationUserSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id
      state.email = action.payload.email
      state.nom = action.payload.nom
      state.matricule = action.payload.matricule
      state.role = action.payload.role
    },
    // Ajout d'une action spéciale de redux-persist pour le réducteur
    _persist: (state) => state,
  },
})

export const { login, _persist } = authenticationUserSlice.actions

export default authenticationUserSlice.reducer

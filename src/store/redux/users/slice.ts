import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProfile } from '../../../types/profile'

interface UserState {
  auth: boolean
  user: IProfile | null
}

const initialState: UserState = {
  auth: false,
  user: null
}

export const sliceUser = createSlice({
  name: 'users',
  initialState,
  reducers: {
    auth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload
    },
    updateUser: (state, action) => {
      state.user = action.payload
    },
    deleteUser: (state) => {
      state.user = null
    },
    logoutState: (state) => {
      state.auth = false
      state.user = null
    }
  }
})

export const { auth, logoutState, updateUser, deleteUser } = sliceUser.actions
export const authReduce = sliceUser.reducer

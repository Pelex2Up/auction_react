import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LangState {
  language: 'RU' | 'ENG'
  money: 'BYN' | 'USD' | 'RUB'
}

const initialState: LangState = {
  language: 'RU',
  money: 'BYN'
}

export const langSettingsSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    updateLangSettings: (state, action: PayloadAction<LangState>) => {
      state.language = action.payload.language
      state.money = action.payload.money
    }
  }
})

export const { updateLangSettings } = langSettingsSlice.actions
export const langReduce = langSettingsSlice.reducer

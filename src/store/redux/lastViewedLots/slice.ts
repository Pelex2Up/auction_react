import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LastViewState {
  lots: number[]
}

const initialState: LastViewState = {
  lots: []
}

export const sliceHistory = createSlice({
  name: 'history',
  initialState,
  reducers: {
    updateHistory: (state, action: PayloadAction<number>) => {
      // Проверяем, существует ли уже этот лот в массиве
      const existingIndex = state.lots.indexOf(action.payload)
      if (existingIndex !== -1) {
        // Если лот существует, удаляем его из массива
        state.lots.splice(existingIndex, 1)
      }

      // Добавляем лот в начало массива
      state.lots.unshift(action.payload)

      // Ограничиваем максимальную длину массива до 10
      if (state.lots.length > 10) {
        state.lots.pop()
      }
    },
    clearHistory: (state) => {
      state.lots = []
    }
  }
})

export const { clearHistory, updateHistory } = sliceHistory.actions
export const historyReduce = sliceHistory.reducer

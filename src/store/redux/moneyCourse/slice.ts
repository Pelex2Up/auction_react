import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CourseState {
  expires: string | null
  course: {
    usd: string
    euro: string
    rub: string
  } | null
}

const initialState: CourseState = {
  expires: null,
  course: { usd: '', euro: '', rub: '' }
}

export const sliceCourses = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    updateCourse: (state, action) => {
      state.course = action.payload
    },
    updateExpiration: (state, action: PayloadAction<string>) => {
      state.expires = action.payload
    },
    clearCourses: (state) => {
      state.expires = null
      state.course = null
    }
  }
})

export const { updateCourse, clearCourses, updateExpiration } = sliceCourses.actions
export const courseReduce = sliceCourses.reducer

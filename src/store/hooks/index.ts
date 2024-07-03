import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const selectUser = (state: RootState) => state.user
export const selectCourse = (state: RootState) => state.course
export const selectHistory = (state: RootState) => state.history
export const selectLangSettings = (state: RootState) => state.language

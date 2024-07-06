import { combineReducers, configureStore, isRejectedWithValue } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import * as services from '../../api/index'
import * as slices from './index'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { toast } from 'react-toastify'
import { logoutState } from './users/slice'

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const error = action.payload as any
    if (error && 'status' in error && error.status === 403) {
      toast(`Истекла сессия авторизации, пожалуйста войдите заново`, {
        type: 'error',
        autoClose: 10000
      })
      api.dispatch(logoutState())
    } else if (error && 'originalStatus' in error && error.originalStatus === 502) {
      toast('Ведутся технические работы на сервере', { type: 'warning' })
    }
  }
  return next(action)
}

export const rootReducer = combineReducers({
  [services.userLoginService.reducerPath]: services.userLoginService.reducer,
  [services.userService.reducerPath]: services.userService.reducer,
  [services.lotService.reducerPath]: services.lotService.reducer,
  [services.courseService.reducerPath]: services.courseService.reducer,
  [services.searchService.reducerPath]: services.searchService.reducer,
  user: slices.authReduce,
  course: slices.courseReduce,
  history: slices.historyReduce,
  language: slices.langReduce
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'course', 'history', 'language']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    })
      .concat(
        services.searchService.middleware,
        services.userLoginService.middleware,
        services.userService.middleware,
        services.lotService.middleware,
        services.courseService.middleware
      )
      .concat(rtkQueryErrorLogger)
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

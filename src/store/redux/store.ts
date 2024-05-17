import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import * as services from '../../api/index'
import * as slices from './index'
import { setupListeners } from '@reduxjs/toolkit/query/react'

export const rootReducer = combineReducers({
  [services.userLoginService.reducerPath]: services.userLoginService.reducer,
  [services.userService.reducerPath]: services.userService.reducer,
  user: slices.authReduce
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    }).concat(services.userLoginService.middleware, services.userService.middleware)
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

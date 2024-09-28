import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { compress, decompress } from 'lz-string'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { createTransform, persistReducer } from 'redux-persist'

import appDataReducer from './features/appData'
import userDataReducer from './features/userData'
import storage from './storage'

type RootType = {
  appData: ReturnType<typeof appDataReducer>
  userData: ReturnType<typeof userDataReducer>
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  transforms: [
    createTransform(
      i => compress(JSON.stringify(i)),
      o => JSON.parse(decompress(o)),
    ),
  ],
}

const reducer = combineReducers({
  appData: appDataReducer,
  userData: userDataReducer,
})

const persistedReducer = persistReducer<RootType>(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootType> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import { store } from './store'

let persistor = persistStore(store)
const queryClient = new QueryClient()

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PersistGate persistor={persistor}>{children}</PersistGate>
        </QueryClientProvider>
      </Provider>
    </>
  )
}

export default ReduxProvider

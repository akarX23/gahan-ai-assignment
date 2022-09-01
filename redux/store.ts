import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { alertReducer } from './alert'
import { authReducer } from './auth'
import { authModalReducer } from './authModal'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    authModal: authModalReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

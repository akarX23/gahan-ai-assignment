import { createReducer } from '@reduxjs/toolkit'
import { reduxUserState } from 'helpers/types'
import { setUserForApp } from './actions'

const initialState: reduxUserState = {
  details: null,
  isLoading: true,
  isAuthenticated: false,
  isEmailAuthenticated: false,
}

export const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUserForApp.fulfilled, (state, action) => {
    state.details = action.payload
    state.isLoading = false
    state.isAuthenticated = !!action.payload
    state.isEmailAuthenticated =
      !!action.payload && action.payload.emailVerified
  })
})

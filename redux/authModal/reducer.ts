import { createReducer } from '@reduxjs/toolkit'
import { reduxAuthModalState } from 'helpers/types'
import { setMode, toggleModal } from './actions'

const initialState: reduxAuthModalState = {
  isVisible: false,
  signUpMode: false,
}

export const authModalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setMode, (state, { payload }) => {
      state.signUpMode = payload.signUpMode
    })
    .addCase(toggleModal, (state, { payload }) => {
      state.isVisible =
        payload.isVisible !== undefined ? payload.isVisible : !state.isVisible
      state.signUpMode =
        payload.signUpMode !== undefined ? payload.signUpMode : state.signUpMode
    })
})

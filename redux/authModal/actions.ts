import { createAction } from '@reduxjs/toolkit'

export const toggleModal = createAction(
  'TOGGLE_MODAL',
  (signUpMode?: boolean, isVisible?: boolean) => ({
    payload: {
      signUpMode,
      isVisible,
    },
  })
)

export const setMode = createAction('SET_MODE', (signUpMode: boolean) => ({
  payload: {
    signUpMode,
  },
}))

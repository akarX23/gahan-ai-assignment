import { createReducer } from '@reduxjs/toolkit'
import { reduxAlertState } from 'helpers/types'
import { showAlert, hideAlert } from './actions'

const initialState: reduxAlertState = {
  text: '',
  severity: 'success',
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
  open: false,
}

export const alertReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(showAlert, (state, action) => {
      state.open = true
      state.text = action.payload.text || ''
      state.severity = action.payload.severity || 'success'
      state.anchorOrigin.vertical =
        action.payload.anchorOrigin?.vertical || 'top'
      state.anchorOrigin.horizontal =
        action.payload.anchorOrigin?.horizontal || 'center'
    })
    .addCase(hideAlert, (state) => {
      state.open = false
    })
})

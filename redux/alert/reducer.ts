import { createReducer } from '@reduxjs/toolkit'
import { reduxAlertState } from 'helpers/types'
import { showAlert, hideAlert } from './actions'

const initialState: reduxAlertState = {
  text: '',
  severity: 'success',
  open: false,
  vertical: 'top',
  horizontal: 'center',
}

export const alertReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(showAlert, (state, action) => {
      state.open = true
      state.text = action.payload.text || ''
      state.severity = action.payload.severity || 'success'
      state.vertical = action.payload.vertical || 'top'
      state.horizontal = action.payload.horizontal || 'center'
    })
    .addCase(hideAlert, (state) => {
      state.open = false
    })
})

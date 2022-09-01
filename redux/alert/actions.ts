import { createAction } from '@reduxjs/toolkit'
import { reduxAlertState } from 'helpers/types'

export const showAlert = createAction(
  'SHOW_ALERT',
  (info: reduxAlertState, error?: boolean) => {
    if (error) {
      return {
        payload: {
          text: 'Something went wrong',
          severity: 'error',
        },
      }
    }

    return { payload: info }
  }
)

export const hideAlert = createAction('HIDE_ALERT')

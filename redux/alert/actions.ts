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
        } as reduxAlertState,
      }
    }

    return { payload: info as reduxAlertState }
  }
)

export const hideAlert = createAction('HIDE_ALERT')

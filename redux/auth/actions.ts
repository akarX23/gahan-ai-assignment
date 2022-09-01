import { createAsyncThunk } from '@reduxjs/toolkit'
import { getCurrentUser } from 'helpers/APIs/user'

export const setUserForApp = createAsyncThunk('SET_USER', async () => {
  try {
    let user = await getCurrentUser()
    return user
  } catch (error) {
    console.log('Error in setting user ', error)
    return null
  }
})

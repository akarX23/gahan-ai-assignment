import { LoginParams, userInDb } from 'helpers/types'
import api from './index'

export const getCurrentUser = async () =>
  await api.get('/sessions').then((res) => res.data)

export const logoutUser = async () => await api.delete('/sessions')

export const loginUser = async (user: LoginParams) =>
  await api.post('/sessions', user).then((res) => res.data)

export const createUser = async (user: userInDb) =>
  await api.post('/users', user).then((res) => res.data)

import {
  InstituteRegister,
  LoginParams,
  StudentRegister,
  userInDb,
} from 'helpers/types'
import api from './index'

export const getCurrentUser = async (): Promise<userInDb> =>
  await api.get('/auth/session').then((res) => res.data)

export const logoutUser = async () => await api.delete('/auth/session')

export const loginUser = async (user: LoginParams) =>
  await api.post('/auth/login', user).then((res) => res.data)

export const createUser = async (user: userInDb) =>
  await api.post('/users', user).then((res) => res.data)

export const registerInstitute = async (details: InstituteRegister) =>
  await api.post('/institute/register', details).then((res) => res.data)

export const registerStudent = async (details: StudentRegister) =>
  await api.post('/student/register', details).then((res) => res.data)

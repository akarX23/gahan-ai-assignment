import type { NextApiRequest } from 'next'
import { ImageProps } from 'next/image'
import React from 'react'
import { SvgIconProps } from '@mui/material'

export interface reduxAlertState {
  text?: string
  severity?: string
  vertical?: string
  horizontal?: string
  open?: boolean
}

export interface reduxAuthModalState {
  isVisible?: boolean
  signUpMode?: boolean
}

export interface reduxUserState {
  isLoading: boolean
  isAuthenticated: boolean
  isEmailAuthenticated: boolean
  details: userInDb
}

export enum userTypes {
  institute = 'institute',
  student = 'student',
  teacher = 'teacher',
  admin = 'admin',
}

export interface userInDb {
  _id?: string
  name?: string
  email?: string
  emailVerified?: boolean
  phone?: number
  password?: string
  dob?: Date
  address?: string
  type?: userTypes
  studentBatch?: string | BatchModel
  teacherInstitute?: userInDb | string
}

export interface LoginParams {
  email?: string
  password?: string
}

export interface CustomeApiRequest extends NextApiRequest {
  user: userInDb
  userId: string
}

export interface ApiController<T> {
  status: number
  data?: T
}

export interface ImageAbstractProps extends ImageProps {
  containerClass?: string
  alt?: string
  noBgColor?: boolean
  overl?: boolean
}

export interface DefaultComponentProps {
  children?: React.ReactElement
  window?: any
  key?: number | string
}

export interface NavbarDropdown {
  text: string
  link?: string
  Icon?: (props: SvgIconProps) => JSX.Element
  func?: Function
}

export interface CookieOptions {
  httpOnly?: boolean
  maxAge?: number
  path?: string
  secure?: boolean
  sameSite?: string
}

export interface AuthApiRequest extends NextApiRequest {
  user: userInDb
  type: userTypes
}

export interface BatchModel {
  _id?: string
  title?: string
  teacher?: userInDb | string
  institute?: userInDb | string
  students?: userInDb[] | string[]
}

export interface StudentRegister extends userInDb {
  batch?: string
  institute?: string
}

export interface StudentVerification {
  student?: userInDb | string
  institute?: userInDb | string
  batch?: BatchModel | string
  _id?: string
}

export interface OtpVerification {
  user?: userInDb | string
  otp?: number
}

export interface InstituteRegister {
  name?: string
  email?: string
  phone?: number
  password?: string
  address?: string
  _id?: string
}

export interface CredentialMailData {
  name?: string
  to?: string
  password?: string
}

export interface OtpMailData {
  otp?: number
  name?: string
}

export interface AllMailData extends CredentialMailData, OtpMailData {
  to: string
  attachments?: string[]
}

export enum mailTemplates {
  credentials = 'credentials',
  otp = 'otp',
}

export interface QuizQuestionModel {
  question?: string
  options?: string[]
  correctOption?: number
  marks?: number
}

export interface QuizModel {
  _id?: string
  questions?: QuizQuestionModel[] | string[]
  duration?: number
  title?: string
  teacher?: userInDb | string
  batch?: BatchModel | string
  institute?: userInDb | string
  startTime?: string
  endTime?: string
}

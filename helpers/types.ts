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

export interface userInDb {
  name?: string
  username?: string
  email?: string
  emailVerified?: boolean
  phone?: number
  password?: string
}

export interface LoginParams {
  email?: string
  password?: string
}

export interface CustomeApiRequest extends NextApiRequest {
  user: userInDb
  userId: string
}

export interface ApiController {
  status: number
  data?: object | number | null
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

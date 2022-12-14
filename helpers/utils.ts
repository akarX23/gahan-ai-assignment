import { cookieOptions, statusCode } from './constants'
import argon2 from 'argon2'
import { NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { CookieOptions, userInDb } from './types'

export const isStatusCodeErr = (
  err: Error,
  codeToCheck = statusCode.InternalError
): boolean => {
  console.log(err)
  return (
    err.message.split(' ').pop().toString().trim() === codeToCheck.toString()
  )
}

export async function encryptPassword(password: string): Promise<string> {
  return argon2.hash(password)
}

export async function verifyPassword(
  hash: string,
  password: string
): Promise<boolean> {
  return argon2.verify(hash, password)
}

export function setCookie(
  res: NextApiResponse,
  name: string,
  value: string | object,
  options: CookieOptions
) {
  let cookie = `${name}=${JSON.stringify(value)};`
  const { path, maxAge, secure, httpOnly } = options
  if (path) cookie += `path=${path};`
  if (maxAge) cookie += `max-age=${maxAge};`
  if (secure) cookie += `secure;`
  if (httpOnly) cookie += `httpOnly;`
  res.setHeader('Set-Cookie', cookie)
}

export function authenticateUser(res: NextApiResponse, user: userInDb): void {
  if (!user) return

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  })

  setCookie(res, 'auth', token, cookieOptions)
}

export function clearUser(res: NextApiResponse): void {
  setCookie(res, 'auth', '0', {
    ...cookieOptions,
    path: '/',
    maxAge: 1,
  })
}

export const genRandomString = (len: number) => {
  let text = ''
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!”#$%&'()*+,-./:;<=>?@[]^_`{|}~."

  for (let i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export const genRandomNumber = (len: number): number => {
  let text = ''
  const possible = '123456789'

  for (let i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return parseInt(text)
}

// generate password with at least 1 number 1 lowercase 1 uppercase and 1 special character
export const genPassword = (len: number): string => {
  let password = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~.'

  for (let i = 0; i < len; i++) {
    password += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  const hasNumber = new RegExp('[0-9]')
  const hasLower = new RegExp('[a-z]')
  const hasUpper = new RegExp('[A-Z]')
  const hasSpecial = new RegExp('[!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~.]')
  if (
    hasNumber.test(password) &&
    hasLower.test(password) &&
    hasUpper.test(password) &&
    hasSpecial.test(password)
  ) {
    return password
  } else {
    return genPassword(len)
  }
}

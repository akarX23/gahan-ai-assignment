import { internalError, statusCode } from 'helpers/constants'
import { ApiController, LoginParams, userInDb } from 'helpers/types'
import { encryptPassword, verifyPassword } from 'helpers/utils'
import { IncomingMessage } from 'http'
import * as User from 'models/User'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'
import jwt from 'jsonwebtoken'

export const createUser = async (
  userDetails: userInDb
): Promise<ApiController> => {
  try {
    if (!userDetails) return { status: statusCode.Unauthorized }

    let password = await encryptPassword(userDetails.password)
    let userFromDb = await User.insertOne({ ...userDetails, password })

    userFromDb.password = ''
    return { status: statusCode.Success, data: userFromDb }
  } catch (error) {
    console.log('Authentication new', error)
    return internalError
  }
}

export const loginUser = async (
  loginParams: LoginParams
): Promise<ApiController> => {
  try {
    if (!loginParams) return { status: statusCode.Unauthorized }

    let userFromDb = await User.findOne({ email: loginParams.email })
    if (!userFromDb) return { status: statusCode.Unauthorized }

    let isPasswordCorrect = await verifyPassword(
      userFromDb.password,
      loginParams.password
    )
    if (!isPasswordCorrect) return { status: statusCode.Unauthorized }

    delete userFromDb.password
    return { status: statusCode.Success, data: userFromDb }
  } catch (error) {
    console.log('Authentication error', error)
    return internalError
  }
}

export const userFromRequest = async (
  req: IncomingMessage & { cookies: NextApiRequestCookies }
): Promise<userInDb | undefined> => {
  try {
    let token = req.cookies.auth
    if (!token) return undefined

    const data = jwt.verify(token, process.env.JWT_SECRET_KEY) as {
      email: string
    }
    if (!data) return undefined

    let userFromDb = await User.findOne({ email: data.email })

    if (userFromDb) delete userFromDb.password
    return userFromDb
  } catch (error) {
    console.log('Authentication error', error)
    return
  }
}

import { internalError, statusCode } from 'helpers/constants'
import { ApiController, LoginParams, userInDb, userTypes } from 'helpers/types'
import { encryptPassword, genRandomString, verifyPassword } from 'helpers/utils'
import { IncomingMessage } from 'http'
import * as User from 'models/User'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'
import jwt from 'jsonwebtoken'

export const createUser = async (
  userDetails: userInDb,
  loggedInUser: userInDb
): Promise<ApiController<userInDb | string>> => {
  try {
    if (
      !userDetails ||
      (![userTypes.institute, userTypes.admin].some(
        (type) => type === loggedInUser?.type
      ) &&
        process.env.NODE_ENV === 'production') ||
      (loggedInUser.type === userTypes.institute &&
        userDetails.type !== userTypes.teacher)
    )
      return { status: statusCode.BadRequest, data: 'Not right user' }

    let password = genRandomString(10)
    let hash = await encryptPassword(password)
    let userFromDb = await User.insertOne({ ...userDetails, password: hash })

    userFromDb.password = ''

    console.log(password)

    // SendMail(email, password)

    return { status: statusCode.Success, data: userFromDb }
  } catch (error) {
    console.log('Authentication', error)
    return internalError
  }
}

export const loginUser = async (
  loginParams: LoginParams
): Promise<ApiController<userInDb | string>> => {
  try {
    if (!loginParams) return { status: statusCode.Unauthorized }

    let userFromDb = await User.findOne({ email: loginParams.email })
    if (!userFromDb) return { status: statusCode.Unauthorized }

    let isPasswordCorrect = await verifyPassword(
      userFromDb.password,
      loginParams.password
    )
    if (!isPasswordCorrect)
      return { status: statusCode.Unauthorized, data: 'Wrong password' }

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

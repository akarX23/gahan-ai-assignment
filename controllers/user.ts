import { internalError, statusCode } from 'helpers/constants'
import {
  ApiController,
  LoginParams,
  StudentRegister,
  userInDb,
  userTypes,
} from 'helpers/types'
import { encryptPassword, genRandomString, verifyPassword } from 'helpers/utils'
import { IncomingMessage } from 'http'
import * as User from 'models/User'
import * as Batch from 'models/Batch'
import * as StudVerify from 'models/StudentVerification'
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
      (loggedInUser?.type === userTypes.institute &&
        userDetails.type !== userTypes.teacher)
    )
      return { status: statusCode.BadRequest, data: 'Not right user' }

    let password =
      process.env.NODE_ENV === 'development' && userDetails.password
        ? userDetails.password
        : genRandomString(10)
    let hash = await encryptPassword(password)

    let userToInsert = {
      ...userDetails,
      password: hash,
    }

    if (loggedInUser?.type === userTypes.institute) {
      userToInsert.teacherInstitute = loggedInUser._id
    }

    let userFromDb = await User.insertOne(userToInsert)

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

export const registerStudent = async (
  studentDetails: StudentRegister
): Promise<ApiController<userInDb | string>> => {
  try {
    if (!studentDetails)
      return { status: statusCode.BadRequest, data: 'Invalid User' }

    let password = studentDetails.password || genRandomString(10)
    let hash = await encryptPassword(password)

    const [batch, institute] = await Promise.all([
      Batch.findOne({ _id: studentDetails.batch }),
      User.findOne({
        _id: studentDetails.institute,
        type: userTypes.institute,
      }),
    ])

    if (
      !batch ||
      !institute ||
      batch.institute.toString() !== studentDetails.institute
    )
      return {
        status: statusCode.BadRequest,
        data: 'Invalid Batch or Institute',
      }

    let userToInsert: StudentRegister = {
      ...studentDetails,
      password: hash,
      type: userTypes.student,
    }

    delete userToInsert.batch
    delete userToInsert.institute

    let userFromDb = await User.insertOne(userToInsert)

    StudVerify.insertOne({
      student: userFromDb._id,
      batch: batch._id,
      institute: institute._id,
    })

    userFromDb.password = ''

    console.log(password)

    // SendMail(email, password)

    return { status: statusCode.Success, data: userFromDb }
  } catch (error) {
    console.log('Authentication', error)
    return internalError
  }
}

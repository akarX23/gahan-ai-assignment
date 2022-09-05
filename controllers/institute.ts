import { internalError, statusCode } from 'helpers/constants'
import {
  ApiController,
  StudentVerification,
  userInDb,
  userTypes,
} from 'helpers/types'
import * as User from 'models/User'
import * as StudVerify from 'models/StudentVerification'

export const getAllInstitutes = async (): Promise<
  ApiController<userInDb[]>
> => {
  try {
    let institutes = await User.find({ type: userTypes.institute }, 'name _id')
    return { status: statusCode.Success, data: institutes }
  } catch (error) {
    console.log('Institute', error)
    return internalError
  }
}

export const getAllTeachers = async (
  institute: userInDb
): Promise<ApiController<userInDb[]>> => {
  try {
    let teachers = await User.find(
      { type: userTypes.teacher, teacherInstitute: institute._id },
      'name _id email phone'
    )
    return { status: statusCode.Success, data: teachers }
  } catch (error) {
    console.log('Institute', error)
    return internalError
  }
}

export const getStudentsForVerification = async (
  institute: userInDb
): Promise<ApiController<StudentVerification[]>> => {
  try {
    const verifications = await StudVerify.find({ institute: institute._id })
    return { status: statusCode.Success, data: verifications }
  } catch (error) {
    console.log('Institute', error)
    return internalError
  }
}

export const verifyStudent = async (
  studVerifyId: string,
  instituteId: string,
  accept: boolean
): Promise<ApiController<string>> => {
  try {
    const verification = await StudVerify.findOne({ _id: studVerifyId })

    if (!verification) {
      return { status: statusCode.NotFound, data: 'Verification not found' }
    }

    console.log(verification.institute, instituteId)

    if (verification.institute.toString() !== instituteId.toString()) {
      return { status: statusCode.Unauthorized, data: 'Unauthorized' }
    }

    console.log(accept)

    if (accept)
      await User.updateOne(
        { _id: verification.student },
        { studentBatch: verification.batch }
      )

    await StudVerify.deleteOne({ _id: studVerifyId })
    return { status: statusCode.Success, data: 'Success' }
  } catch (error) {
    console.log('Institute', error)
    return internalError
  }
}

// const getQuizResults

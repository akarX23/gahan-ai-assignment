import { internalError, statusCode } from 'helpers/constants'
import { ApiController, BatchModel, userInDb, userTypes } from 'helpers/types'
import * as Batch from 'models/Batch'
import * as User from 'models/User'
import * as StudVerify from 'models/StudentVerification'

export const createBatch = async (
  batchDetails: BatchModel,
  loggedInUser: userInDb
): Promise<ApiController<BatchModel | string>> => {
  try {
    if (!batchDetails)
      return { status: statusCode.BadRequest, data: 'No batch details' }

    let teacher = await User.findOne({
      _id: batchDetails.teacher as string,
      type: userTypes.teacher,
    })

    if (
      !teacher ||
      teacher.teacherInstitute.toString() !== loggedInUser._id.toString()
    )
      return { status: statusCode.BadRequest, data: 'Not right teacher' }

    let newBatch = await Batch.insertOne({
      ...batchDetails,
      institute: loggedInUser._id,
      students: [],
    })

    return { status: statusCode.Success, data: newBatch }
  } catch (error) {
    console.log('Authentication', error)
    return internalError
  }
}

export const verifyStudentForBatch = async (
  studVerifyId: string,
  approve: boolean,
  loggedInUser: userInDb
): Promise<ApiController<string>> => {
  try {
    console.log(await StudVerify.find({}))

    let studVerify = await StudVerify.findOne({ _id: studVerifyId })
    console.log(studVerify)
    if (!studVerify)
      return { status: statusCode.BadRequest, data: 'Invalid data' }

    let batch = await Batch.findOne({ _id: studVerify.batch as string })
    if (!batch) return { status: statusCode.BadRequest, data: 'No batch' }

    if (batch.institute.toString() !== loggedInUser._id.toString())
      return { status: statusCode.BadRequest, data: 'Not right institute' }

    let student = await User.findOne({
      _id: studVerify.student as string,
      type: userTypes.student,
    })
    if (!student) return { status: statusCode.BadRequest, data: 'No student' }

    if (approve) {
      await Batch.addStudentToBatch(batch._id, student._id)
      await User.updateOne({ _id: student._id }, { studentBatch: batch._id })
    }

    await StudVerify.deleteOne({ _id: studVerifyId })

    return { status: statusCode.Success, data: 'Student verified' }
  } catch (error) {
    console.log('Authentication', error)
    return internalError
  }
}

export const getBatchesByInstitute = async (
  instituteId: string
): Promise<ApiController<BatchModel[]>> => {
  try {
    let batches = await Batch.find({ institute: instituteId }, 'title _id')

    return { status: statusCode.Success, data: batches }
  } catch (error) {
    console.log('Authentication', error)
    return internalError
  }
}

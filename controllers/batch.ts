import { internalError, statusCode } from 'helpers/constants'
import { ApiController, BatchModel, userInDb, userTypes } from 'helpers/types'
import * as Batch from 'models/Batch'
import * as User from 'models/User'

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

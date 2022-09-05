import { internalError, statusCode } from 'helpers/constants'
import { ApiController, BatchModel } from 'helpers/types'
import * as Batch from 'models/Batch'

export const getTeacherBatches = async (
  teacherId: string
): Promise<ApiController<BatchModel[]>> => {
  try {
    const batches = await Batch.find({ teacher: teacherId }, 'title _id')

    return { status: statusCode.Success, data: batches }
  } catch (err) {
    console.log(err)
    return internalError
  }
}

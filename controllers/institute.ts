import { internalError, statusCode } from 'helpers/constants'
import {
  ApiController,
  InstituteRegister,
  userInDb,
  userTypes,
} from 'helpers/types'
import * as User from 'models/User'

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

import { addOrUpdateBatch, getBatchesWithTeacher } from 'controllers/batch'
import { getTeacherBatches } from 'controllers/teacher'
import dbConnect from 'helpers/dbConnect'
import { AuthApiRequest, userTypes } from 'helpers/types'
import auth from 'middlewares/auth'
import { NextApiResponse } from 'next'

dbConnect()

interface CustomRequest extends AuthApiRequest {}

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  let response
  switch (req.method) {
    case 'GET':
      response = await getTeacherBatches(req.user._id)
      res.status(response.status).json(response.data)
      break
    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

export default auth(handler, [userTypes.teacher])

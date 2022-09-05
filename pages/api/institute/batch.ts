import { createBatch, getBatchesWithTeacher } from 'controllers/batch'
import dbConnect from 'helpers/dbConnect'
import { AuthApiRequest, BatchModel, userTypes } from 'helpers/types'
import auth from 'middlewares/auth'
import { NextApiResponse } from 'next'

dbConnect()

interface CustomRequest extends AuthApiRequest {
  body: BatchModel
  query: {
    instituteId: string
  }
}

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  let response
  switch (req.method) {
    case 'POST':
      response = await createBatch(req.body, req.user)
      res.status(response.status).json(response.data)
      break

    case 'GET':
      response = await getBatchesWithTeacher(req.user._id)
      res.status(response.status).json(response.data)
      break

    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

export default auth(handler, [userTypes.institute])

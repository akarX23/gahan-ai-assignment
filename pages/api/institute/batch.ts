import { createBatch } from 'controllers/batch'
import dbConnect from 'helpers/dbConnect'
import { AuthApiRequest, BatchModel, userTypes } from 'helpers/types'
import auth from 'middlewares/auth'
import { NextApiResponse } from 'next'

dbConnect()

interface CustomRequest extends AuthApiRequest {
  body: BatchModel
}

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      let { status, data } = await createBatch(req.body, req.user)
      res.status(status).json(data)
      break
    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

export default auth(handler, [userTypes.institute])

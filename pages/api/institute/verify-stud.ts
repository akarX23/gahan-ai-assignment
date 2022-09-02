import { verifyStudentForBatch } from 'controllers/batch'
import dbConnect from 'helpers/dbConnect'
import { AuthApiRequest, userTypes } from 'helpers/types'
import auth from 'middlewares/auth'
import { NextApiResponse } from 'next'

dbConnect()

interface CustomRequest extends AuthApiRequest {
  query: {
    approve: string
    studVerifyId: string
  }
}

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'PUT':
      let { status, data } = await verifyStudentForBatch(
        req.query.studVerifyId,
        Boolean(req.query.approve),
        req.user
      )
      res.status(status).json(data)
      break
    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

export default auth(handler, [userTypes.institute])

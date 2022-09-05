import {
  getStudentsForVerification,
  verifyStudent,
} from 'controllers/institute'
import dbConnect from 'helpers/dbConnect'
import { AuthApiRequest, userTypes } from 'helpers/types'
import auth from 'middlewares/auth'
import { NextApiResponse } from 'next'

dbConnect()

interface CustomRequest extends AuthApiRequest {
  query: {
    accept: string
    studVerifyId: string
  }
}

const handler = async (req: AuthApiRequest, res: NextApiResponse) => {
  let response

  switch (req.method) {
    case 'GET':
      response = await getStudentsForVerification(req.user)
      res.status(response.status).json(response.data)
      break
    case 'PUT':
      response = await verifyStudent(
        req.query.studVerifyId as string,
        req.user._id,
        Boolean(req.query.accept)
      )
      res.status(response.status).json(response.data)
      break
    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

export default auth(handler, [userTypes.institute])

import { getStudentQuizzes } from 'controllers/student'
import dbConnect from 'helpers/dbConnect'
import { AuthApiRequest, userTypes } from 'helpers/types'
import auth from 'middlewares/auth'
import { NextApiResponse } from 'next'

dbConnect()

const handler = async (req: AuthApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      let { status, data } = await getStudentQuizzes(req.user)
      res.status(status).json(data)
      break
    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

export default auth(handler, [userTypes.student])

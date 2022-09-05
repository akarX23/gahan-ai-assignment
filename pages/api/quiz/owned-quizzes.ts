import dbConnect from 'helpers/dbConnect'
import { NextApiResponse } from 'next'
import * as Quiz from 'models/Quiz'
import auth from 'middlewares/auth'
import { AuthApiRequest, userTypes } from 'helpers/types'
import { statusCode } from 'helpers/constants'

dbConnect()

interface CustomApiRequest extends AuthApiRequest {}

const handler = async (req: CustomApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      let quizzes = await Quiz.Quiz.find({
        $or: [{ institute: req.user._id }, { teacher: req.user._id }],
      })
        .select('_id title')
        .lean()
      res.status(statusCode.Success).json(quizzes)
      break
    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

export default auth(handler, [userTypes.institute, userTypes.teacher])

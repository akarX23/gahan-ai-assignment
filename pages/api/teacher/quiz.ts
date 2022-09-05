import {
  getTeacherBatches,
  getTeacherQuizzes,
  insertQuiz,
} from 'controllers/teacher'
import dbConnect from 'helpers/dbConnect'
import { AuthApiRequest, QuizModel, userTypes } from 'helpers/types'
import auth from 'middlewares/auth'
import { NextApiResponse } from 'next'

dbConnect()

interface CustomRequest extends AuthApiRequest {
  body: QuizModel
}

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  let response
  switch (req.method) {
    case 'POST':
      response = await insertQuiz(req.body, req.user)
      res.status(response.status).json(response.data)
      break

    case 'GET':
      response = await getTeacherQuizzes(req.user)
      res.status(response.status).json(response.data)
      break
    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

export default auth(handler, [userTypes.teacher])

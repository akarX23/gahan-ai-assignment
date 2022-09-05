import {} from 'controllers/batch'
import { insertQuizQuestion } from 'controllers/teacher'
import dbConnect from 'helpers/dbConnect'
import { AuthApiRequest, QuizQuestionModel, userTypes } from 'helpers/types'
import auth from 'middlewares/auth'
import { NextApiResponse } from 'next'

dbConnect()

interface CustomRequest extends AuthApiRequest {
  body: QuizQuestionModel
}

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  let response
  switch (req.method) {
    case 'POST':
      response = await insertQuizQuestion(req.body)
      res.status(response.status).json(response.data)
      break
    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

export default auth(handler, [userTypes.teacher])

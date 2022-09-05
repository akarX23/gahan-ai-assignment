import { saveQuizAnswers } from 'controllers/student'
import dbConnect from 'helpers/dbConnect'
import { AuthApiRequest, QuestionAnswer, userTypes } from 'helpers/types'
import auth from 'middlewares/auth'
import { NextApiResponse } from 'next'

dbConnect()

interface CustomRequest extends AuthApiRequest {
  body: QuestionAnswer[]
  query: {
    quizId: string
  }
}

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      let { status, data } = await saveQuizAnswers(
        req.query.quizId as string,
        req.body,
        req.user._id
      )
      res.status(status).json(data)
      break
    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

export default auth(handler, [userTypes.student])

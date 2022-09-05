import dbConnect from 'helpers/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import * as QuizAnswers from 'models/QuizAnswers'
import { statusCode } from 'helpers/constants'

dbConnect()

interface CustomApiRequest extends NextApiRequest {
  query: {
    quizId: string
  }
}

const handler = async (req: CustomApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      let quizAnswers = await QuizAnswers.QuizAnswers.find({
        quiz: req.query.quizId,
      })
        .populate('student', 'name')
        .lean()

      res.status(statusCode.Success).json(quizAnswers)
      break
    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

export default handler

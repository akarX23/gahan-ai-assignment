import { getAllQuizzes } from 'controllers/student'
import dbConnect from 'helpers/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

dbConnect()

interface CustomApiRequest extends NextApiRequest {}

const handler = async (req: CustomApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      let { status, data } = await getAllQuizzes()
      res.status(status).json(data)
      break
    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

export default handler

import { getAllInstitutes } from 'controllers/institute'
import dbConnect from 'helpers/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

dbConnect()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      let { status, data } = await getAllInstitutes()
      res.status(status).json(data)
      break
    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

export default handler

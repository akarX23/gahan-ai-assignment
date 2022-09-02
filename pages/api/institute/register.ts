import { registerInstitute } from 'controllers/user'
import dbConnect from 'helpers/dbConnect'
import { InstituteRegister } from 'helpers/types'
import { NextApiRequest, NextApiResponse } from 'next'

dbConnect()

interface CustomRequest extends NextApiRequest {
  body: InstituteRegister
}

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      let { status, data } = await registerInstitute(req.body)
      res.status(status).json(data)
      break
    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

export default handler

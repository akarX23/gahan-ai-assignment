import { getBatchesByInstitute } from 'controllers/batch'
import dbConnect from 'helpers/dbConnect'
import { AuthApiRequest } from 'helpers/types'
import { NextApiResponse } from 'next'

dbConnect()

interface CustomRequest extends AuthApiRequest {
  query: {
    instituteId: string
  }
}

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  let response
  switch (req.method) {
    case 'GET':
      response = await getBatchesByInstitute(req.query.instituteId)
      console.log(response)

      res.status(response.status).json(response.data)
      break

    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

export default handler

import { createUser } from 'controllers/user'
import dbConnect from 'helpers/dbConnect'
import { AuthApiRequest, userInDb, userTypes } from 'helpers/types'
import { authenticateUser } from 'helpers/utils'
import auth from 'middlewares/auth'
import { NextApiResponse } from 'next'

dbConnect()

interface CustomRequest extends AuthApiRequest {
  body: userInDb
}

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      let { data, status } = await createUser(req.body, req.user)
      res.status(status).json(data)
      break
    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}

export default process.env.NODE_ENV === 'production'
  ? auth(handler, [userTypes.admin])
  : handler

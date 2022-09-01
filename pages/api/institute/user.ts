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
  let { data, status } = await createUser(req.body, req.user)
  authenticateUser(res, data as userInDb)
  res.status(status).json(data)
}

export default auth(handler, [userTypes.institute])

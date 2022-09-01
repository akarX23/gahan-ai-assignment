import { loginUser } from 'controllers/user'
import dbConnect from 'helpers/dbConnect'
import { LoginParams, userInDb } from 'helpers/types'
import { authenticateUser } from 'helpers/utils'
import { NextApiRequest, NextApiResponse } from 'next'

dbConnect()

interface CustomRequest extends NextApiRequest {
  body: LoginParams
}

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  let { status, data } = await loginUser(req.body)

  if (status === 200) authenticateUser(res, data as userInDb)

  console.log(data)

  return res.status(status).json(data)
}

export default handler

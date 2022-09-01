import { createUser } from 'controllers/user'
import dbConnect from 'helpers/dbConnect'
import { userInDb } from 'helpers/types'
import { authenticateUser } from 'helpers/utils'
import { NextApiRequest, NextApiResponse } from 'next'

dbConnect()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { data, status } = await createUser(req.body)
  authenticateUser(res, data as userInDb)
  res.status(status).json(data)
}

export default handler

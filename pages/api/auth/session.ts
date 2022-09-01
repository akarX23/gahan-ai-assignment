import { userFromRequest } from 'controllers/user'
import { statusCode } from 'helpers/constants'
import dbConnect from 'helpers/dbConnect'
import { clearUser } from 'helpers/utils'
import { NextApiRequest, NextApiResponse } from 'next'

dbConnect()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method

  switch (method) {
    case 'GET':
      let user = await userFromRequest(req)

      if (!user) {
        return res
          .status(statusCode.Unauthorized)
          .json({ message: 'Unauthorized' })
      }
      return res.status(statusCode.Success).json(user)

    case 'DELETE':
      clearUser(res)
      return res.status(statusCode.Success).json({ message: 'User logged out' })
  }
}

export default handler

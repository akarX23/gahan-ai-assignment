import { statusCode } from 'helpers/constants'

import type { NextApiResponse } from 'next'
import { userFromRequest } from 'controllers/user'
import { AuthApiRequest, userTypes } from 'helpers/types'

const auth =
  (handler: Function, allowAccess?: userTypes[]) =>
  async (req: AuthApiRequest, res: NextApiResponse) => {
    // GET CURRENT USER'S AUTHENTICATION STATE
    // ATTACH USER IN THE REQUEST OBJECT
    try {
      let user = await userFromRequest(req)

      if (!allowAccess && !user) return handler(req, res)

      if (!allowAccess.some((type) => type === user?.type)) {
        res.status(statusCode.Unauthorized).json({
          status: statusCode.Unauthorized,
          message: 'Unauthorized',
        })
        return
      }

      req.user = user
      req.type = user?.type

      return handler(req, res)
    } catch (error) {
      console.log('Auth Middleware ', error)
      return res.status(statusCode.Unauthorized).json(error)
    }
  }

export default auth

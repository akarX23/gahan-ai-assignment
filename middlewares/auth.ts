import { statusCode } from 'helpers/constants'

import type { NextApiRequest, NextApiResponse } from 'next'
import { userFromRequest } from 'controllers/user'

const auth =
  (handler: Function, authReqd = true) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    // GET CURRENT USER'S AUTHENTICATION STATE
    // ATTACH USER IN THE REQUEST OBJECT
    try {
      let user = userFromRequest(req)

      if (authReqd && !user) {
        res.status(statusCode.Unauthorized).json({
          status: statusCode.Unauthorized,
          message: 'Unauthorized',
        })
        return
      }

      return handler(req, res)
    } catch (error) {
      console.log('Auth Middleware ', error)
      return res.status(statusCode.Unauthorized).json(error)
    }
  }

export default auth

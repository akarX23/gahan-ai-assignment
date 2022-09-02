import { verifyEmailFromOtp } from 'controllers/user'
import dbConnect from 'helpers/dbConnect'
import { AuthApiRequest, userTypes } from 'helpers/types'
import auth from 'middlewares/auth'
import { NextApiResponse } from 'next'

dbConnect()

interface CustomApiRequest extends AuthApiRequest {
  query: {
    otp: string
  }
}

const handler = async (req: CustomApiRequest, res: NextApiResponse) => {
  let { status, data } = await verifyEmailFromOtp(req.query.otp, req.user)

  return res.status(status).json(data)
}

export default auth(handler, [
  userTypes.institute,
  userTypes.student,
  userTypes.teacher,
])

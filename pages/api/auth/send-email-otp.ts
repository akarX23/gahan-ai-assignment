import { sendOtpMailVerification } from 'controllers/user'
import dbConnect from 'helpers/dbConnect'
import { AuthApiRequest, userTypes } from 'helpers/types'
import auth from 'middlewares/auth'
import { NextApiResponse } from 'next'

dbConnect()

const handler = async (req: AuthApiRequest, res: NextApiResponse) => {
  let { status, data } = await sendOtpMailVerification(req.user)

  return res.status(status).json(data)
}

export default auth(handler, [
  userTypes.institute,
  userTypes.student,
  userTypes.teacher,
])

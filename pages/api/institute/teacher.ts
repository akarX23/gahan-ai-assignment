import { getAllTeachers } from 'controllers/institute'
import { createUser } from 'controllers/user'
import dbConnect from 'helpers/dbConnect'
import { AuthApiRequest, userInDb, userTypes } from 'helpers/types'
import auth from 'middlewares/auth'
import { NextApiResponse } from 'next'

dbConnect()

interface CustomRequest extends AuthApiRequest {
  body: userInDb
}

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  let response

  switch (req.method) {
    case 'POST':
      response = await createUser(req.body, req.user)
      res.status(response.status).json(response.data)
      break

    case 'GET':
      response = await getAllTeachers(req.user)
      res.status(response.status).json(response.data)
      break

    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

export default auth(handler, [userTypes.institute])

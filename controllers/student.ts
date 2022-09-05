import { internalError, statusCode } from 'helpers/constants'
import { ApiController, QuizModel, userInDb } from 'helpers/types'
import * as Quiz from 'models/Quiz'
export const getStudentQuizzes = async (
  student: userInDb
): Promise<ApiController<QuizModel[]>> => {
  try {
    let batches = await Quiz.getQuizzesForStudent(student.studentBatch)

    return { status: statusCode.Success, data: batches }
  } catch (err) {
    console.log(err)
    return internalError
  }
}

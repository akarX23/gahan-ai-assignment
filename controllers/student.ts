import { internalError, statusCode } from 'helpers/constants'
import {
  ApiController,
  QuestionAnswer,
  QuizModel,
  userInDb,
} from 'helpers/types'
import * as Quiz from 'models/Quiz'
import * as QuizAnswers from 'models/QuizAnswers'
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

export const getQuizData = async (
  quizId: string
): Promise<ApiController<QuizModel>> => {
  try {
    let quiz = await Quiz.getQuizDataWithoutAnswers(quizId)

    return { status: statusCode.Success, data: quiz }
  } catch (err) {
    console.log(err)
    return internalError
  }
}

export const getAllQuizzes = async (): Promise<ApiController<QuizModel[]>> => {
  try {
    let quizzes = await Quiz.find({}, '_id name')
    return { status: statusCode.Success, data: quizzes }
  } catch (err) {
    console.log(err)
    return internalError
  }
}

export const saveQuizAnswers = async (
  quizId: string,
  answerData: QuestionAnswer[],
  studentId: string
): Promise<ApiController<string>> => {
  try {
    let quiz = await Quiz.getAllQuestions(quizId)
    let maxMarks = quiz.questions.reduce((acc, curr) => acc + curr.marks, 0)
    let totalMarks = answerData.reduce((acc, curr, i) => {
      if (curr.option === quiz.questions[i].correctOption) {
        return acc + quiz.questions[i].marks
      }
      return acc
    }, 0)

    await QuizAnswers.insertOne({
      quiz: quizId,
      answers: answerData,
      student: studentId,
      totalMarks,
      maxMarks,
    })

    return { status: statusCode.Success, data: 'Answers saved' }
  } catch (err) {
    console.log(err)
    return internalError
  }
}

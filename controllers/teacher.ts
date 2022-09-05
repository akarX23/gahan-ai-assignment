import { internalError, statusCode } from 'helpers/constants'
import {
  ApiController,
  BatchModel,
  QuizModel,
  QuizQuestionModel,
  userInDb,
} from 'helpers/types'
import * as Batch from 'models/Batch'
import * as Quiz from 'models/Quiz'
import mongoose from 'mongoose'

export const getTeacherBatches = async (
  teacherId: string
): Promise<ApiController<BatchModel[]>> => {
  try {
    const batches = await Batch.find({ teacher: teacherId }, 'title _id')

    return { status: statusCode.Success, data: batches }
  } catch (err) {
    console.log(err)
    return internalError
  }
}

export const insertQuizQuestion = async (
  question: QuizQuestionModel
): Promise<ApiController<QuizQuestionModel>> => {
  try {
    question._id = question._id || new mongoose.Types.ObjectId().toString()
    const quizQuestion = await Quiz.upsertQuizQuestion(
      { _id: question._id },
      question
    )

    return { status: statusCode.Success, data: quizQuestion }
  } catch (err) {
    console.log(err)
    return internalError
  }
}

export const insertQuiz = async (
  quizData: QuizModel,
  teacher: userInDb
): Promise<ApiController<QuizModel>> => {
  try {
    quizData.institute = teacher.teacherInstitute
    quizData.teacher = teacher._id

    const quiz = await Quiz.upsertQuizByBatch(quizData.batch, quizData)

    return { status: statusCode.Success, data: quiz }
  } catch (err) {
    console.log(err)
    return internalError
  }
}

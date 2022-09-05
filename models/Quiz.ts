import { QuizModel, QuizQuestionModel } from 'helpers/types'
import mongoose from 'mongoose'

const QuizQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctOption: {
    type: Number,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
})

const QuizQuestion =
  (mongoose.models.QuizQuestion as mongoose.Model<QuizQuestionModel>) ||
  mongoose.model<QuizQuestionModel>('QuizQuestion', QuizQuestionSchema)

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  institute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuizQuestion',
    },
  ],
  duration: Number,
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Batch',
  },
  startTime: String,
  endTime: String,
})

const Quiz =
  (mongoose.models.Quiz as mongoose.Model<QuizModel>) ||
  mongoose.model<QuizModel>('Quiz', QuizSchema)

const upsertQuizQuestion = async (
  query: QuizQuestionModel,
  data: QuizQuestionModel
) => {
  const question = await QuizQuestion.findOneAndUpdate(query, data, {
    upsert: true,
    returnOriginal: false,
  }).lean()

  return question
}

const upsertQuizByBatch = async (batchId: string, data: QuizModel) => {
  const quiz = await Quiz.findOneAndUpdate({ batch: batchId }, data, {
    upsert: true,
    returnOriginal: false,
  }).lean()

  return quiz
}

const getQuizDataWithoutAnswers = async (batchId: string) => {
  const quiz = await Quiz.findOne({ batch: batchId })
    .populate('questions', '-correctOption')
    .lean()
  return quiz
}

const getQuizDataWithAnswers = async (batchId: string) => {
  const quiz = await Quiz.findOne({ batch: batchId })
    .populate('questions')
    .lean()
  return quiz
}

const getQuizzesForStudent = async (batchId: string) => {
  const quizzes = await Quiz.find({ batch: batchId })
    .select('title duration batch teacher _id ')
    .populate('batch', 'title _id')
    .populate('teacher', 'name _id')
    .lean()

  return quizzes
}

const find = async (query: QuizModel, select?: string) =>
  await Quiz.find(query).select(select).lean()

export {
  Quiz,
  QuizQuestion,
  upsertQuizQuestion,
  upsertQuizByBatch,
  getQuizDataWithoutAnswers,
  getQuizDataWithAnswers,
  getQuizzesForStudent,
  find,
}

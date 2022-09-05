import { QuizAnswers } from 'helpers/types'
import mongoose from 'mongoose'

const QuizAnswersSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizQuestion',
      },
      option: {
        type: Number,
      },
      marks: {
        type: Number,
      },
    },
  ],
  totalMarks: {
    type: Number,
  },
  maxMarks: {
    type: Number,
  },
})

const QuizAnswers =
  (mongoose.models.QuizAnswers as mongoose.Model<QuizAnswers>) ||
  mongoose.model<QuizAnswers>('QuizAnswers', QuizAnswersSchema)

const findOne = async (query: QuizAnswers) =>
  await QuizAnswers.findOne(query).lean()

const find = async (query: QuizAnswers) => await QuizAnswers.find(query).lean()

const insertOne = async (data: QuizAnswers) => {
  let newQuizAnswer = new QuizAnswers(data)

  await newQuizAnswer.save()
  return newQuizAnswer
}

const deleteOne = async (query: QuizAnswers) => await QuizAnswers.remove(query)

const updateOne = async (query: QuizAnswers, data: QuizAnswers) => {
  console.log(data)
  const quizAnswer = await QuizAnswers.findOneAndUpdate(query, data, {
    returnOriginal: false,
  }).lean()

  return quizAnswer
}

const upsertOne = async (query: QuizAnswers, data: QuizAnswers) => {
  const quizAnswer = await QuizAnswers.findOneAndUpdate(query, data, {
    upsert: true,
    returnOriginal: false,
  }).lean()

  return quizAnswer
}

export {
  QuizAnswers,
  findOne,
  find,
  insertOne,
  upsertOne,
  deleteOne,
  updateOne,
}

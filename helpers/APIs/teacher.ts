import { BatchModel, QuizModel, QuizQuestionModel } from 'helpers/types'
import api from '.'

export const getBatchesForTeacher = async (): Promise<BatchModel[]> =>
  await api.get('/teacher/batch').then((res) => res.data)

export const addQuestion = async (
  questionData: QuizQuestionModel
): Promise<QuizQuestionModel> =>
  await api.post('/teacher/quiz-question', questionData).then((res) => res.data)

export const addQuiz = async (quizData: QuizModel): Promise<QuizModel> =>
  await api.post('/teacher/quiz', quizData).then((res) => res.data)

export const getQuizzes = async (): Promise<QuizModel[]> =>
  await api.get('/teacher/quiz').then((res) => res.data)

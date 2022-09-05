import { QuestionAnswer, QuizModel } from 'helpers/types'
import api from '.'

export const studentQuizzes = async (): Promise<QuizModel[]> =>
  await api.get('/student/quiz').then((res) => res.data)

export const getQuizData = async (quizId: string): Promise<QuizModel> =>
  await api
    .get('/quiz', {
      params: {
        quizId,
      },
    })
    .then((res) => res.data)

export const attemptQuiz = async (quizId: string, answers: QuestionAnswer[]) =>
  await api
    .post('/student/answers', answers, {
      params: {
        quizId,
      },
    })
    .then((res) => res.data)

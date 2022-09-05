import { QuizModel } from 'helpers/types'
import api from '.'

export const studentQuizzes = async (): Promise<QuizModel[]> =>
  await api.get('/student/quiz').then((res) => res.data)

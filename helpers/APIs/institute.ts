import {
  BatchModel,
  QuizAnswers,
  QuizModel,
  StudentVerification,
  userInDb,
} from 'helpers/types'
import api from '.'

export const getInstitutes = async (): Promise<userInDb[]> =>
  await api.get('/institute').then((res) => res.data)

export const getBatchesByInstitute = async (
  instituteId: string
): Promise<BatchModel[]> =>
  await api
    .get('/institute/batch-no-auth', {
      params: {
        instituteId,
      },
    })
    .then((res) => res.data)

export const getInstituteBatchesWithTeacher = async (): Promise<BatchModel[]> =>
  await api.get('/institute/batch').then((res) => res.data)

export const getAllTeachers = async (): Promise<userInDb[]> =>
  await api.get('/institute/teacher').then((res) => res.data)

export const createOrUpdateBatch = async (
  batch: BatchModel
): Promise<BatchModel> =>
  await api.post('/institute/batch', batch).then((res) => res.data)

export const createTeacher = async (teacher: userInDb): Promise<userInDb> =>
  await api.post('/institute/teacher', teacher).then((res) => res.data)

export const getStudentsForVerification = async (): Promise<
  StudentVerification[]
> => await api.get('/institute/stud-verify').then((res) => res.data)

export const verifyStudent = async (studVerifyId: string, accept: boolean) =>
  await api.put(
    '/institute/stud-verify',
    {},
    {
      params: {
        studVerifyId,
        accept,
      },
    }
  )

export const getOwnedQuizzes = async (): Promise<QuizModel[]> =>
  await api.get('/quiz/owned-quizzes').then((res) => res.data)

export const getQuizAnswers = async (quizId: string): Promise<QuizAnswers[]> =>
  await api
    .get('/quiz/results', {
      params: {
        quizId,
      },
    })
    .then((res) => res.data)

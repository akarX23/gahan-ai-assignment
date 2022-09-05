import { BatchModel, userInDb } from 'helpers/types'
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

import { BatchModel } from 'helpers/types'
import api from '.'

export const getBatchesForTeacher = async (): Promise<BatchModel[]> =>
  await api.get('/teacher/batch').then((res) => res.data)

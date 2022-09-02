import { StudentVerification } from 'helpers/types'
import mongoose from 'mongoose'

const StudentVerify = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Batch',
  },
  institute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const StudVerify =
  (mongoose.models.StudVerification as mongoose.Model<StudentVerification>) ||
  mongoose.model<StudentVerification>('StudVerification', StudentVerify)

const findOne = async (query: StudentVerification) =>
  await StudVerify.findOne(query).lean()

const find = async (query: StudentVerification) =>
  await StudVerify.find(query).lean()

const insertOne = async (data: StudentVerification) => {
  let newStudVerify = new StudVerify(data)

  await newStudVerify.save()
  return newStudVerify
}

const deleteOne = async (query: StudentVerification) =>
  await StudVerify.remove(query)

const updateOne = async (
  query: StudentVerification,
  data: StudentVerification
) => {
  console.log(data)
  const batch = await StudVerify.findOneAndUpdate(query, data, {
    returnOriginal: false,
  }).lean()

  return batch
}

const upsertOne = async (
  query: StudentVerification,
  data: StudentVerification
) => {
  const batch = await StudVerify.findOneAndUpdate(query, data, {
    upsert: true,
    returnOriginal: false,
  }).lean()

  return batch
}

export {
  StudVerify as StudVerifyModel,
  findOne,
  find,
  insertOne,
  upsertOne,
  deleteOne,
  updateOne,
}

import { BatchModel } from 'helpers/types'
import mongoose from 'mongoose'

const BatchSchema = new mongoose.Schema({
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
    ref: 'Batch',
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Batch',
    },
  ],
})

const Batch =
  (mongoose.models.Batch as mongoose.Model<BatchModel>) ||
  mongoose.model<BatchModel>('Batch', BatchSchema)

const findOne = async (query: BatchModel): Promise<BatchModel> =>
  await Batch.findOne(query).lean()

const find = async (query: BatchModel, select: string) =>
  await Batch.find(query).select(select).lean()

const insertOne = async (data: BatchModel) => {
  let newBatch = new Batch(data)

  await newBatch.save()
  return newBatch
}

const deleteOne = async (query: BatchModel) => await Batch.remove(query)

const updateOne = async (query: BatchModel, data: BatchModel) => {
  console.log(data)
  const batch = await Batch.findOneAndUpdate(query, data, {
    returnOriginal: false,
  })

  return batch
}

const upsertOne = async (query: BatchModel, data: BatchModel) => {
  const batch = await Batch.findOneAndUpdate(query, data, {
    upsert: true,
    returnOriginal: false,
  }).lean()

  return batch
}

const addStudentToBatch = async (batchId: string, studentId: string) => {
  const batch = await Batch.findOneAndUpdate(
    { _id: batchId },
    { $push: { students: studentId } },
    {
      returnOriginal: false,
    }
  ).lean()

  return batch
}

const batchesWithTeacher = async (instituteId: string) => {
  const batch = await Batch.find({ institute: instituteId })
    .populate('teacher', 'name email _id')
    .lean()

  return batch
}

export {
  Batch,
  findOne,
  find,
  insertOne,
  upsertOne,
  deleteOne,
  updateOne,
  addStudentToBatch,
  batchesWithTeacher,
}

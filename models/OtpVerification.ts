import { OtpVerification } from 'helpers/types'
import mongoose from 'mongoose'

const OtpVerifySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    otp: {
      type: Number,
      required: true,
    },
  },
  {
    expires: '1m',
  }
)

const OtpVerify =
  (mongoose.models.OtpVerification as mongoose.Model<OtpVerification>) ||
  mongoose.model<OtpVerification>('OtpVerification', OtpVerifySchema)

const findOne = async (query: OtpVerification) =>
  await OtpVerify.findOne(query).lean()

const find = async (query: OtpVerification) =>
  await OtpVerify.find(query).lean()

const insertOne = async (data: OtpVerification) => {
  let newOtpVerify = new OtpVerify(data)

  await newOtpVerify.save()
  return newOtpVerify
}

const deleteOne = async (query: OtpVerification) =>
  await OtpVerify.remove(query)

const updateOne = async (query: OtpVerification, data: OtpVerification) => {
  console.log(data)
  const otpVerify = await OtpVerify.findOneAndUpdate(query, data, {
    returnOriginal: false,
  }).lean()

  return otpVerify
}

const upsertOne = async (query: OtpVerification, data: OtpVerification) => {
  const otpVerify = await OtpVerify.findOneAndUpdate(query, data, {
    upsert: true,
    returnOriginal: false,
  }).lean()

  return otpVerify
}

export { OtpVerify, findOne, find, insertOne, upsertOne, deleteOne, updateOne }

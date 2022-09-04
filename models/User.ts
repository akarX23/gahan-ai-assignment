import { userInDb, userTypes } from 'helpers/types'
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    validate: {
      validator: function (email: string) {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        )
      },
    },
    unique: true,
    required: true,
    index: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
    index: true,
  },
  phone: {
    type: String,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
  },
  address: {
    type: String,
  },
  type: {
    type: String,
    enum: Object.values(userTypes),
  },
  studentBatch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  teacherInstitute: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

const User =
  (mongoose.models.User as mongoose.Model<userInDb>) ||
  mongoose.model<userInDb>('User', UserSchema)

const findOne = async (query: userInDb) => await User.findOne(query).lean()

const find = async (query: userInDb, select?: string) =>
  await User.find(query).select(select).lean()

const insertOne = async (data: userInDb) => {
  let newUser = new User(data)

  await newUser.save()
  return newUser
}

const deleteOne = async (query: userInDb) => await User.remove(query)

const updateOne = async (query: userInDb, data: userInDb) => {
  console.log(data)
  const user = await User.findOneAndUpdate(query, data, {
    returnOriginal: false,
  })
  console.log('New user after sub', user)
  return user
}

const upsertOne = async (query: userInDb, data: userInDb) => {
  const user = await User.findOneAndUpdate(query, data, {
    upsert: true,
    returnOriginal: false,
  }).lean()

  return user
}

export { User, findOne, find, insertOne, upsertOne, deleteOne, updateOne }

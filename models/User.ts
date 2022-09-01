import { userInDb } from 'helpers/types'
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
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
    type: Number,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

const findOne = async (query: userInDb) => await User.findOne(query).lean()

const find = async (query: userInDb) => await User.find(query).lean()

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
  delete user.authToken
  return user
}

const findByUid = async (uid: string) => await User.findOne({ uid })

const findByToken = async (token: string) =>
  await User.findOne({ authToken: token })

export {
  User,
  findOne,
  find,
  insertOne,
  upsertOne,
  deleteOne,
  updateOne,
  findByUid,
  findByToken,
}

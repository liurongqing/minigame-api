import * as mongoose from 'mongoose'
const { Schema } = mongoose

export const adminModel = mongoose.model(
  'admin',
  new Schema(
    {
      username: {
        type: String,
        index: true,
        unique: true,
        dropDups: true,
        required: true,
        trim: true
      }, // 用户名
      nickname: String, // 昵称
      password: {
        type: String,
        required: true
      }, // 密码
      isDeleted: {
        type: Number,
        default: 0,
        trim: true,
        enum: [0, 1]
      }
    },
    { collection: 'admin', versionKey: false, timestamps: true }
  )
)

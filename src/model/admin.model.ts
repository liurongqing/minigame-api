import * as mongoose from 'mongoose'
import admin from '@/controller/admin'
const { Schema } = mongoose

export const adminModel = mongoose.model(
  'admin',
  new Schema(
    {
      username: {
        type: String,
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
  ).index({ username: 1, isDeleted: -1 }, { unique: true })
)
// .index({ username: 1, isDeleted: -1 }, { unique: true })

// adminModel.index
// adminModel.index
// adminModel.createIndexes(()=>{

// })

// adminModel.index({ username: 1, isDeleted: 1 }, { unique: true })

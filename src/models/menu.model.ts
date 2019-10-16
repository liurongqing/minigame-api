import * as mongoose from 'mongoose'
const { Schema } = mongoose

export const menuModel = mongoose.model(
  'menu',
  new Schema(
    {
      text: String,
      link: String,
      icon: String,
      parentId: {
        type: String,
        default: '0'
      },
      status: {
        type: Number,
        default: 1,
        enum: [0, 1]
      },
      sort: {
        type: Number,
        default: 0
      },
      isDeleted: {
        type: Number,
        default: 0,
        trim: true,
        enum: [0, 1]
      }
    },
    { collection: 'menu', versionKey: false, timestamps: true }
  )
)

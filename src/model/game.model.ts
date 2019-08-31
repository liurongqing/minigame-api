import * as mongoose from 'mongoose'
const { Schema } = mongoose

export const gameModal = mongoose.model(
  'game',
  new Schema(
    {
      name: String,
      typeId: String,
      status: {
        type: Number,
        default: 1,
        enum: [0, 1]
      },
      isDeleted: {
        type: Number,
        default: 0,
        trim: true,
        enum: [0, 1]
      }
    },
    { collection: 'game', versionKey: false, timestamps: true }
  )
)

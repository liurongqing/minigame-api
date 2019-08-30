import * as mongoose from 'mongoose'
const { Schema } = mongoose

export default mongoose.model(
  'activity',
  new Schema(
    {
      name: String,
      startAt: Date,
      endAt: Date,
      status: {
        type: Number,
        default: 1,
        enum: [0, 1]
      },
      isDeleted: {
        type: Number,
        default: 0,
        enum: [0, 1]
      }
    },
    { collection: 'activity', versionKey: false, timestamps: true }
  )
)

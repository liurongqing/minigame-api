import * as mongoose from 'mongoose'
const { Schema } = mongoose

export default mongoose.model(
  'login',
  new Schema(
    {
      username: String,
      password: String,
      isDeleted: {
        type: Number,
        default: 0,
        trim: true,
        enum: [0, 1]
      }
    },
    { collection: 'login', versionKey: false, timestamps: true }
  )
)

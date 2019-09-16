import * as mongoose from 'mongoose'
import { ObjectID } from 'bson'
const { Schema } = mongoose

export const permissionsModel = mongoose.model(
  'permissions',
  new Schema(
    {
      menuId: {
        type: ObjectID,
        ref: 'menu'
      },
      page: String,
      feature: String,
      isDeleted: {
        type: Number,
        default: 0,
        enum: [0, 1]
      }
    },
    { collection: 'permissions', versionKey: false, timestamps: true }
  )
)

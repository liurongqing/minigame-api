import * as mongoose from 'mongoose'
const { Schema } = mongoose

export const roleModel = mongoose.model(
  'role',
  new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true
      }, // 角色名
      status: {
        type: Number,
        default: 1,
        enum: [0, 1]
      }, // 角色状态： 激活、停用
      permissions: {
        type: String
      }, // {page: ['edit', 'add']}
      isDeleted: {
        type: Number,
        default: 0,
        trim: true,
        enum: [0, 1]
      }
    },
    { collection: 'role', versionKey: false, timestamps: true }
  )
)

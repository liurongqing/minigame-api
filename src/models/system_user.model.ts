import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export default mongoose.model(
  'system_user',
  new Schema(
    {
        phone: String, // 手机号
        password: String, // 密码
        // auths: {
            // menus: [
            // 	{_id: ['edit','add','del']},
            //     {_id: ['edit','add','del']}
            // ], // 允许访问的菜单id
        // },
        isDeleted: {
            type: Number,
            default: 0,
            trim: true,
            enum: [0, 1]
        }
    },
    { collection: 'system_user', versionKey: false, timestamps: true }
  )
);

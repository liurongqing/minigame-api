import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export default mongoose.model(
  'game_type',
  new Schema(
    {
      name: String,
      parentId: {
          type: String,
          default: '0'
      },
      isDeleted: {
        type: Number,
        default: 0,
        enum: [0, 1]
      }
    },
    { collection: 'game_type', versionKey: false, timestamps: true }
  )
);

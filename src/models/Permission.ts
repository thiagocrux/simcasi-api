import { model, Schema } from 'mongoose';

const schema = new Schema(
  {
    code: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

export const Permission = model('Permission', schema);

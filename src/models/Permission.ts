import { model, Schema } from 'mongoose';

const schema = new Schema(
  {
    code: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Permission = model('Permission', schema);

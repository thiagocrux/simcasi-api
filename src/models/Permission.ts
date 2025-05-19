import { model, Schema } from 'mongoose';
import { PERMISSIONS } from '../config';

const schema = new Schema(
  {
    code: { type: String, enum: PERMISSIONS, unique: true, required: true },
  },
  { timestamps: true }
);

export const Permission = model('Permission', schema);

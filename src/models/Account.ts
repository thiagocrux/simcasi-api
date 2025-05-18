import { model, Schema } from 'mongoose';

const schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  },
  { timestamps: true }
);

export const Account = model('Account', schema);

import { model, Schema, Types } from 'mongoose';

export interface AccountDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  },
  { timestamps: true }
);

export const Account = model<AccountDocument>('Account', schema);

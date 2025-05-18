import { model, Schema } from 'mongoose';

const schema = new Schema(
  {
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  },
  { timestamps: true }
);

export const RefreshToken = model('Refresh Token', schema);

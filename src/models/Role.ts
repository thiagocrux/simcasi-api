import { model, Schema } from 'mongoose';
import { ACCOUNT_ROLES } from '../config';

const schema = new Schema(
  {
    name: {
      type: String,
      enum: ACCOUNT_ROLES,
      unique: true,
      required: true,
    },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Permission',
      },
    ],
  },
  { timestamps: true }
);

export const Role = model('Role', schema);

import { model, Schema } from 'mongoose';

const schema = new Schema(
  {
    name: {
      type: String,
      enum: ['user', 'admin', 'viewer'],
      unique: true,
      required: true,
    },
    permissions: [
      {
        type: String,
        ref: 'Permission',
        foreignField: 'code',
        localField: 'permissions',
      },
    ],
  },
  { timestamps: true }
);

export const Role = model('Role', schema);

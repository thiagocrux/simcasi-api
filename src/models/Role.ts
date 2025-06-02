import { Document, model, Schema, Types } from 'mongoose';

import { ACCOUNT_ROLES } from '../config';
import { PermissionCodes } from '../types';

export interface RoleDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  permissions: PermissionCodes[];
  createdAt: Date;
  updatedAt: Date;
}

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
        type: String,
        ref: 'Permission',
      },
    ],
  },
  { timestamps: true }
);

export const Role = model<RoleDocument>('Role', schema);

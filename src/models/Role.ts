import { Document, model, models, Schema, Types } from 'mongoose';

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

export const Role = models.Role || model<RoleDocument>('Role', schema);

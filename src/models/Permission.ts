import { Document, model, Schema, Types } from 'mongoose';

import { PermissionCodes } from '../types';

export interface PermissionDocument extends Document {
  _id: Types.ObjectId;
  code: PermissionCodes;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema(
  {
    code: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

export const Permission = model<PermissionDocument>('Permission', schema);

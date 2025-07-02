import mongoose, { Document, model, Schema, Types } from 'mongoose';

export interface SessionDocument extends Document {
  _id: Types.ObjectId;
  accountId: string;
  isActive: boolean;
  issuedAt: Date;
  expiresAt: Date;
  deviceInfo: {
    ipAddress: string;
    userAgent: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema(
  {
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    isActive: { type: Boolean, default: true },
    issuedAt: { type: Date, default: Date.now() },
    expiresAt: { type: Date, required: true },
    deviceInfo: {
      ipAddress: { type: String, required: true },
      userAgent: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export const Session =
  mongoose.models.Session || model<SessionDocument>('Session', schema);

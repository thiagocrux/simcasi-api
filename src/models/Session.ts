import { model, Schema } from 'mongoose';

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

export const Session = model('Session', schema);

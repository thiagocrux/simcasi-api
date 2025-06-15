import { Document, model, Schema, Types } from 'mongoose';

export interface NotificationDocument extends Document {
  _id: Types.ObjectId;
  sinan: string;
  observations: string | null;
  patient: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema(
  {
    sinan: { type: String, required: true },
    observations: { type: String, default: null },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = model<NotificationDocument>('Notification', schema);

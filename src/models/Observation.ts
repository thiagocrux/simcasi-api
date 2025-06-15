import { Document, model, Schema, Types } from 'mongoose';

export interface ObservationDocument extends Document {
  _id: Types.ObjectId;
  observations: string | null;
  partnerBeingTreated: boolean;
  patient: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema(
  {
    observations: { type: String, default: null },
    partnerBeingTreated: { type: Boolean, default: false },
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

export const Observation = model<ObservationDocument>('Observation', schema);

import { Document, model, Schema, Types } from 'mongoose';

export interface ObservationDocument extends Document {
  observations: string | null;
  partnerBeingTreated: boolean;
  patient: Types.ObjectId;
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

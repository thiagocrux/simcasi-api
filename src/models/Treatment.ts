import { Document, model, Schema, Types } from 'mongoose';

export interface TreatmentDocument extends Document {
  medication: string;
  healthCenter: string;
  startDate: string;
  dosage: string;
  observations: string | null;
  partnerInformation: string | null;
  patient: Types.ObjectId;
}

const schema = new Schema(
  {
    medication: { type: String, required: true },
    healthCenter: { type: String, required: true },
    startDate: { type: String, required: true },
    dosage: { type: String, required: true },
    observations: { type: String, default: null },
    partnerInformation: { type: String, default: null },
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

export const Treatment = model<TreatmentDocument>('Treatment', schema);

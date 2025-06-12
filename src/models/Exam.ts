import { Document, model, Schema, Types } from 'mongoose';

export interface ExamDocument extends Document {
  treponemalTestType: string;
  treponemalTestResult: string;
  treponemalTestDate: string;
  treponemalTestLocation: string;
  nontreponemalVdrlTest: string;
  nontreponemalTestTitration: string;
  nontreponemalTestDate: string;
  otherNontreponemalTest: string | null;
  otherNontreponemalTestDate: string | null;
  referenceObservations: string;
  patient: Types.ObjectId;
}

const schema = new Schema(
  {
    treponemalTestType: { type: String, required: true },
    treponemalTestResult: { type: String, required: true },
    treponemalTestDate: { type: String, required: true },
    treponemalTestLocation: { type: String, required: true },
    nontreponemalVdrlTest: { type: String, required: true },
    nontreponemalTestTitration: { type: String, required: true },
    nontreponemalTestDate: { type: String, required: true },
    otherNontreponemalTest: { type: String, default: null },
    otherNontreponemalTestDate: { type: String, default: null },
    referenceObservations: { type: String, required: true },
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

export const Exam = model<ExamDocument>('Exam', schema);

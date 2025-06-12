import { Document, model, Schema } from 'mongoose';

export interface PatientDocument extends Document {
  susCardNumber: string;
  name: string;
  cpf: string;
  socialName: string | null;
  birthDate: string;
  race: string;
  sex: string;
  gender: string;
  sexuality: string;
  nationality: string;
  schooling: string;
  phone: string | null;
  email: string | null;
  motherName: string;
  fatherName: string | null;
  isDeceased: boolean;
  monitoringType: string;
  zipCode: string | null;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  houseNumber: number;
  complement: string | null;
}

const schema = new Schema(
  {
    susCardNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    socialName: { type: String },
    birthDate: { type: String, required: true },
    race: { type: String, required: true },
    sex: { type: String, required: true },
    gender: { type: String, required: true },
    sexuality: { type: String, required: true },
    nationality: { type: String, required: true },
    schooling: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    motherName: { type: String, required: true },
    fatherName: { type: String },
    isDeceased: { type: Boolean, default: false },
    monitoringType: { type: String, required: true },
    zipCode: { type: String },
    state: { type: String, required: true },
    city: { type: String, required: true },
    neighborhood: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: Number, required: true },
    complement: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Patient = model<PatientDocument>('Patient', schema);

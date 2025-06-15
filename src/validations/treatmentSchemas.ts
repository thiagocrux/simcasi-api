import z, { string } from 'zod';

export const CreateTreatmentSchema = z.object({
  medication: string(),
  healthCenter: string(),
  startDate: string(),
  dosage: string(),
  observations: string().nullable().optional(),
  partnerInformation: string().nullable().optional(),
  patient: string(),
});

export const UpdateTreatmentSchema = z.object({
  medication: string().optional(),
  healthCenter: string().optional(),
  startDate: string().optional(),
  dosage: string().optional(),
  observations: string().nullable().optional(),
  partnerInformation: string().nullable().optional(),
  patient: string().optional(),
});

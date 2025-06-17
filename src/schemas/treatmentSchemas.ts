import z from 'zod';

export const CreateTreatmentSchema = z.object({
  medication: z.string(),
  healthCenter: z.string(),
  startDate: z.string(),
  dosage: z.string(),
  observations: z.string().nullable().optional(),
  partnerInformation: z.string().nullable().optional(),
  patient: z.string(),
});

export const UpdateTreatmentSchema = z.object({
  medication: z.string().optional(),
  healthCenter: z.string().optional(),
  startDate: z.string().optional(),
  dosage: z.string().optional(),
  observations: z.string().nullable().optional(),
  partnerInformation: z.string().nullable().optional(),
  patient: z.string().optional(),
});

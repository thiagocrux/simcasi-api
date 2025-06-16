import z, { boolean, string } from 'zod';

export const CreateObservationSchema = z.object({
  observations: string().nullable().optional(),
  partnerBeingTreated: boolean(),
  patient: string(),
});

export const UpdateObservationSchema = z.object({
  observations: string().nullable().optional(),
  partnerBeingTreated: boolean().optional(),
  patient: string().optional(),
});

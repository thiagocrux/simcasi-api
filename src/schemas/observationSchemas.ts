import z from 'zod';

export const CreateObservationSchema = z.object({
  observations: z.string().nullable().optional(),
  partnerBeingTreated: z.boolean(),
  patient: z.string(),
});

export const UpdateObservationSchema = z.object({
  observations: z.string().nullable().optional(),
  partnerBeingTreated: z.boolean().optional(),
  patient: z.string().optional(),
});

import z from 'zod';

export const CreateNotificationSchema = z.object({
  sinan: z.string(),
  observations: z.string().nullable().optional(),
  patient: z.string(),
});

export const UpdateNotificationSchema = z.object({
  sinan: z.string().optional(),
  observations: z.string().nullable().optional(),
  patient: z.string().optional(),
});

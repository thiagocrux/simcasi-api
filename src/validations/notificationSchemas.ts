import z, { string } from 'zod';

export const CreateNotificationSchema = z.object({
  sinan: string(),
  observations: string().nullable().optional(),
  patient: string(),
});

export const UpdateNotificationSchema = z.object({
  sinan: string().optional(),
  observations: string().nullable().optional(),
  patient: string().optional(),
});

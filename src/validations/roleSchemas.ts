import z from 'zod';

export const CreateRoleSchema = z.object({
  name: z.string(),
  permissions: z.array(z.string()),
});

export const UpdateRoleSchema = z.object({
  name: z.string().optional(),
  permissions: z.array(z.string()).optional(),
});

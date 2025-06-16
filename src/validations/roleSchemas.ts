import z from 'zod';

export const ACCOUNT_ROLES = ['admin', 'user', 'viewer'] as const;

export const CreateRoleSchema = z.object({
  name: z.enum(ACCOUNT_ROLES),
  permissions: z.array(z.string()).optional(),
});

export const UpdateRoleSchema = z.object({
  name: z.enum(ACCOUNT_ROLES).optional(),
  permissions: z.array(z.string()).optional(),
});

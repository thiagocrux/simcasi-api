import z from 'zod';

const Roles = ['admin', 'user', 'viewer'] as const;

export const CreateRoleSchema = z.object({
  name: z.enum(Roles),
  permissions: z.array(z.string()).optional(),
});

export const UpdateRoleSchema = z.object({
  name: z.enum(Roles).optional(),
  permissions: z.array(z.string()).optional(),
});

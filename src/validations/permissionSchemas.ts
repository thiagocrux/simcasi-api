import z from 'zod';

export const CreatePermissionSchema = z.object({
  code: z.string(),
});

export const UpdatePermissionSchema = z.object({
  code: z.string().optional(),
});

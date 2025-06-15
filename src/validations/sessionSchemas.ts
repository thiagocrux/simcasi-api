import z from 'zod';

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;

export const CreateSessionSchema = z.object({
  email: z.string().email('The email has an invalid format.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(PASSWORD_REGEX, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
  deviceInfo: z.object({
    ipAddress: z.string(),
    userAgent: z.string(),
  }),
});

export const UpdateSessionSchema = z.object({
  accountId: z.string().optional(),
  isActive: z.boolean().optional(),
  issuedAt: z.date().optional(),
  expiresAt: z.date().optional(),
  deviceInfo: z
    .object({
      ipAddress: z.string(),
      userAgent: z.string(),
    })
    .optional(),
});

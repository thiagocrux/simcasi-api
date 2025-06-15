import z from 'zod';

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;

export const CreateAccountSchema = z.object({
  name: z.string(),
  email: z.string().email('The email has an invalid format.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(PASSWORD_REGEX, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
  role: z.string(),
});

export const UpdateAccountSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('The email has an invalid format.').optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(PASSWORD_REGEX, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    })
    .optional(),
  role: z.string().optional(),
});

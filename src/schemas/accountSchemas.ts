import z from 'zod';

import { MESSAGES } from './validations/messages';
import { REGEX } from './validations/regex';

export const CreateAccountSchema = z.object({
  name: z.string(),
  email: z.string().email(MESSAGES.invalidEmailFormat),
  password: z.string().min(8, MESSAGES.passwordTooShort).regex(REGEX.password, {
    message: MESSAGES.invalidPasswordFormat,
  }),
  role: z.string(),
});

export const UpdateAccountSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(MESSAGES.invalidEmailFormat).optional(),
  password: z
    .string()
    .min(8, MESSAGES.passwordTooShort)
    .regex(REGEX.password, {
      message: MESSAGES.invalidPasswordFormat,
    })
    .optional(),
  role: z.string().optional(),
});

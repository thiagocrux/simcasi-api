import z from 'zod';

import { ACCOUNT_ROLES } from './roleSchemas';
import { MESSAGES } from './validations/messages';
import { REGEX } from './validations/regex';

export const CreateAccountSchema = z.object({
  name: z.string().min(1, MESSAGES.nameTooShort),
  email: z.string().email(MESSAGES.invalidEmailFormat),
  password: z.string().min(8, MESSAGES.passwordTooShort).regex(REGEX.password, {
    message: MESSAGES.invalidPasswordFormat,
  }),
  role: z.enum(ACCOUNT_ROLES),
});

export const UpdateAccountSchema = z.object({
  name: z.string().min(1, MESSAGES.nameTooShort).optional(),
  email: z.string().email(MESSAGES.invalidEmailFormat).optional(),
  password: z
    .string()
    .min(8, MESSAGES.passwordTooShort)
    .regex(REGEX.password, {
      message: MESSAGES.invalidPasswordFormat,
    })
    .optional(),
  role: z.enum(ACCOUNT_ROLES).optional(),
});

import z from 'zod';

import { MESSAGES } from './validations/messages';
import { REGEX } from './validations/regex';

export const CreateSessionSchema = z.object({
  email: z.string().email(MESSAGES.invalidEmailFormat),
  password: z.string().min(8, MESSAGES.passwordTooShort).regex(REGEX.password, {
    message: MESSAGES.invalidPasswordFormat,
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

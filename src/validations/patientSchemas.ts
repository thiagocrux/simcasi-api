import z from 'zod';

const PHONE_REGEX = /^\+\d{2}\s[1-9]{2}\s9\d{4}-\d{4}$/;

const CPF_REGEX =
  /^([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})$/;

export const CreatePatientSchema = z.object({
  susCardNumber: z.string(),
  name: z.string(),
  cpf: z.string().regex(CPF_REGEX, 'The CPF has an invalid format.'),
  socialName: z.string().nullable().optional(),
  birthDate: z.string(),
  race: z.string(),
  sex: z.string(),
  gender: z.string(),
  sexuality: z.string(),
  nationality: z.string(),
  schooling: z.string(),
  phone: z
    .string()
    .regex(PHONE_REGEX, 'The phone has an invalid format.')
    .nullable()
    .optional(),
  email: z.string().nullable().optional(),
  motherName: z.string(),
  fatherName: z.string().nullable().optional(),
  isDeceased: z.boolean(),
  monitoringType: z.string(),
  zipCode: z.string().nullable().optional(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  houseNumber: z.number(),
  complement: z.string().nullable().optional(),
});

export const UpdatePatientSchema = z.object({
  susCardNumber: z.string().optional(),
  name: z.string().optional(),
  cpf: z.string().regex(CPF_REGEX, 'The CPF has an invalid format.').optional(),
  socialName: z.string().nullable().optional(),
  birthDate: z.string().optional(),
  race: z.string().optional(),
  sex: z.string().optional(),
  gender: z.string().optional(),
  sexuality: z.string().optional(),
  nationality: z.string().optional(),
  schooling: z.string().optional(),
  phone: z
    .string()
    .regex(PHONE_REGEX, 'The phone has an invalid format.')
    .nullable()
    .optional(),
  email: z.string().nullable().optional(),
  motherName: z.string().optional(),
  fatherName: z.string().nullable().optional(),
  isDeceased: z.boolean().optional(),
  monitoringType: z.string().optional(),
  zipCode: z.string().nullable().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  street: z.string().optional(),
  houseNumber: z.number().optional(),
  complement: z.string().nullable().optional(),
});

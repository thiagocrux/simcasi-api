import z from 'zod';

export const CreateExamSchema = z.object({
  treponemalTestType: z.string(),
  treponemalTestResult: z.string(),
  treponemalTestDate: z.string(),
  treponemalTestLocation: z.string(),
  nontreponemalVdrlTest: z.string(),
  nontreponemalTestTitration: z.string(),
  nontreponemalTestDate: z.string(),
  otherNontreponemalTest: z.string().nullable().optional(),
  otherNontreponemalTestDate: z.string().nullable().optional(),
  referenceObservations: z.string(),
  patient: z.string(),
});

export const UpdateExamSchema = z.object({
  treponemalTestType: z.string().optional(),
  treponemalTestResult: z.string().optional(),
  treponemalTestDate: z.string().optional(),
  treponemalTestLocation: z.string().optional(),
  nontreponemalVdrlTest: z.string().optional(),
  nontreponemalTestTitration: z.string().optional(),
  nontreponemalTestDate: z.string().optional(),
  otherNontreponemalTest: z.string().nullable().optional(),
  otherNontreponemalTestDate: z.string().nullable().optional(),
  referenceObservations: z.string(),
  patient: z.string().optional(),
});

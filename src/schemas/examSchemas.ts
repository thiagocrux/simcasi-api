import z, { string } from 'zod';

export const CreateExamSchema = z.object({
  treponemalTestType: string(),
  treponemalTestResult: string(),
  treponemalTestDate: string(),
  treponemalTestLocation: string(),
  nontreponemalVdrlTest: string(),
  nontreponemalTestTitration: string(),
  nontreponemalTestDate: string(),
  otherNontreponemalTest: string().nullable().optional(),
  otherNontreponemalTestDate: string().nullable().optional(),
  referenceObservations: string(),
  patient: string(),
});

export const UpdateExamSchema = z.object({
  treponemalTestType: string().optional(),
  treponemalTestResult: string().optional(),
  treponemalTestDate: string().optional(),
  treponemalTestLocation: string().optional(),
  nontreponemalVdrlTest: string().optional(),
  nontreponemalTestTitration: string().optional(),
  nontreponemalTestDate: string().optional(),
  otherNontreponemalTest: string().nullable().optional(),
  otherNontreponemalTestDate: string().nullable().optional(),
  referenceObservations: string(),
  patient: string().optional(),
});

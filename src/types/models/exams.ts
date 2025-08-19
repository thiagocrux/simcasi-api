import { Types } from 'mongoose';

import { CommonProperties } from './common';

export interface Exam {
  treponemalTestType: string;
  treponemalTestResult: string;
  treponemalTestDate: string;
  treponemalTestLocation: string;
  nontreponemalVdrlTest: string;
  nontreponemalTestTitration: string;
  nontreponemalTestDate: string;
  otherNontreponemalTest: string | null;
  otherNontreponemalTestDate: string | null;
  referenceObservations: string;
  patient: Types.ObjectId | string;
}

export interface CreateExamDTO extends Exam {}
export interface UpdateExamDTO extends Partial<Exam> {}
export interface ExamFilter extends Partial<Exam>, Partial<CommonProperties> {}

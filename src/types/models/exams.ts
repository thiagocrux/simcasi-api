import { Types } from 'mongoose';

import { WithObjectId, WithTimestamps, WithVersion } from './common';

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
  patient: Types.ObjectId;
}

export interface CreateExamDTO extends Exam {}
export interface UpdateExamDTO extends Partial<Exam> {}

export interface ExamFilter
  extends Partial<Exam>,
    Partial<WithObjectId>,
    Partial<WithVersion>,
    Partial<WithTimestamps> {}

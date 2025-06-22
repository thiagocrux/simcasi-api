import { Types } from 'mongoose';

import { WithObjectId, WithTimestamps, WithVersion } from './common';

export interface Treatment {
  medication: string;
  healthCenter: string;
  startDate: string;
  dosage: string;
  observations: string | null;
  partnerInformation: string | null;
  patient: Types.ObjectId | string;
}

export interface CreateTreatmentDTO extends Treatment {}
export interface UpdateTreatmentDTO extends Partial<Treatment> {}

export interface TreatmentFilter
  extends Partial<Treatment>,
    Partial<WithObjectId>,
    Partial<WithVersion>,
    Partial<WithTimestamps> {}

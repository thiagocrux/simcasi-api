import { Types } from 'mongoose';

import { WithObjectId, WithTimestamps, WithVersion } from './common';

export interface Observation {
  observations: string | null;
  partnerBeingTreated: boolean;
  patient: Types.ObjectId | string;
}

export interface CreateObservationDTO extends Observation {}
export interface UpdateObservationDTO extends Partial<Observation> {}

export interface ObservationFilter
  extends Partial<Observation>,
    Partial<WithObjectId>,
    Partial<WithVersion>,
    Partial<WithTimestamps> {}

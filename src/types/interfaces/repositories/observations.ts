import {
  CreateObservationDTO,
  ObservationFilter,
  UpdateObservationDTO,
} from '../..';

import { ObservationDocument } from '../../../models';

export interface ObservationsRepository {
  findAll(order: 'asc' | 'desc'): Promise<ObservationDocument[]>;
  findAllByPatient(
    patientId: string,
    order: 'asc' | 'desc'
  ): Promise<ObservationDocument[]>;
  find(filter: ObservationFilter): Promise<ObservationDocument | null>;
  create(body: CreateObservationDTO): Promise<ObservationDocument>;
  update(
    filter: ObservationFilter,
    body: UpdateObservationDTO
  ): Promise<ObservationDocument | null>;
  delete(filter: ObservationFilter): Promise<void>;
}

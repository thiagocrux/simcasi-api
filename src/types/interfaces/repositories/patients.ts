import { CreatePatientDTO, PatientFilter, UpdatePatientDTO } from '../..';
import { PatientDocument } from '../../../models';

export interface PatientsRepository {
  findAll(order: 'asc' | 'desc'): Promise<PatientDocument[]>;
  find(filter: PatientFilter): Promise<PatientDocument | null>;
  create(body: CreatePatientDTO): Promise<PatientDocument>;
  update(
    filter: PatientFilter,
    body: UpdatePatientDTO
  ): Promise<PatientDocument | null>;
  delete(filter: PatientFilter): Promise<void>;
}

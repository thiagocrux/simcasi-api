import { CreateTreatmentDTO, TreatmentFilter, UpdateTreatmentDTO } from '../..';
import { TreatmentDocument } from '../../../models';

export interface TreatmentsRepository {
  findAll(order: 'asc' | 'desc'): Promise<TreatmentDocument[]>;
  findAllByPatient(
    patientId: string,
    order: 'asc' | 'desc'
  ): Promise<TreatmentDocument[]>;
  find(filter: TreatmentFilter): Promise<TreatmentDocument | null>;
  create(body: CreateTreatmentDTO): Promise<TreatmentDocument>;
  update(
    filter: TreatmentFilter,
    body: UpdateTreatmentDTO
  ): Promise<TreatmentDocument | null>;
  delete(filter: TreatmentFilter): Promise<void>;
}

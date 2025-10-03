import { Treatment } from '../models';

import {
  CreateTreatmentDTO,
  TreatmentFilter,
  UpdateTreatmentDTO,
} from '../types';

export class TreatmentsRepository {
  public async findAll(order: 'asc' | 'desc') {
    const treatments = await Treatment.find().sort({
      updatedAt: order === 'desc' ? -1 : 1,
    });

    return treatments;
  }

  public async findAllByPatient(patientId: string, order: 'asc' | 'desc') {
    const treatments = await Treatment.find({ patient: patientId }).sort({
      updatedAt: order === 'desc' ? -1 : 1,
    });

    return treatments;
  }

  public async find(filter: TreatmentFilter) {
    const treatment = await Treatment.findOne(filter);
    return treatment;
  }

  public async create(body: CreateTreatmentDTO) {
    const treatment = await Treatment.create(body);
    return treatment;
  }

  public async update(filter: TreatmentFilter, body: UpdateTreatmentDTO) {
    const treatment = await Treatment.findOneAndUpdate(filter, body, {
      new: true,
    });

    return treatment;
  }

  public async delete(filter: TreatmentFilter) {
    await Treatment.findOneAndDelete(filter);
  }
}

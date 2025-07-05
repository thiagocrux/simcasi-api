import { Patient } from '../models';
import { CreatePatientDTO, PatientFilter, UpdatePatientDTO } from '../types';

export class PatientsRepository {
  public async findAll(order: 'asc' | 'desc') {
    const patients = await Patient.find().sort({
      updatedAt: order === 'desc' ? -1 : 1,
    });

    return patients;
  }

  public async find(filter: PatientFilter) {
    const patient = await Patient.findOne(filter);
    return patient;
  }

  public async create(body: CreatePatientDTO) {
    const patient = await Patient.create(body);
    return patient;
  }

  public async update(filter: PatientFilter, body: UpdatePatientDTO) {
    const patient = await Patient.findOneAndUpdate(filter, body, {
      new: true,
    });

    return patient;
  }

  public async delete(filter: PatientFilter) {
    await Patient.findOneAndDelete(filter);
  }
}

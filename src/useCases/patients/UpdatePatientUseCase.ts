import { isValidObjectId } from 'mongoose';

import { PatientsRepository, UpdatePatientDTO } from '../../types';
import { InvalidIdentifierError, NotFoundError } from '../../utils';

export class UpdatePatientUseCase {
  constructor(private readonly patientsRepository: PatientsRepository) {}

  async execute(id: string, body: UpdatePatientDTO) {
    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const patient = await this.patientsRepository.find({ _id: id });

    if (!patient) {
      throw new NotFoundError('patient');
    }

    const updatedPatient = await this.patientsRepository.update(
      { _id: id },
      body
    );

    return updatedPatient;
  }
}

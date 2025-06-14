import { isValidObjectId } from 'mongoose';

import { PatientsRepository } from '../../types';
import { InvalidIdentifierError, NotFoundError } from '../../utils';

export class GetPatientByIdUseCase {
  constructor(private readonly patientsRepository: PatientsRepository) {}

  public async execute(id: string) {
    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const patient = await this.patientsRepository.find({ _id: id });

    if (!patient) {
      throw new NotFoundError('patient');
    }

    return patient;
  }
}

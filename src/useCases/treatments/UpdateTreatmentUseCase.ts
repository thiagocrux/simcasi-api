import { isValidObjectId } from 'mongoose';

import { TreatmentsRepository, UpdateTreatmentDTO } from '../../types';
import { InvalidIdentifierError, NotFoundError } from '../../utils';

export class UpdateTreatmentUseCase {
  constructor(private readonly treatmentsRepository: TreatmentsRepository) {}

  async execute(id: string, body: UpdateTreatmentDTO) {
    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const treatment = await this.treatmentsRepository.find({ _id: id });

    if (!treatment) {
      throw new NotFoundError('treatment');
    }

    const updatedTreatment = await this.treatmentsRepository.update(
      { _id: id },
      body
    );

    return updatedTreatment;
  }
}

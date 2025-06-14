import { isValidObjectId } from 'mongoose';

import { TreatmentsRepository } from '../../types';
import { InvalidIdentifierError, NotFoundError } from '../../utils';

export class GetTreatmentByIdUseCase {
  constructor(private readonly treatmentsRepository: TreatmentsRepository) {}

  public async execute(id: string) {
    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const treatment = await this.treatmentsRepository.find({ _id: id });

    if (!treatment) {
      throw new NotFoundError('treatment');
    }

    return treatment;
  }
}

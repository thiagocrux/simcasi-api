import { isValidObjectId } from 'mongoose';

import { ObservationsRepository } from '../../types';
import { InvalidIdentifierError, NotFoundError } from '../../utils';

export class GetObservationByIdUseCase {
  constructor(
    private readonly observationsRepository: ObservationsRepository
  ) {}

  public async execute(id: string) {
    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const observation = await this.observationsRepository.find({ _id: id });

    if (!observation) {
      throw new NotFoundError('observation');
    }

    return observation;
  }
}

import { isValidObjectId } from 'mongoose';

import { UpdateObservationSchema } from '../../schemas';
import { ObservationsRepository, UpdateObservationDTO } from '../../types';
import { InvalidIdentifierError, NotFoundError } from '../../utils';

export class UpdateObservationUseCase {
  constructor(
    private readonly observationsRepository: ObservationsRepository
  ) {}

  async execute(id: string, body: UpdateObservationDTO) {
    UpdateObservationSchema.parse(body);

    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const observation = await this.observationsRepository.find({ _id: id });

    if (!observation) {
      throw new NotFoundError('observation');
    }

    const updatedObservation = await this.observationsRepository.update(
      { _id: id },
      body
    );

    return updatedObservation;
  }
}

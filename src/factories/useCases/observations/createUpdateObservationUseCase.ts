import { ObservationsRepository } from '../../../repositories';
import { UpdateObservationUseCase } from '../../../useCases';

export function createUpdateObservationUseCase() {
  return new UpdateObservationUseCase(ObservationsRepository);
}

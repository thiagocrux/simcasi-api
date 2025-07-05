import { ObservationsRepository } from '../../../repositories';
import { UpdateObservationUseCase } from '../../../useCases';

export function updateObservationUseCase() {
  return new UpdateObservationUseCase(ObservationsRepository);
}

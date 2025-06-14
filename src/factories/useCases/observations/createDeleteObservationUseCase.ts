import { ObservationsRepository } from '../../../repositories';
import { DeleteObservationUseCase } from '../../../useCases';

export function createDeleteObservationUseCase() {
  return new DeleteObservationUseCase(ObservationsRepository);
}

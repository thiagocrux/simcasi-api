import { ObservationsRepository } from '../../../repositories';
import { DeleteObservationUseCase } from '../../../useCases';

export function deleteObservationUseCase() {
  return new DeleteObservationUseCase(ObservationsRepository);
}

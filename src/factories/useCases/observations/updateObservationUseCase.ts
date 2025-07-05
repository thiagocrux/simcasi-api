import { ObservationsRepository } from '../../../repositories';
import { UpdateObservationUseCase } from '../../../useCases';

export function updateObservationUseCase() {
  const observationsRepository = new ObservationsRepository();
  return new UpdateObservationUseCase(observationsRepository);
}

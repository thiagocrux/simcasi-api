import { ObservationsRepository } from '../../../repositories';
import { DeleteObservationUseCase } from '../../../useCases';

export function deleteObservationUseCase() {
  const observationsRepository = new ObservationsRepository();
  return new DeleteObservationUseCase(observationsRepository);
}
